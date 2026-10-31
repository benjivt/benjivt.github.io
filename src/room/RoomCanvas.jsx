import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, OrthographicCamera, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { sections, sectionById, sectionByObject } from '../data/sections';
import { modelCredits } from '../data/credits';
import { sectionContent } from '../sectionContent';
import { creditsNote, HOME_AZIMUTH, HOME_POLAR, placements, sign } from './placements';
import { profile } from '../data/profile';
import { filmPhotos, travelPhotos } from '../data/photos';
import { CloseIcon } from '../components/ScreenHeader';
import { SurfaceContext } from '../components/Surface';
import resumePage from '../../info/resumes/resume-page.webp';
import nsbePhoto from '../../info/about/scenes/nsbe-chicago.webp';
import headshot from '../../info/headshot/headshot.webp';

const MODEL_URL = '/models/room.glb';
const DRACO_URL = '/draco/';
// Aim slightly left of the room's middle so it sits right of the wall sign.
const HOME_TARGET = new THREE.Vector3(-2.6, 0.85, 2.0);
const CAMERA_DISTANCE = 30;

useGLTF.preload(MODEL_URL, DRACO_URL);

// HTML overlays (markers, screens, cards) live inside the canvas container, so their DOM
// events also reach the 3D handlers. Only react to events that started on the canvas itself.
const fromCanvas = (event) => (event.nativeEvent ?? event).target?.tagName === 'CANVAS';

function findHotspotRoot(object) {
  let node = object;
  while (node) {
    if (sectionByObject[node.name]) return node;
    node = node.parent;
  }
  return null;
}

function Room({ hoveredId, activeId, onHover, onSelect, onReady }) {
  const { scene } = useGLTF(MODEL_URL, DRACO_URL);
  const [nsbeTexture, headshotTexture] = useTexture([nsbePhoto, headshot]);

  // One-time scene prep: shadows, per-hotspot materials (so highlights don't leak), bounding boxes.
  const hotspots = useMemo(() => {
    const bySection = {};
    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    Object.keys(sectionByObject).forEach((name) => {
      const root = scene.getObjectByName(name);
      if (!root) return;
      const section = sectionByObject[name];
      const meshes = [];
      root.traverse((node) => {
        if (node.isMesh) {
          node.material = node.material.clone();
          meshes.push(node);
        }
      });
      (bySection[section.id] ??= { meshes: [], boxes: [] }).meshes.push(...meshes);
      bySection[section.id].boxes.push({ name, box: new THREE.Box3().setFromObject(root) });
    });
    return bySection;
  }, [scene]);

  const maxAnisotropy = useThree((state) => state.gl.capabilities.getMaxAnisotropy());
  // The canvas draws on demand, so changes made outside React ask for a frame.
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    [
      // Desk frame is the "About me" photo; the shelf frame is a placeholder until it gets its own purpose.
      ['frame_1_photo', headshotTexture],
      ['frame_2_photo', nsbeTexture],
    ].forEach(([name, source]) => {
      const mesh = scene.getObjectByName(name);
      if (!mesh) return;
      // useTexture has already uploaded these with flipY on, so work on a fresh copy
      // with glTF's UV convention (flipY off) and crop it to fill the frame without stretching.
      const texture = source.clone();
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = maxAnisotropy;
      const size = new THREE.Box3().setFromBufferAttribute(mesh.geometry.attributes.position).getSize(new THREE.Vector3());
      const frameAspect = size.x / size.y;
      const imageAspect = source.image.width / source.image.height;
      if (imageAspect > frameAspect) {
        texture.repeat.set(frameAspect / imageAspect, 1);
      } else {
        texture.repeat.set(1, imageAspect / frameAspect);
      }
      texture.offset.set((1 - texture.repeat.x) / 2, (1 - texture.repeat.y) / 2);
      texture.needsUpdate = true;
      // Flat photo planes speckle with shadow acne, so keep them out of the shadow pass.
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      mesh.material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.85 });
    });
    invalidate();
  }, [scene, nsbeTexture, headshotTexture, maxAnisotropy, invalidate]);

  useEffect(() => {
    Object.entries(hotspots).forEach(([id, { meshes }]) => {
      // The focused object stays unlit so its screen content reads cleanly.
      const lit = id === hoveredId && id !== activeId;
      const color = new THREE.Color(sectionById[id].accent);
      meshes.forEach((mesh) => {
        if (!('emissive' in mesh.material)) return;
        mesh.material.emissive.copy(lit ? color : new THREE.Color(0x000000));
        mesh.material.emissiveIntensity = lit ? 0.35 : 0;
      });
    });
    invalidate();
  }, [hotspots, hoveredId, activeId, invalidate]);

  useEffect(() => {
    onReady(hotspots);
  }, [hotspots, onReady]);

  return (
    <primitive
      object={scene}
      onPointerMove={(event) => {
        const root = findHotspotRoot(event.object);
        if (!root || !fromCanvas(event)) return;
        event.stopPropagation();
        onHover(sectionByObject[root.name].id);
      }}
      onPointerOut={() => onHover(null)}
      onClick={(event) => {
        const root = findHotspotRoot(event.object);
        if (!root || !fromCanvas(event)) return;
        event.stopPropagation();
        onSelect(sectionByObject[root.name].id);
      }}
    />
  );
}

function primaryBox(hotspots, id) {
  // The resume paper isn't part of room.glb, so its box comes from its placement.
  if (placements[id]?.kind === 'paper') {
    const [w, h] = placements[id].paperSize;
    return new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(...placements[id].position), new THREE.Vector3(w, 0.002, h));
  }
  const entry = hotspots?.[id];
  if (!entry) return null;
  const primary = sectionById[id].objects[0];
  return (entry.boxes.find((b) => b.name === primary) ?? entry.boxes[0]).box;
}

// Small glowing dots above each section's main object; real buttons, so Tab reaches them.
function Markers({ hotspots, hoveredId, onHover, onSelect }) {
  return sections.map((section) => {
    const box = primaryBox(hotspots, section.id);
    if (!box) return null;
    const top = new THREE.Vector3((box.min.x + box.max.x) / 2, box.max.y + 0.22, (box.min.z + box.max.z) / 2);
    const placement = placements[section.id];
    if (placement?.kind === 'paper') {
      // Hover the dot over the page's far edge so it clears the phone's dot next to it.
      top.add(new THREE.Vector3(0, 0, -placement.paperSize[1] * 0.45).applyAxisAngle(new THREE.Vector3(0, 1, 0), placement.yaw));
    }
    return (
      <Html key={section.id} position={top} center zIndexRange={[20, 0]}>
        <div className={`room-marker-wrap${section.id === hoveredId ? ' is-hovered' : ''}`} style={{ '--accent': section.accent }}>
          {/* The label sits outside the button so it never steals the button's hit area. */}
          <span className="room-marker-label" aria-hidden="true">
            {section.label}
          </span>
          <button
            type="button"
            className="room-marker"
            aria-label={section.label}
            onPointerEnter={() => onHover(section.id)}
            onPointerLeave={() => onHover(null)}
            onFocus={() => onHover(section.id)}
            onBlur={() => onHover(null)}
            onClick={() => onSelect(section.id)}
          >
            <span className="room-marker-dot" aria-hidden="true" />
          </button>
        </div>
      </Html>
    );
  });
}

function Content({ id, onClose }) {
  const Panel = sectionContent[id];
  return (
    <Suspense fallback={<p className="device-loading">Loading…</p>}>
      <Panel onBack={onClose} />
    </Suspense>
  );
}

// iOS-style status bar across the top of the phone screen.
function StatusBar() {
  return (
    <div className="device-status" aria-hidden="true">
      <span>9:41</span>
      <span className="device-status-icons">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="16" height="8" rx="1.5" />
          <rect x="23" y="4" width="1.5" height="4" rx="0.7" opacity="0.4" />
        </svg>
      </span>
    </div>
  );
}

// Section content drawn onto the laptop, TV or phone screen. Each screen supplies its own chrome
// (window toolbar, TV top bar, phone nav), so the frame only adds what the hardware would.
function DeviceScreen({ id, onClose }) {
  const p = placements[id];
  const screen = (
    <Html
      transform
      wrapperClass="device-wrapper"
      position={p.yaw === undefined ? p.position : [0, 0, 0]}
      rotation={p.rotation}
      distanceFactor={p.distanceFactor}
      zIndexRange={[40, 30]}
    >
      <div className={`device device--${p.device}`} style={{ width: p.size[0], height: p.size[1] }}>
        {p.device === 'phone' && <StatusBar />}
        <div className="device-body">
          <SurfaceContext.Provider value={p.device}>
            <Content id={id} onClose={onClose} />
          </SurfaceContext.Provider>
        </div>
        {p.device === 'phone' && <span className="device-home" aria-hidden="true" />}
      </div>
    </Html>
  );
  // The phone lies flat and is turned on the desk, so rotate it in two steps.
  return p.yaw === undefined ? screen : (
    <group position={p.position} rotation={[0, p.yaw, 0]}>
      {screen}
    </group>
  );
}

// The headset's universal menu: decoration, like the status bars on the other screens.
function VrDock() {
  return (
    <div className="vr-dock" aria-hidden="true">
      <span className="vr-dock-meta">
        <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M11 7c-2.2-3.4-4-5.5-6-5.5S1.2 3.6 1.2 7s1.5 5.5 3.8 5.5S8.8 10.4 11 7zm0 0c2.2-3.4 4-5.5 6-5.5s3.8 2.1 3.8 5.5-1.5 5.5-3.8 5.5S13.2 10.4 11 7z" />
        </svg>
      </span>
      <span className="vr-dock-icon">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
          {[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={3 + c * 6} cy={3 + r * 6} r="1.8" />))}
        </svg>
      </span>
      <span className="vr-dock-icon">
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="7" cy="6" r="3.2" />
          <path d="M1.5 16c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M13 3.4a3 3 0 010 5.4M15 11.4c1.8.6 3 2.2 3.4 4.6" />
        </svg>
      </span>
      <span className="vr-dock-icon">
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M2 6h3l1.6-2.5h6.8L15 6h3v10H2z" />
          <circle cx="10" cy="10.5" r="3" />
        </svg>
      </span>
      <span className="vr-dock-sep" />
      <span className="vr-dock-time">9:41</span>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
        <path d="M8 2.4c2.4 0 4.6 1 6.2 2.5l1.2-1.2C13.5 1.8 10.9.8 8 .8S2.5 1.8.6 3.7l1.2 1.2C3.4 3.4 5.6 2.4 8 2.4zm0 3.4c1.4 0 2.7.5 3.7 1.5l1.2-1.2C11.6 4.8 9.9 4.2 8 4.2s-3.6.6-4.9 1.9l1.2 1.2c1-1 2.3-1.5 3.7-1.5zm0 3.4c-.6 0-1.1.2-1.5.6L8 11.3l1.5-1.5c-.4-.4-.9-.6-1.5-.6z" />
      </svg>
      <svg width="24" height="12" viewBox="0 0 24 12" fill="currentColor">
        <rect x="0.5" y="0.5" width="20" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.5" />
        <rect x="2" y="2" width="14" height="8" rx="1.5" />
        <rect x="21.5" y="4" width="1.8" height="4" rx="0.8" opacity="0.5" />
      </svg>
    </div>
  );
}

// Projects: once the camera has flown into the headset's lenses, the Quest's own UI opens over the room,
// like a passthrough home with an app window floating in it.
function VrView({ id, onClose }) {
  // drei centres a fullscreen Html on its projected position, so pin it to the point the camera ends up
  // looking at: the lenses.
  return (
    <Html position={placements[id].view.target} fullscreen zIndexRange={[50, 40]}>
      <div className="vr" role="dialog" aria-label={`${sectionById[id].label}, in the headset`}>
        <div className="vr-env" aria-hidden="true" />
        <div className="vr-stage">
          <div className="vr-window">
            <SurfaceContext.Provider value="vr">
              <Content id={id} onClose={onClose} />
            </SurfaceContext.Provider>
          </div>
          <span className="vr-grab" aria-hidden="true" />
          <VrDock />
        </div>
        <div className="vr-lens" aria-hidden="true" />
      </div>
    </Html>
  );
}

// Screen-right direction for the overview camera; cards sit on this side of their object.
const HOME_RIGHT = new THREE.Vector3(Math.cos(HOME_AZIMUTH), 0, -Math.sin(HOME_AZIMUTH));

// Section content pinned beside the object, like a note card in the room.
function NoteCard({ id, hotspots, onClose }) {
  const box = primaryBox(hotspots, id);
  if (!box) return null;
  const size = box.getSize(new THREE.Vector3());
  const anchor = box.getCenter(new THREE.Vector3()).addScaledVector(HOME_RIGHT, Math.max(size.x, size.z) * 0.6);
  return (
    <Html position={anchor} zIndexRange={[40, 30]} className="room-card-anchor">
      <div className="room-card" style={{ '--accent': sectionById[id].accent }}>
        <Content id={id} onClose={onClose} />
      </div>
    </Html>
  );
}

function WallSign({ visible }) {
  return (
    <Html transform position={sign.position} distanceFactor={sign.distanceFactor} zIndexRange={[10, 0]}>
      <div className={`room-sign${visible ? '' : ' is-hidden'}`} style={{ width: sign.size[0] }}>
        <h1 className="room-sign-title">Benji's room</h1>
        <p className="room-sign-sub">click anything</p>
      </div>
    </Html>
  );
}

function CreditsNote({ visible }) {
  const [open, setOpen] = useState(false);
  return (
    <Html
      transform
      position={creditsNote.position}
      rotation={creditsNote.rotation}
      distanceFactor={creditsNote.distanceFactor}
      zIndexRange={[10, 0]}
    >
      <div className={`credits-note${visible ? '' : ' is-hidden'}`} style={{ width: creditsNote.size[0] }}>
        <button type="button" className="credits-note-toggle" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          3D credits
        </button>
        {open && (
          <ul className="credits-note-list">
            {modelCredits.map((credit) => (
              <li key={credit.url}>
                <a href={credit.url} target="_blank" rel="noreferrer">
                  {credit.title}
                </a>{' '}
                · {credit.author} · {credit.licence}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Html>
  );
}

// Page 1 of the resume printed on a letter-size sheet lying on the desk (npm run render:resume).
function ResumePaper({ hovered, focused, onHover, onSelect }) {
  const p = placements.resume;
  const texture = useTexture(resumePage);
  const maxAnisotropy = useThree((state) => state.gl.capabilities.getMaxAnisotropy());
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = maxAnisotropy;
    texture.needsUpdate = true;
  }, [texture, maxAnisotropy]);
  const lit = hovered && !focused;

  return (
    <group position={p.position} rotation={[0, p.yaw, 0]}>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        onPointerMove={(event) => {
          if (!fromCanvas(event)) return;
          event.stopPropagation();
          onHover('resume');
        }}
        onPointerOut={() => onHover(null)}
        onClick={(event) => {
          if (!fromCanvas(event)) return;
          event.stopPropagation();
          onSelect('resume');
        }}
      >
        <planeGeometry args={p.paperSize} />
        {/* A little self-light from the page keeps the print readable under the room lighting. */}
        <meshStandardMaterial
          map={texture}
          roughness={0.9}
          emissive="#ffffff"
          emissiveMap={texture}
          emissiveIntensity={lit ? 0.35 : 0.15}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// While reading the paper: a small bar under the page to keep a copy or close it.
function PaperControls({ onClose }) {
  const p = placements.resume;
  const below = new THREE.Vector3(0, 0, p.paperSize[1] / 2 + 0.018)
    .applyAxisAngle(new THREE.Vector3(0, 1, 0), p.yaw)
    .add(new THREE.Vector3(...p.position));
  return (
    <Html position={below} center zIndexRange={[40, 30]}>
      <div className="paper-controls">
        <a href={profile.resume} target="_blank" rel="noreferrer">
          Open PDF
        </a>
        <a href={profile.resume} download="Benjamin-Adjepong-Resume.pdf">
          Download
        </a>
        <button type="button" className="paper-controls-close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </Html>
  );
}

// ---------- Photo walls (Film on the bed, Travel above the desk) ----------

// Which way is "towards the camera" and "up on screen" for a section's fixed view.
function viewBasis({ azimuth, polar }) {
  const toCamera = sphericalOffset(azimuth, polar, 1);
  const up = new THREE.Vector3(0, 1, 0).addScaledVector(toCamera, -toCamera.y).normalize();
  return { toCamera, up };
}

// Find the flat photo faces on a model from its meshes: the triangles of the given materials that face the
// camera, grouped into connected rectangles. Each slot is oriented upright for the section's view.
function findPhotoSlots(meshes, materialNames, view) {
  const { toCamera, up: screenUp } = viewBasis(view);
  const slots = [];
  meshes
    .filter((mesh) => materialNames.includes(mesh.material.name))
    .forEach((mesh) => {
      mesh.updateWorldMatrix(true, false);
      const pos = mesh.geometry.attributes.position;
      const index = mesh.geometry.index;
      const vertex = (i) => new THREE.Vector3().fromBufferAttribute(pos, index ? index.getX(i) : i).applyMatrix4(mesh.matrixWorld);
      const count = index ? index.count : pos.count;
      const tris = [];
      for (let i = 0; i < count; i += 3) {
        const t = [vertex(i), vertex(i + 1), vertex(i + 2)];
        const normal = new THREE.Vector3().subVectors(t[1], t[0]).cross(new THREE.Vector3().subVectors(t[2], t[0])).normalize();
        if (normal.dot(toCamera) > 0.6) tris.push({ t, normal });
      }
      // Union triangles that share a corner into one rectangle.
      const key = (v) => `${v.x.toFixed(4)},${v.y.toFixed(4)},${v.z.toFixed(4)}`;
      const parent = tris.map((_, i) => i);
      const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])));
      const owner = new Map();
      tris.forEach(({ t }, i) =>
        t.forEach((v) => {
          const k = key(v);
          if (owner.has(k)) parent[find(i)] = find(owner.get(k));
          else owner.set(k, i);
        })
      );
      const groups = new Map();
      tris.forEach((tri, i) => (groups.get(find(i)) ?? groups.set(find(i), []).get(find(i))).push(tri));
      groups.forEach((group) => {
        const normal = group.reduce((n, g) => n.add(g.normal), new THREE.Vector3()).normalize();
        const points = group.flatMap((g) => g.t);
        // Follow the rectangle's own edges (the prints on the bed are turned): of the two edges at one
        // corner, the one closest to screen-up becomes the photo's up.
        const corners = [...new Map(points.map((p) => [key(p), p])).values()];
        const byDistance = corners.slice(1).sort((a, b) => a.distanceTo(corners[0]) - b.distanceTo(corners[0]));
        const edges = byDistance.slice(0, 2).map((c) => c.clone().sub(corners[0]).normalize());
        const up = edges.reduce((best, e) => (Math.abs(e.dot(screenUp)) > Math.abs(best.dot(screenUp)) ? e : best));
        if (up.dot(screenUp) < 0) up.negate();
        const right = new THREE.Vector3().crossVectors(up, normal).normalize();
        const along = (axis) => points.map((p) => p.dot(axis));
        const [r0, r1] = [Math.min(...along(right)), Math.max(...along(right))];
        const [u0, u1] = [Math.min(...along(up)), Math.max(...along(up))];
        const depth = Math.max(...along(normal));
        const center = right.clone().multiplyScalar((r0 + r1) / 2).addScaledVector(up, (u0 + u1) / 2).addScaledVector(normal, depth);
        slots.push({ center, normal, up, right, width: r1 - r0, height: u1 - u0 });
      });
    });
  // Reading order: rows top to bottom (slots within about half a photo's height share a row), each left to right.
  const screenRight = new THREE.Vector3().crossVectors(screenUp, toCamera).normalize();
  const rows = [];
  [...slots]
    .sort((a, b) => b.center.dot(screenUp) - a.center.dot(screenUp))
    .forEach((slot) => {
      const row = rows.find((r) => Math.abs(r[0].center.dot(screenUp) - slot.center.dot(screenUp)) < slot.height * 0.5);
      if (row) row.push(slot);
      else rows.push([slot]);
    });
  return rows.flatMap((row) => row.sort((a, b) => a.center.dot(screenRight) - b.center.dot(screenRight)));
}

// Where the camera should look and how big the photos are on screen, for the section's view.
function slotFraming(slots, view) {
  const { up } = viewBasis(view);
  const right = new THREE.Vector3().crossVectors(up, viewBasis(view).toCamera).normalize();
  const corners = slots.flatMap((s) =>
    [-1, 1].flatMap((a) => [-1, 1].map((b) => s.center.clone().addScaledVector(s.right, (a * s.width) / 2).addScaledVector(s.up, (b * s.height) / 2)))
  );
  const span = (axis) => {
    const values = corners.map((c) => c.dot(axis));
    return [Math.min(...values), Math.max(...values)];
  };
  const [x0, x1] = span(right);
  const [y0, y1] = span(up);
  const center = corners.reduce((sum, c) => sum.add(c), new THREE.Vector3()).divideScalar(corners.length);
  return { center, size: [x1 - x0, y1 - y0] };
}

// One photo laid onto a slot, cropped to fill it without stretching.
function SlotPhoto({ slot, texture, onClick, onHover }) {
  const map = useMemo(() => {
    const t = texture.clone();
    t.colorSpace = THREE.SRGBColorSpace;
    const slotAspect = slot.width / slot.height;
    const imageAspect = texture.image.width / texture.image.height;
    if (imageAspect > slotAspect) t.repeat.set(slotAspect / imageAspect, 1);
    else t.repeat.set(1, imageAspect / slotAspect);
    t.offset.set((1 - t.repeat.x) / 2, (1 - t.repeat.y) / 2);
    t.needsUpdate = true;
    return t;
  }, [slot, texture]);
  const quaternion = useMemo(
    () => new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(slot.right, slot.up, slot.normal)),
    [slot]
  );
  return (
    <mesh
      position={slot.center.clone().addScaledVector(slot.normal, 0.0006)}
      quaternion={quaternion}
      onClick={(event) => {
        if (!fromCanvas(event)) return;
        event.stopPropagation();
        onClick();
      }}
      onPointerMove={(event) => {
        if (!fromCanvas(event)) return;
        event.stopPropagation();
        onHover();
      }}
    >
      <planeGeometry args={[slot.width * 0.98, slot.height * 0.98]} />
      <meshBasicMaterial map={map} toneMapped={false} />
    </mesh>
  );
}

function PhotoWall({ id, slots, photos, active, onSelect, onHover, onOpen }) {
  const textures = useTexture(photos.slice(0, slots.length).map((photo) => photo.src));
  return textures.map((texture, i) => (
    <SlotPhoto
      key={photos[i].id}
      slot={slots[i]}
      texture={texture}
      onHover={() => onHover(id)}
      onClick={() => (active ? onOpen(i) : onSelect(id))}
    />
  ));
}

// The wood bar along the bottom of the screen while a photo wall is open. (Pinned to the screen rather
// than the model, since sticky notes and the bed get in the way of anything placed under the photos.)
function PhotoControls({ id, framing, photos, onOpen, onClose }) {
  return (
    <Html position={framing.center} fullscreen zIndexRange={[40, 30]} style={{ pointerEvents: 'none' }}>
      <div className="paper-controls photo-controls">
        <h1 className="photo-controls-label">{sectionById[id].label}</h1>
        <span className="photo-controls-count">
          {photos.length ? `${photos.length} photo${photos.length > 1 ? 's' : ''}` : 'photos coming soon'}
        </span>
        {photos.length > 0 && (
          <button type="button" onClick={() => onOpen(0)}>
            View all
          </button>
        )}
        <button type="button" className="paper-controls-close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </Html>
  );
}

// A photo opened full size, over the room, with its caption and arrows through the rest.
function PhotoViewer({ anchor, photos, index, onIndex, onDismiss }) {
  const photo = photos[index];
  const step = (delta) => onIndex((index + delta + photos.length) % photos.length);
  useEffect(() => {
    // Capture phase, so Escape closes the photo before the app closes the whole section.
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onDismiss();
      } else if (event.key === 'ArrowRight') step(1);
      else if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  });
  return (
    <Html position={anchor} fullscreen zIndexRange={[60, 50]}>
      <div className="photo-viewer" role="dialog" aria-label={photo.caption} onClick={onDismiss}>
        <figure className="ui-polaroid photo-viewer-print" onClick={(event) => event.stopPropagation()}>
          <img src={photo.src} alt={photo.caption} />
          <figcaption>{photo.caption}</figcaption>
        </figure>
        {photos.length > 1 && (
          <>
            <button type="button" className="photo-viewer-nav photo-viewer-nav--prev" aria-label="Previous photo" onClick={(e) => (e.stopPropagation(), step(-1))}>
              ‹
            </button>
            <button type="button" className="photo-viewer-nav photo-viewer-nav--next" aria-label="Next photo" onClick={(e) => (e.stopPropagation(), step(1))}>
              ›
            </button>
          </>
        )}
        <button type="button" className="photo-viewer-close" aria-label="Close photo" onClick={onDismiss}>
          <CloseIcon />
        </button>
      </div>
    </Html>
  );
}

function sphericalOffset(azimuth, polar, distance = CAMERA_DISTANCE) {
  return new THREE.Vector3(Math.sin(polar) * Math.sin(azimuth), Math.cos(polar), Math.sin(polar) * Math.cos(azimuth)).multiplyScalar(
    distance
  );
}

function shortestAngle(from, to) {
  return ((((to - from) % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
}

// Flies the camera between the overview and each section's viewpoint; free orbit only at home.
function CameraRig({ hotspots, framings, focusId, reduceMotion }) {
  const controls = useRef(null);
  const { camera, size, invalidate } = useThree();
  const homeZoom = Math.min(size.width / 8.4, size.height / 6.6);
  const goal = useRef(null);
  const state = useRef({
    target: HOME_TARGET.clone(),
    azimuth: HOME_AZIMUTH,
    polar: HOME_POLAR,
    zoom: homeZoom,
    distance: CAMERA_DISTANCE,
    flying: false,
  });

  useEffect(() => {
    const s = state.current;
    camera.position.copy(s.target).add(sphericalOffset(s.azimuth, s.polar));
    camera.lookAt(s.target);
    camera.zoom = homeZoom;
    camera.updateProjectionMatrix();
    // only on mount; later changes animate through the goal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const placement = focusId && placements[focusId];
    const c = controls.current;
    // Start the flight from wherever the visitor has orbited to.
    if (c) {
      const offset = camera.position.clone().sub(c.target);
      state.current = {
        target: c.target.clone(),
        azimuth: Math.atan2(offset.x, offset.z),
        polar: Math.acos(THREE.MathUtils.clamp(offset.y / offset.length(), -1, 1)),
        zoom: camera.zoom,
        distance: offset.length(),
        flying: true,
      };
      c.enabled = false;
    }
    if (placement?.kind === 'screen' || placement?.kind === 'paper') {
      const { azimuth, polar, world, fill } = placement.view;
      goal.current = {
        target: new THREE.Vector3(...placement.position),
        azimuth,
        polar,
        zoom: Math.min((size.width * fill) / world[0], (size.height * fill) / world[1]),
        distance: CAMERA_DISTANCE,
      };
    } else if (placement?.kind === 'card') {
      const box = primaryBox(hotspots, focusId);
      const center = box ? box.getCenter(new THREE.Vector3()) : HOME_TARGET.clone();
      const zoom = homeZoom * placement.view.zoom;
      // Frame the object left of center so the card has the right half of the screen.
      const target = center.addScaledVector(HOME_RIGHT, (size.width / zoom) * 0.22);
      goal.current = { target, azimuth: HOME_AZIMUTH, polar: HOME_POLAR, zoom, distance: CAMERA_DISTANCE };
    } else if (placement?.kind === 'photos' && framings?.[focusId]) {
      // Square on to the photos, sized so they fill `fill` of the screen.
      const { center, size: span } = framings[focusId];
      const { azimuth, polar, fill } = placement.view;
      const zoom = Math.min((size.width * fill) / span[0], (size.height * fill) / span[1]);
      goal.current = { target: center.clone(), azimuth, polar, zoom, distance: CAMERA_DISTANCE };
    } else if (placement?.kind === 'vr') {
      // Into the headset: the camera ends up inside the strap loop, a few cm from the lenses, so the
      // strap and everything else behind it drop out of view.
      const { target, azimuth, polar, width, distance } = placement.view;
      goal.current = { target: new THREE.Vector3(...target), azimuth, polar, zoom: size.width / width, distance };
    } else {
      goal.current = {
        target: HOME_TARGET.clone(),
        azimuth: HOME_AZIMUTH,
        polar: HOME_POLAR,
        zoom: homeZoom,
        distance: CAMERA_DISTANCE,
        home: true,
      };
    }
    invalidate();
  }, [focusId, hotspots, framings, homeZoom, size.width, size.height, camera, invalidate]);

  useFrame((_, delta) => {
    const s = state.current;
    const g = goal.current;
    const c = controls.current;
    if (!s.flying || !g || !c) return;
    const t = reduceMotion ? 1 : 1 - Math.exp(-delta * 5);
    s.target.lerp(g.target, t);
    s.azimuth += shortestAngle(s.azimuth, g.azimuth) * t;
    s.polar += (g.polar - s.polar) * t;
    s.zoom += (g.zoom - s.zoom) * t;
    s.distance += (g.distance - s.distance) * t;
    camera.position.copy(s.target).add(sphericalOffset(s.azimuth, s.polar, s.distance));
    camera.lookAt(s.target);
    camera.zoom = s.zoom;
    camera.updateProjectionMatrix();
    c.target.copy(s.target);
    const settled =
      s.target.distanceTo(g.target) < 0.002 &&
      Math.abs(shortestAngle(s.azimuth, g.azimuth)) < 0.002 &&
      Math.abs(g.zoom - s.zoom) / g.zoom < 0.002 &&
      Math.abs(g.distance - s.distance) / g.distance < 0.002;
    if (settled) {
      s.flying = false;
      if (g.home) {
        c.enabled = true;
        c.update();
      }
    } else {
      // keep drawing until the flight lands
      invalidate();
    }
  });

  return (
    <OrbitControls
      ref={controls}
      target={HOME_TARGET.toArray()}
      enablePan={false}
      enableDamping
      minAzimuthAngle={HOME_AZIMUTH - 0.55}
      maxAzimuthAngle={HOME_AZIMUTH + 0.55}
      minPolarAngle={0.6}
      maxPolarAngle={1.25}
      minZoom={homeZoom * 0.85}
      maxZoom={homeZoom * 2.5}
    />
  );
}

const photosBySection = { film: filmPhotos, travel: travelPhotos };

export default function RoomCanvas({ hoveredId, activeId, onHover, onSelect, onClose, reduceMotion, onLoaded }) {
  const [hotspots, setHotspots] = useState(null);
  const [viewer, setViewer] = useState(null);
  const placement = activeId ? placements[activeId] : null;

  useEffect(() => {
    if (hotspots) onLoaded();
  }, [hotspots, onLoaded]);

  // Photo faces of the Film and Travel models, and how to frame them, once the model is in.
  const photoWalls = useMemo(() => {
    if (!hotspots) return {};
    return Object.fromEntries(
      Object.entries(placements)
        .filter(([id, p]) => p.kind === 'photos' && hotspots[id])
        .map(([id, p]) => {
          const slots = findPhotoSlots(hotspots[id].meshes, p.slots, p.view);
          return [id, { slots, framing: slots.length ? slotFraming(slots, p.view) : null }];
        })
    );
  }, [hotspots]);
  const framings = useMemo(() => Object.fromEntries(Object.entries(photoWalls).map(([id, w]) => [id, w.framing])), [photoWalls]);

  // A photo left open shouldn't follow you to the next section.
  useEffect(() => setViewer(null), [activeId]);

  return (
    <Canvas
      shadows
      // Draw only when something changes (a flight, orbiting, a hover) instead of 60 times a second while
      // idle, and cap the resolution so big high-DPI screens don't redraw millions of extra pixels.
      frameloop="demand"
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      onPointerMissed={(event) => {
        if (!fromCanvas(event)) return;
        if (activeId) onClose();
        else onHover(null);
      }}
      aria-label="Benji's room. Click an object, or tab to the glowing dots, to open a section."
    >
      <color attach="background" args={['#1b1420']} />
      {/* A near plane this close lets the camera sit just in front of the headset's lenses (Projects). */}
      <OrthographicCamera makeDefault near={0.005} far={100} />
      <hemisphereLight args={['#fff1e0', '#5a3b2e', 0.75]} />
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[-6, 9, 7]}
        intensity={1.1}
        color="#ffe2c4"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      <pointLight position={[-2.4, 1.6, 0.9]} intensity={1.5} distance={4} color="#ffd59a" />
      <Suspense fallback={null}>
        <Room hoveredId={hoveredId} activeId={activeId} onHover={onHover} onSelect={onSelect} onReady={setHotspots} />
        <WallSign visible={!activeId} />
        <CreditsNote visible={!activeId} />
        <ResumePaper hovered={hoveredId === 'resume'} focused={activeId === 'resume'} onHover={onHover} onSelect={onSelect} />
        {hotspots && !activeId && <Markers hotspots={hotspots} hoveredId={hoveredId} onHover={onHover} onSelect={onSelect} />}
        {placement?.kind === 'screen' && <DeviceScreen key={activeId} id={activeId} onClose={onClose} />}
        {placement?.kind === 'paper' && <PaperControls onClose={onClose} />}
        {placement?.kind === 'card' && hotspots && <NoteCard key={activeId} id={activeId} hotspots={hotspots} onClose={onClose} />}
        {placement?.kind === 'vr' && <VrView key={activeId} id={activeId} onClose={onClose} />}
        {Object.entries(photoWalls).map(
          ([id, wall]) =>
            photosBySection[id].length > 0 && (
              <PhotoWall
                key={id}
                id={id}
                slots={wall.slots}
                photos={photosBySection[id]}
                active={activeId === id}
                onSelect={onSelect}
                onHover={onHover}
                onOpen={(index) => setViewer({ id, index })}
              />
            )
        )}
        {placement?.kind === 'photos' && photoWalls[activeId]?.framing && (
          <PhotoControls
            id={activeId}
            framing={photoWalls[activeId].framing}
            photos={photosBySection[activeId]}
            onOpen={(index) => setViewer({ id: activeId, index })}
            onClose={onClose}
          />
        )}
        {viewer && photoWalls[viewer.id]?.framing && (
          <PhotoViewer
            anchor={photoWalls[viewer.id].framing.center}
            photos={photosBySection[viewer.id]}
            index={viewer.index}
            onIndex={(index) => setViewer({ ...viewer, index })}
            onDismiss={() => setViewer(null)}
          />
        )}
      </Suspense>
      <CameraRig hotspots={hotspots} framings={framings} focusId={activeId} reduceMotion={reduceMotion} />
    </Canvas>
  );
}
