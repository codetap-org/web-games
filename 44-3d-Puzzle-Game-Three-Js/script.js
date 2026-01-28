const MES_IMAGES = ["https://images.unsplash.com/photo-1552819686-25b0c726045d?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1602427670924-d4942df40999?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1762968163835-f7968d4e2db9?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1748287443710-54d45b1a7545?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1597002755425-294af3078d09?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1494028960909-2321fad2a785?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1734812277218-04444b2bdf62?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1612287665393-dc4ce7714f88?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1691966650465-d309a9084e80?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1591793017030-99aa1ecb4c8b?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1711552466487-ac9afb5528cb?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1520811163141-295270e34c12?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1689127904603-fa2d782df599?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1652417262828-566fee6a716c?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1670991761566-534b07539db5?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1675578263336-596b37d839a7?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1703319961241-c9296db91e72?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1625239881160-cf0a59a28578?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1710163132367-fdff41fd2f32?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1628930394903-ecf6a7c570d9?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1604092037830-99a284b5ee25?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1644173296374-c321f5ceb4c6?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1675578262884-6fcabfafaeea?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1763809244625-012f7c17758a?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1561338738-78b10d363113?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1685767644712-446f8f8ddea5?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1644171739692-cddadbd76eb1?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1639682500094-09197bc6580a?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1635731623838-c4ceb4df41bf?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1644171710387-7b8eb190b889?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1497852918510-6b1b64b6a51d?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1580107885907-310483330e94?w=600&h=600&fit=crop&crop=center"];
const translations = {
    fr: {
        title: "Puzzle",
        difficulty: "Difficulté :",
        modeMove: "Déplacer",
        modeRotate: "Tourner",
        shuffle: "Mélanger",
        solve: "Solution",
        newImage: "Image aléatoire",
        hintMove: "Mode Déplacer (\"+\") : clic sur pièce puis autre pièce pour échanger",
        hintRotate: "Mode Tourner (\"-\") : clic-glisser pour rotation. Molette pour zoom",
        loadingImage: "Chargement d'une nouvelle image...",
        cuttingImage: "Découpage de l'image en cours...",
        puzzleReady: "Puzzle prêt",
        puzzleShuffled: "Puzzle mélangé",
        solving: "Résolution en cours...",
        solved: "Puzzle résolu",
        completed: "Puzzle terminé",
        fallbackImage: "Image de secours utilisée",
        imageCredit: "Image : unsplash.com"
    },
    en: {
        title: "Puzzle",
        difficulty: "Difficulty:",
        modeMove: "Move",
        modeRotate: "Rotate",
        shuffle: "Shuffle",
        solve: "Solution",
        newImage: "Random Image",
        hintMove: "Move Mode: (\"+\") click on piece then another piece to swap",
        hintRotate: "Rotate Mode (\"-\") : click-drag for rotation. Scroll wheel for zoom",
        loadingImage: "Loading new image...",
        cuttingImage: "Cutting image...",
        puzzleReady: "Puzzle ready",
        puzzleShuffled: "Puzzle shuffled",
        solving: "Solving...",
        solved: "Puzzle solved",
        completed: "Puzzle completed",
        fallbackImage: "Fallback image used",
        imageCredit: "unsplash.com image"
    },
    es: {
        title: "Puzle",
        difficulty: "Dificultad:",
        modeMove: "Mover",
        modeRotate: "Rotar",
        shuffle: "Mezclar",
        solve: "Solución",
        newImage: "imagen al azar",
        hintMove: "Modo Mover (\"+\") : clic en pieza y luego otra pieza para intercambiar",
        hintRotate: "Modo Rotar (\"-\") : clic-arrastrar para rotar. Rueda para zoom",
        loadingImage: "Cargando nueva imagen...",
        cuttingImage: "Cortando imagen...",
        puzzleReady: "Rompecabezas listo",
        puzzleShuffled: "Rompecabezas mezclado",
        solving: "Resolviendo...",
        solved: "Rompecabezas resuelto",
        completed: "Rompecabezas completado",
        fallbackImage: "Imagen alternativa utilizada",
        imageCredit: "Imagen : unsplash.com"
    }
};
let scene, camera, renderer;
let puzzlePieces = [];
let selectedPiece = null;
let gridSize = 4;
const pieceSize = 1;
let moveCount = 0;
let correctCount = 0;
let timer = 0;
let timerInterval = null;
let isSolving = !1;
let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
let currentImageUrl = "https://images.unsplash.com/photo-1611562242695-cc5940964622?w=600&h=600&fit=crop&crop=center";
let mouseDown = !1;
let lastMouseX = 0;
let lastMouseY = 0;
let rotationSpeed = 0.005;
let uiCollapsed = !1;
let currentLanguage = 'fr';
let sceneVelocity = new THREE.Vector2(0, 0);
let sceneFriction = 0.97;
let sceneDeceleration = 0.99;
let isDragging = !1;
let dragStartTime = 0;
let lastDragDelta = new THREE.Vector2(0, 0);
let lastTouchDistance = 0;
let isTouchDevice = !1;
let touchStartX = 0;
let touchStartY = 0;
const titleElem = document.getElementById('title');
const difficultySelect = document.getElementById('difficulty');
const difficultyLabel = document.getElementById('difficultyLabel');
const modeMoveBtn = document.getElementById('modeMove');
const modeRotateBtn = document.getElementById('modeRotate');
const shuffleBtn = document.getElementById('shuffleBtn');
const solveBtn = document.getElementById('solveBtn');
const newImageBtn = document.getElementById('newImageBtn');
const messageElem = document.getElementById('message');
const hintElem = document.getElementById('hint');
const previewImage = document.getElementById('previewImage');
const toggleUI = document.getElementById('toggleUI');
const ui = document.getElementById('ui');
const imageCredit = document.getElementById('imageCredit');
const languageBtn = document.getElementById('languageBtn');
const languageDropdown = document.getElementById('languageDropdown');
const currentFlag = document.getElementById('currentFlag');
const currentLanguageText = document.getElementById('currentLanguage');
const languageOptions = document.querySelectorAll('.language-option');

function detectTouchDevice() {
    isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isTouchDevice
}
async function init() {
    detectTouchDevice();
    createScene();
    createCamera();
    createRenderer();
    createLights();
    setupEventListeners();
    await createPuzzleFromImage(currentImageUrl);
    updatePreviewImage(currentImageUrl);
    loadLanguagePreference()
}

function createScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a)
}

function createCamera() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, gridSize * 2.5);
    camera.lookAt(0, 0, 0)
}

function createRenderer() {
    renderer = new THREE.WebGLRenderer({
        antialias: !0,
        alpha: !0
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement)
}

function createLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-10, 5, -10);
    scene.add(fillLight)
}

function updatePreviewImage(imageUrl) {
    previewImage.src = imageUrl
}
async function loadRandomImage() {
    const randomIndex = Math.floor(Math.random() * MES_IMAGES.length);
    const imageUrl = MES_IMAGES[randomIndex];
    showMessage(translations[currentLanguage].loadingImage, 2000);
    currentImageUrl = imageUrl;
    updatePreviewImage(imageUrl);
    await createPuzzleFromImage(imageUrl)
}
async function createPuzzleFromImage(imageUrl) {
    puzzlePieces.forEach(piece => scene.remove(piece));
    puzzlePieces = [];
    gridSize = parseInt(difficultySelect.value);
    camera.position.set(0, 0, gridSize * 2.5);
    camera.lookAt(0, 0, 0);
    showMessage(translations[currentLanguage].cuttingImage, 1500);
    const fullImage = await loadImage(imageUrl);
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const piece = await createPuzzlePiece(row, col, fullImage);
            puzzlePieces.push(piece);
            scene.add(piece)
        }
    }
    shufflePieces();
    showMessage(translations[currentLanguage].puzzleReady, 1500)
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            if (url === currentImageUrl) {
                updatePreviewImage(url)
            }
            resolve(img)
        };
        img.onerror = () => {
            const fallbackImg = new Image();
            fallbackImg.crossOrigin = "anonymous";
            fallbackImg.onload = () => {
                updatePreviewImage(fallbackImg.src);
                resolve(fallbackImg)
            };
            fallbackImg.src = MES_IMAGES[0];
            showMessage(translations[currentLanguage].fallbackImage, 2000)
        };
        img.src = url
    })
}
async function createPuzzlePiece(row, col, fullImage) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const pieceWidth = fullImage.width / gridSize;
    const pieceHeight = fullImage.height / gridSize;
    canvas.width = pieceWidth;
    canvas.height = pieceHeight;
    ctx.drawImage(fullImage, col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
    const frontTexture = new THREE.CanvasTexture(canvas);
    frontTexture.minFilter = THREE.LinearFilter;
    frontTexture.magFilter = THREE.LinearFilter;
    const backCanvas = document.createElement('canvas');
    const backCtx = backCanvas.getContext('2d');
    backCanvas.width = pieceWidth;
    backCanvas.height = pieceHeight;
    backCtx.translate(pieceWidth, 0);
    backCtx.scale(-1, 1);
    backCtx.drawImage(canvas, 0, 0);
    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.minFilter = THREE.LinearFilter;
    backTexture.magFilter = THREE.LinearFilter;
    const thickness = 0.50;
    const geometry = new THREE.BoxGeometry(pieceSize * 0.98, pieceSize * 0.98, thickness);
    const sideMaterial = new THREE.MeshPhongMaterial({
        color: 0x222222
    });
    const materials = [sideMaterial, sideMaterial, sideMaterial, sideMaterial, new THREE.MeshPhongMaterial({
        map: frontTexture,
        shininess: 30
    }), new THREE.MeshPhongMaterial({
        map: backTexture,
        shininess: 30
    })];
    const piece = new THREE.Mesh(geometry, materials);
    piece.userData = {
        originalRow: row,
        originalCol: col,
        currentRow: row,
        currentCol: col,
        isCorrect: !0,
        isSelected: !1,
        targetPosition: new THREE.Vector3((col - gridSize / 2 + 0.5) * pieceSize, (gridSize / 2 - 0.5 - row) * pieceSize, 0),
        originalPosition: null
    };
    piece.position.copy(piece.userData.targetPosition);
    piece.userData.originalPosition = piece.position.clone();
    return piece
}

function shufflePieces() {
    moveCount = 0;
    correctCount = 0;
    const positions = [];
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            positions.push({
                row,
                col
            })
        }
    }
    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]]
    }
    puzzlePieces.forEach((piece, index) => {
        const pos = positions[index];
        piece.userData.currentRow = pos.row;
        piece.userData.currentCol = pos.col;
        piece.userData.isCorrect = (piece.userData.originalRow === pos.row && piece.userData.originalCol === pos.col);
        piece.userData.targetPosition.set((pos.col - gridSize / 2 + 0.5) * pieceSize, (gridSize / 2 - 0.5 - pos.row) * pieceSize, 0);
        const startPosition = new THREE.Vector3((Math.random() - 0.5) * gridSize * 2, (Math.random() - 0.5) * gridSize * 2, Math.random() * 2 + 1);
        piece.position.copy(startPosition);
        piece.rotation.set(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1);
        const duration = 0.8 + Math.random() * 0.4;
        gsap.to(piece.position, {
            x: piece.userData.targetPosition.x,
            y: piece.userData.targetPosition.y,
            z: 0,
            duration: duration,
            ease: "bounce.out",
            delay: Math.random() * 0.2
        });
        gsap.to(piece.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: duration,
            ease: "power2.out",
            delay: Math.random() * 0.2
        })
    });
    setTimeout(() => {
        updateCorrectCount()
    }, 1200);
    showMessage(translations[currentLanguage].puzzleShuffled, 1500)
}

function handleTouchStart(event) {
    event.preventDefault();
    if (event.touches.length === 1) {
        const touch = event.touches[0];
        mouseDown = !0;
        isDragging = !0;
        dragStartTime = Date.now();
        lastMouseX = touch.clientX;
        lastMouseY = touch.clientY;
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        lastDragDelta.set(0, 0);
        sceneVelocity.set(0, 0);
        sceneVelocity.set(0, 0);
        if (modeMoveBtn.classList.contains('active')) {
            mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(puzzlePieces);
            if (intersects.length > 0) {
                const clickedPiece = intersects[0].object;
                if (!selectedPiece) {
                    selectPiece(clickedPiece)
                } else if (selectedPiece !== clickedPiece) {
                    swapPieces(selectedPiece, clickedPiece);
                    deselectPiece()
                } else {
                    deselectPiece()
                }
            } else {
                deselectPiece()
            }
        }
    }
}

function handleTouchMove(event) {
    event.preventDefault();
    if (event.touches.length === 1 && isDragging) {
        const touch = event.touches[0];
        const deltaX = touch.clientX - lastMouseX;
        const deltaY = touch.clientY - lastMouseY;
        if (modeRotateBtn.classList.contains('active')) {
            const speedMultiplier = isTouchDevice ? 0.7 : 1.0;
            scene.rotation.y += deltaX * rotationSpeed * speedMultiplier;
            scene.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, scene.rotation.x - deltaY * rotationSpeed * speedMultiplier));
            const inertiaMultiplier = isTouchDevice ? 0.12 : 0.2;
            sceneVelocity.x = deltaX * rotationSpeed * inertiaMultiplier;
            sceneVelocity.y = -deltaY * rotationSpeed * inertiaMultiplier;
            lastDragDelta.set(deltaX, deltaY)
        }
        lastMouseX = touch.clientX;
        lastMouseY = touch.clientY
    } else if (event.touches.length === 2) {
        event.preventDefault();
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const currentDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
        if (lastTouchDistance > 0) {
            const delta = currentDistance - lastTouchDistance;
            camera.position.z -= delta * 0.05;
            camera.position.z = Math.max(gridSize, Math.min(gridSize * 4, camera.position.z))
        }
        lastTouchDistance = currentDistance
    }
}

function handleTouchEnd(event) {
    event.preventDefault();
    if (event.touches.length === 0) {
        mouseDown = !1;
        if (modeRotateBtn.classList.contains('active')) {
            isDragging = !1;
            const dragDuration = Date.now() - dragStartTime;
            const touch = event.changedTouches[0];
            const dragDistance = Math.hypot(touch.clientX - touchStartX, touch.clientY - touchStartY);
            const minDragTime = isTouchDevice ? 100 : 150;
            const minDragDistance = isTouchDevice ? 10 : 15;
            const velocityMultiplier = isTouchDevice ? 2.5 : 1.8;
            if (dragDuration < minDragTime && dragDistance > minDragDistance) {
                sceneVelocity.multiplyScalar(velocityMultiplier);
                if (isTouchDevice) {
                    sceneFriction = 0.95
                }
            }
        }
        lastTouchDistance = 0
    }
}

function onMouseDown(event) {
    event.preventDefault();
    mouseDown = !0;
    isDragging = !0;
    dragStartTime = Date.now();
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    lastDragDelta.set(0, 0);
    sceneVelocity.set(0, 0);
    if (modeMoveBtn.classList.contains('active')) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(puzzlePieces);
        if (intersects.length > 0) {
            const clickedPiece = intersects[0].object;
            if (!selectedPiece) {
                selectPiece(clickedPiece)
            } else if (selectedPiece !== clickedPiece) {
                swapPieces(selectedPiece, clickedPiece);
                deselectPiece()
            } else {
                deselectPiece()
            }
        } else {
            deselectPiece()
        }
    }
}

function onMouseMove(event) {
    if (!mouseDown || !isDragging) return;
    const deltaX = event.clientX - lastMouseX;
    const deltaY = event.clientY - lastMouseY;
    if (modeRotateBtn.classList.contains('active')) {
        scene.rotation.y += deltaX * rotationSpeed;
        scene.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, scene.rotation.x - deltaY * rotationSpeed));
        sceneVelocity.x = deltaX * rotationSpeed * 0.2;
        sceneVelocity.y = -deltaY * rotationSpeed * 0.2;
        lastDragDelta.set(deltaX, deltaY)
    }
    lastMouseX = event.clientX;
    lastMouseY = event.clientY
}

function onMouseUp() {
    mouseDown = !1;
    if (modeRotateBtn.classList.contains('active')) {
        isDragging = !1;
        const dragDuration = Date.now() - dragStartTime;
        if (dragDuration < 150 && (Math.abs(lastDragDelta.x) > 8 || Math.abs(lastDragDelta.y) > 8)) {
            sceneVelocity.multiplyScalar(1.8)
        }
    }
}

function onWheel(event) {
    event.preventDefault();
    camera.position.z += event.deltaY * 0.01;
    camera.position.z = Math.max(gridSize, Math.min(gridSize * 4, camera.position.z))
}

function applyInertia() {
    if (!isDragging && (Math.abs(sceneVelocity.x) > 0.0001 || Math.abs(sceneVelocity.y) > 0.0001)) {
        scene.rotation.y += sceneVelocity.x;
        scene.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, scene.rotation.x + sceneVelocity.y));
        sceneVelocity.multiplyScalar(sceneDeceleration);
        if (isTouchDevice) {
            sceneFriction = 0.97
        }
        sceneVelocity.multiplyScalar(sceneFriction);
        if (Math.abs(sceneVelocity.x) < 0.0001 && Math.abs(sceneVelocity.y) < 0.0001) {
            sceneVelocity.set(0, 0)
        }
    }
}

function selectPiece(piece) {
    if (selectedPiece) {
        deselectPiece()
    }
    selectedPiece = piece;
    piece.userData.isSelected = !0;
    gsap.to(piece.position, {
        z: 0.2,
        duration: 0.2,
        ease: "power2.out"
    });
    gsap.to(piece.scale, {
        x: 1.05,
        y: 1.05,
        duration: 0.2,
        ease: "power2.out"
    })
}

function deselectPiece() {
    if (!selectedPiece) return;
    selectedPiece.userData.isSelected = !1;
    gsap.to(selectedPiece.position, {
        z: 0,
        duration: 0.2,
        ease: "power2.out"
    });
    gsap.to(selectedPiece.scale, {
        x: 1,
        y: 1,
        duration: 0.2,
        ease: "power2.out"
    });
    selectedPiece = null
}

function swapPieces(piece1, piece2) {
    const tempRow = piece1.userData.currentRow;
    const tempCol = piece1.userData.currentCol;
    piece1.userData.currentRow = piece2.userData.currentRow;
    piece1.userData.currentCol = piece2.userData.currentCol;
    piece2.userData.currentRow = tempRow;
    piece2.userData.currentCol = tempCol;
    piece1.userData.targetPosition.set((piece1.userData.currentCol - gridSize / 2 + 0.5) * pieceSize, (gridSize / 2 - 0.5 - piece1.userData.currentRow) * pieceSize, 0);
    piece2.userData.targetPosition.set((piece2.userData.currentCol - gridSize / 2 + 0.5) * pieceSize, (gridSize / 2 - 0.5 - piece2.userData.currentRow) * pieceSize, 0);
    animateSwap(piece1, piece2);
    moveCount++;
    piece1.userData.isCorrect = (piece1.userData.originalRow === piece1.userData.currentRow && piece1.userData.originalCol === piece1.userData.currentCol);
    piece2.userData.isCorrect = (piece2.userData.originalRow === piece2.userData.currentRow && piece2.userData.originalCol === piece2.userData.currentCol);
    updateCorrectCount();
    if (checkPuzzleComplete()) {
        celebrateCompletion()
    }
}

function animateSwap(piece1, piece2) {
    const midHeight = 0.6;
    gsap.to(piece1.position, {
        z: midHeight,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
            gsap.to(piece1.position, {
                x: piece1.userData.targetPosition.x,
                y: piece1.userData.targetPosition.y,
                z: 0,
                duration: 0.3,
                ease: "back.out(1.4)"
            })
        }
    });
    gsap.to(piece2.position, {
        z: midHeight,
        duration: 0.2,
        delay: 0.05,
        ease: "power2.out",
        onComplete: () => {
            gsap.to(piece2.position, {
                x: piece2.userData.targetPosition.x,
                y: piece2.userData.targetPosition.y,
                z: 0,
                duration: 0.3,
                ease: "back.out(1.4)"
            })
        }
    })
}

function updateCorrectCount() {
    correctCount = puzzlePieces.filter(piece => piece.userData.isCorrect).length
}

function checkPuzzleComplete() {
    return puzzlePieces.every(piece => piece.userData.isCorrect)
}

function celebrateCompletion() {
    puzzlePieces.forEach((piece, index) => {
        setTimeout(() => {
            gsap.to(piece.position, {
                z: 0.1,
                duration: 0.2,
                yoyo: !0,
                repeat: 1,
                ease: "sine.inOut"
            })
        }, index * 30)
    });
    showMessage(translations[currentLanguage].completed, 3000)
}

function showMessage(text, duration = 2000) {
    messageElem.textContent = text;
    messageElem.classList.add('show');
    setTimeout(() => {
        messageElem.classList.remove('show')
    }, duration)
}
async function solvePuzzle() {
    if (isSolving) return;
    isSolving = !0;
    showMessage(translations[currentLanguage].solving, 1500);
    deselectPiece();
    puzzlePieces.forEach((piece, index) => {
        piece.userData.currentRow = piece.userData.originalRow;
        piece.userData.currentCol = piece.userData.originalCol;
        piece.userData.isCorrect = !0;
        piece.userData.targetPosition.set((piece.userData.originalCol - gridSize / 2 + 0.5) * pieceSize, (gridSize / 2 - 0.5 - piece.userData.originalRow) * pieceSize, 0);
        setTimeout(() => {
            gsap.to(piece.position, {
                x: piece.userData.targetPosition.x,
                y: piece.userData.targetPosition.y,
                z: 0,
                duration: 0.5,
                ease: "back.out(1.4)"
            })
        }, index * 40)
    });
    moveCount += puzzlePieces.length;
    correctCount = gridSize * gridSize;
    await new Promise(resolve => setTimeout(resolve, puzzlePieces.length * 40 + 800));
    showMessage(translations[currentLanguage].solved, 2000);
    isSolving = !1
}

function toggleUICollapse() {
    uiCollapsed = !uiCollapsed;
    if (uiCollapsed) {
        ui.classList.add('collapsed');
        toggleUI.textContent = '▶';
        toggleUI.style.right = '-40px'
    } else {
        ui.classList.remove('collapsed');
        toggleUI.textContent = '◀'
    }
}

function changeLanguage(lang) {
    currentLanguage = lang;
    updateLanguageUI();
    saveLanguagePreference();
    updateLanguageDropdown()
}

function updateLanguageUI() {
    const t = translations[currentLanguage];
    titleElem.textContent = t.title;
    document.title = t.title + " 3D";
    modeMoveBtn.textContent = t.modeMove;
    modeRotateBtn.textContent = t.modeRotate;
    shuffleBtn.textContent = t.shuffle;
    solveBtn.textContent = t.solve;
    newImageBtn.textContent = t.newImage;
    hintElem.innerHTML = `${t.hintMove}<br>${t.hintRotate}`;
    imageCredit.textContent = t.imageCredit;
    const flags = {
        'en': '🇬🇧',
        'fr': '🇫🇷',
        'es': '🇪🇸'
    };
    const languageNames = {
        'en': 'English',
        'fr': 'Français',
        'es': 'Español'
    };
    currentFlag.textContent = flags[currentLanguage];
    currentLanguageText.textContent = languageNames[currentLanguage]
}

function updateLanguageDropdown() {
    languageOptions.forEach(option => {
        const lang = option.dataset.lang;
        option.classList.remove('active');
        if (lang === currentLanguage) {
            option.classList.add('active')
        }
    })
}

function saveLanguagePreference() {
    localStorage.setItem('puzzleLanguage', currentLanguage)
}

function loadLanguagePreference() {
    const savedLang = localStorage.getItem('puzzleLanguage');
    if (savedLang && translations[savedLang]) {
        changeLanguage(savedLang)
    } else {
        changeLanguage('en')
    }
}

function setupEventListeners() {
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('mouseleave', onMouseUp);
    renderer.domElement.addEventListener('wheel', onWheel);
    renderer.domElement.addEventListener('touchstart', handleTouchStart, {
        passive: !1
    });
    renderer.domElement.addEventListener('touchmove', handleTouchMove, {
        passive: !1
    });
    renderer.domElement.addEventListener('touchend', handleTouchEnd, {
        passive: !1
    });
    renderer.domElement.addEventListener('touchcancel', handleTouchEnd, {
        passive: !1
    });
    renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('resize', onWindowResize);
    shuffleBtn.addEventListener('click', () => {
        if (!isSolving) {
            shufflePieces()
        }
    });
    solveBtn.addEventListener('click', solvePuzzle);
    newImageBtn.addEventListener('click', async () => {
        if (!isSolving) {
            await loadRandomImage()
        }
    });
    difficultySelect.addEventListener('change', async () => {
        if (!isSolving) {
            await createPuzzleFromImage(currentImageUrl)
        }
    });
    modeMoveBtn.addEventListener('click', () => {
        modeMoveBtn.classList.add('active');
        modeRotateBtn.classList.remove('active');
        sceneVelocity.set(0, 0)
    });
    modeRotateBtn.addEventListener('click', () => {
        modeRotateBtn.classList.add('active');
        modeMoveBtn.classList.remove('active');
        sceneVelocity.set(0, 0)
    });
    toggleUI.addEventListener('click', toggleUICollapse);
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('show')
    });
    document.addEventListener('click', (e) => {
        if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('show')
        }
    });
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            changeLanguage(lang);
            languageDropdown.classList.remove('show')
        })
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && languageDropdown.classList.contains('show')) {
            languageDropdown.classList.remove('show')
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || languageDropdown.classList.contains('show')) {
            return
        }
        if (e.key === '+' || e.key === '=') {
            e.preventDefault();
            if (!modeMoveBtn.classList.contains('active')) {
                modeMoveBtn.click()
            }
        }
        if (e.key === '-' || e.key === '_') {
            e.preventDefault();
            if (!modeRotateBtn.classList.contains('active')) {
                modeRotateBtn.click()
            }
        }
    })
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
    requestAnimationFrame(animate);
    applyInertia();
    renderer.render(scene, camera)
}
init();
animate()