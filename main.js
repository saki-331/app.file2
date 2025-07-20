/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
// 23FI013


class ThreeJSContainer {
    scene;
    camera;
    renderer;
    controls;
    createRendererDOM = (width, height, cameraPos) => {
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x0a0a5c));
        this.camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(60, width / height, 0.1, 1000);
        this.camera.position.copy(cameraPos);
        this.controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.createScene();
        const render = () => {
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(render);
        };
        render();
        this.renderer.domElement.style.cssFloat = "left";
        this.renderer.domElement.style.margin = "10px";
        return this.renderer.domElement;
    };
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
        this.scene.background = new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x0a0a5c);
        // 地面 
        const groundGeo = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(40, 40, 40, 40);
        const craters = [
            { x: 5, y: 5, radius: 2, depth: 1 },
            { x: -3, y: 2, radius: 1.5, depth: 0.7 },
            { x: 0, y: -4, radius: 2.5, depth: 1.2 },
        ];
        for (let i = 0; i < groundGeo.attributes.position.count; i++) {
            const x = groundGeo.attributes.position.getX(i);
            const y = groundGeo.attributes.position.getY(i);
            let height = 0.5 * Math.sin(x * 2) * Math.cos(y * 2) + 0.3 * (Math.random() - 0.5);
            for (const crater of craters) {
                const dx = x - crater.x;
                const dy = y - crater.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < crater.radius) {
                    const factor = 1 - dist / crater.radius;
                    height -= crater.depth * factor * factor;
                }
            }
            groundGeo.attributes.position.setZ(i, height);
        }
        groundGeo.computeVertexNormals();
        const groundMat = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({
            color: 0xe0c878,
            roughness: 1.0,
            metalness: 0.0,
        });
        const ground = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        this.scene.add(ground);
        // --- 星 ---
        function createStars(count) {
            const stars = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
            const starGeo = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(0.07, 6, 6);
            const starMat = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: 0xffffff });
            for (let i = 0; i < count; i++) {
                const star = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(starGeo, starMat);
                star.position.set((Math.random() - 0.5) * 100, Math.random() * 100, (Math.random() - 0.5) * 100);
                stars.add(star);
            }
            return stars;
        }
        this.scene.add(createStars(500));
        // 光の粒 
        const lightPointCount = 200;
        const lightPositions = new Float32Array(lightPointCount * 3);
        for (let i = 0; i < lightPointCount; i++) {
            const x = (Math.random() - 0.5) * 40;
            const y = Math.random() * 15;
            const z = (Math.random() - 0.5) * 40;
            lightPositions[i * 3] = x;
            lightPositions[i * 3 + 1] = y;
            lightPositions[i * 3 + 2] = z;
        }
        const lightGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry();
        lightGeometry.setAttribute("position", new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(lightPositions, 3));
        const lightMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({
            color: 0xe0c878,
            size: 0.25,
            transparent: true,
            opacity: 0.8,
            blending: three__WEBPACK_IMPORTED_MODULE_1__.AdditiveBlending,
            depthWrite: false,
        });
        const lightPoints = new three__WEBPACK_IMPORTED_MODULE_1__.Points(lightGeometry, lightMaterial);
        this.scene.add(lightPoints);
        // 光源 
        this.scene.add(new three__WEBPACK_IMPORTED_MODULE_1__.AmbientLight(0xffffff, 0.6));
        const dirLight = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xffffff, 1);
        dirLight.position.set(10, 20, 10);
        this.scene.add(dirLight);
        // ウサギ
        function createRabbit() {
            const rabbit = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
            const bodyMat = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 });
            const body = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(1, 32, 32), bodyMat);
            body.scale.set(1, 0.8, 1.5);
            rabbit.add(body);
            const head = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(0.6, 32, 32), bodyMat);
            head.position.set(0, 1.1, 0.8);
            rabbit.add(head);
            const earGeo = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(0.15, 0.15, 1, 16);
            const earMat = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ color: 0xfffafa });
            const leftEar = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(earGeo, earMat);
            leftEar.position.set(-0.3, 1.8, 0.6);
            leftEar.rotation.z = 0.3;
            rabbit.add(leftEar);
            const rightEar = leftEar.clone();
            rightEar.position.x = 0.3;
            rightEar.rotation.z = -0.3;
            rabbit.add(rightEar);
            const legGeo = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(0.15, 0.15, 0.7, 8);
            const frontLeftLeg = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(legGeo, bodyMat);
            frontLeftLeg.position.set(-0.4, -0.5, 0.5);
            rabbit.add(frontLeftLeg);
            const frontRightLeg = frontLeftLeg.clone();
            frontRightLeg.position.x = 0.4;
            rabbit.add(frontRightLeg);
            const backLeftLeg = frontLeftLeg.clone();
            backLeftLeg.position.set(-0.4, -0.5, -0.5);
            rabbit.add(backLeftLeg);
            const backRightLeg = frontLeftLeg.clone();
            backRightLeg.position.set(0.4, -0.5, -0.5);
            rabbit.add(backRightLeg);
            const eyeGeo = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(0.1, 16, 16);
            const eyeMat = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: 0x000000 });
            const leftEye = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(eyeGeo, eyeMat);
            leftEye.position.set(-0.2, 1.2, 1.3);
            const rightEye = leftEye.clone();
            rightEye.position.x = 0.2;
            rabbit.add(leftEye, rightEye);
            return rabbit;
        }
        // 杵 
        function createKine() {
            const kine = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
            const mainGeo = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(0.15, 0.15, 2, 12);
            const mainMat = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ color: 0xdeb887, roughness: 0.7 });
            const mainStick = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(mainGeo, mainMat);
            mainStick.position.y = 1;
            kine.add(mainStick);
            const crossGeo = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(0.2, 0.2, 1.2, 12);
            const crossMat = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ color: 0xdeb887, roughness: 0.7 });
            const crossStick = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(crossGeo, crossMat);
            crossStick.rotation.z = Math.PI / 2;
            crossStick.position.set(-0.2, 1.9, 0);
            kine.add(crossStick);
            kine.rotation.y = Math.PI / 4;
            return kine;
        }
        // 臼 
        function createUsu() {
            const usu = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
            const outerGeo = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(2, 2, 1.2, 32);
            const outerMat = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ color: 0xd2b48c, roughness: 0.9 });
            const outer = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(outerGeo, outerMat);
            outer.position.y = 0.6;
            usu.add(outer);
            const innerGeo = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(1.5, 1.5, 1.3, 32);
            const innerMat = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 });
            const inner = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(innerGeo, innerMat);
            inner.position.y = 0.7;
            usu.add(inner);
            return usu;
        }
        const usu = createUsu();
        usu.position.set(0, 0, 0);
        this.scene.add(usu);
        const mochiRabbit = createRabbit();
        mochiRabbit.position.set(1.5, 5, 3.5);
        const lookTarget = usu.position.clone().clone().add(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 5, 0));
        mochiRabbit.lookAt(lookTarget);
        this.scene.add(mochiRabbit);
        const kinePivot = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
        kinePivot.position.set(0.6, 0.4, 1);
        mochiRabbit.add(kinePivot);
        const kine = createKine();
        kine.rotation.z = Math.PI / 4;
        kine.position.y = 1;
        kinePivot.add(kine);
        // ウサギ
        const rabbits = [];
        const radius = 8;
        const rabbitCount = 8;
        for (let i = 0; i < rabbitCount; i++) {
            const r = createRabbit();
            const angle = (i / rabbitCount) * Math.PI * 2;
            r.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
            r.lookAt(0, 0, 0);
            this.scene.add(r);
            rabbits.push(r);
        }
        let time = 0;
        const animateUpdate = () => {
            time += 0.02;
            const lightPosArray = lightGeometry.attributes.position.array;
            for (let i = 1; i < lightPosArray.length; i += 3) {
                lightPosArray[i] += 0.015;
                if (lightPosArray[i] > 10)
                    lightPosArray[i] = -10;
            }
            lightGeometry.attributes.position.needsUpdate = true;
            kinePivot.rotation.x = Math.sin(time * 4) * 0.8;
            mochiRabbit.position.y = 0.3 + 0.1 * Math.abs(Math.sin(time * 4));
            rabbits.forEach((r, i) => {
                const angleOffset = (i / rabbitCount) * Math.PI * 2;
                const angle = time * 0.8 + angleOffset;
                r.position.x = Math.cos(angle) * radius;
                r.position.z = Math.sin(angle) * radius;
                r.position.y = 0.5 + Math.abs(Math.sin(time * 3 + i)) * 1.2;
                r.rotation.y = angle + Math.sin(time * 5 + i) * 0.3;
            });
            requestAnimationFrame(animateUpdate);
        };
        animateUpdate();
    };
}
window.addEventListener("DOMContentLoaded", () => {
    const container = new ThreeJSContainer();
    const viewport = container.createRendererDOM(window.innerWidth, window.innerHeight, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(10, 10, 25));
    document.body.appendChild(viewport);
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_examples_jsm_controls_OrbitControls_js"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NncHJlbmRlcmluZy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAyM0ZJMDEzXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gIHByaXZhdGUgc2NlbmUhOiBUSFJFRS5TY2VuZTtcbiAgcHJpdmF0ZSBjYW1lcmEhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcbiAgcHJpdmF0ZSByZW5kZXJlciE6IFRIUkVFLldlYkdMUmVuZGVyZXI7XG4gIHByaXZhdGUgY29udHJvbHMhOiBPcmJpdENvbnRyb2xzO1xuXG5cbiAgcHVibGljIGNyZWF0ZVJlbmRlcmVyRE9NID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjYW1lcmFQb3M6IFRIUkVFLlZlY3RvcjMpID0+IHtcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihuZXcgVEhSRUUuQ29sb3IoMHgwYTBhNWMpKTtcblxuICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDYwLCB3aWR0aCAvIGhlaWdodCwgMC4xLCAxMDAwKTtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi5jb3B5KGNhbWVyYVBvcyk7XG5cbiAgICB0aGlzLmNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHModGhpcy5jYW1lcmEsIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gICAgdGhpcy5jb250cm9scy5lbmFibGVEYW1waW5nID0gdHJ1ZTtcblxuICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcblxuICAgIFxuICAgIGNvbnN0IHJlbmRlciA9ICgpID0+IHtcbiAgICAgIHRoaXMuY29udHJvbHMudXBkYXRlKCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICB9O1xuICAgIHJlbmRlcigpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJsZWZ0XCI7XG4gICAgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLm1hcmdpbiA9IFwiMTBweFwiO1xuXG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudDtcbiAgfTtcblxuICBwcml2YXRlIGNyZWF0ZVNjZW5lID0gKCkgPT4ge1xuICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICB0aGlzLnNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHgwYTBhNWMpO1xuXG4gICAgLy8g5Zyw6Z2iIFxuICAgIGNvbnN0IGdyb3VuZEdlbyA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDQwLCA0MCwgNDAsIDQwKTtcbiAgICBjb25zdCBjcmF0ZXJzID0gW1xuICAgICAgeyB4OiA1LCB5OiA1LCByYWRpdXM6IDIsIGRlcHRoOiAxIH0sXG4gICAgICB7IHg6IC0zLCB5OiAyLCByYWRpdXM6IDEuNSwgZGVwdGg6IDAuNyB9LFxuICAgICAgeyB4OiAwLCB5OiAtNCwgcmFkaXVzOiAyLjUsIGRlcHRoOiAxLjIgfSxcbiAgICBdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdW5kR2VvLmF0dHJpYnV0ZXMucG9zaXRpb24uY291bnQ7IGkrKykge1xuICAgICAgY29uc3QgeCA9IGdyb3VuZEdlby5hdHRyaWJ1dGVzLnBvc2l0aW9uLmdldFgoaSk7XG4gICAgICBjb25zdCB5ID0gZ3JvdW5kR2VvLmF0dHJpYnV0ZXMucG9zaXRpb24uZ2V0WShpKTtcbiAgICAgIGxldCBoZWlnaHQgPSAwLjUgKiBNYXRoLnNpbih4ICogMikgKiBNYXRoLmNvcyh5ICogMikgKyAwLjMgKiAoTWF0aC5yYW5kb20oKSAtIDAuNSk7XG4gICAgICBmb3IgKGNvbnN0IGNyYXRlciBvZiBjcmF0ZXJzKSB7XG4gICAgICAgIGNvbnN0IGR4ID0geCAtIGNyYXRlci54O1xuICAgICAgICBjb25zdCBkeSA9IHkgLSBjcmF0ZXIueTtcbiAgICAgICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgIGlmIChkaXN0IDwgY3JhdGVyLnJhZGl1cykge1xuICAgICAgICAgIGNvbnN0IGZhY3RvciA9IDEgLSBkaXN0IC8gY3JhdGVyLnJhZGl1cztcbiAgICAgICAgICBoZWlnaHQgLT0gY3JhdGVyLmRlcHRoICogZmFjdG9yICogZmFjdG9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBncm91bmRHZW8uYXR0cmlidXRlcy5wb3NpdGlvbi5zZXRaKGksIGhlaWdodCk7XG4gICAgfVxuICAgIGdyb3VuZEdlby5jb21wdXRlVmVydGV4Tm9ybWFscygpO1xuXG4gICAgY29uc3QgZ3JvdW5kTWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGUwYzg3OCxcbiAgICAgIHJvdWdobmVzczogMS4wLFxuICAgICAgbWV0YWxuZXNzOiAwLjAsXG4gICAgfSk7XG4gICAgY29uc3QgZ3JvdW5kID0gbmV3IFRIUkVFLk1lc2goZ3JvdW5kR2VvLCBncm91bmRNYXQpO1xuICAgIGdyb3VuZC5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyAyO1xuICAgIHRoaXMuc2NlbmUuYWRkKGdyb3VuZCk7XG5cbiAgICAvLyAtLS0g5pifIC0tLVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVN0YXJzKGNvdW50OiBudW1iZXIpIHtcbiAgICAgIGNvbnN0IHN0YXJzID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgICBjb25zdCBzdGFyR2VvID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMDcsIDYsIDYpO1xuICAgICAgY29uc3Qgc3Rhck1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN0YXIgPSBuZXcgVEhSRUUuTWVzaChzdGFyR2VvLCBzdGFyTWF0KTtcbiAgICAgICAgc3Rhci5wb3NpdGlvbi5zZXQoXG4gICAgICAgICAgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMTAwLFxuICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiAxMDAsXG4gICAgICAgICAgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMTAwXG4gICAgICAgICk7XG4gICAgICAgIHN0YXJzLmFkZChzdGFyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGFycztcbiAgICB9XG4gICAgdGhpcy5zY2VuZS5hZGQoY3JlYXRlU3RhcnMoNTAwKSk7XG5cbiAgICAvLyDlhYnjga7nspIgXG4gICAgY29uc3QgbGlnaHRQb2ludENvdW50ID0gMjAwO1xuICAgIGNvbnN0IGxpZ2h0UG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShsaWdodFBvaW50Q291bnQgKiAzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpZ2h0UG9pbnRDb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCB4ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogNDA7XG4gICAgICBjb25zdCB5ID0gTWF0aC5yYW5kb20oKSAqIDE1O1xuICAgICAgY29uc3QgeiA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDQwO1xuICAgICAgbGlnaHRQb3NpdGlvbnNbaSAqIDNdID0geDtcbiAgICAgIGxpZ2h0UG9zaXRpb25zW2kgKiAzICsgMV0gPSB5O1xuICAgICAgbGlnaHRQb3NpdGlvbnNbaSAqIDMgKyAyXSA9IHo7XG4gICAgfVxuICAgIGNvbnN0IGxpZ2h0R2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICBsaWdodEdlb21ldHJ5LnNldEF0dHJpYnV0ZShcInBvc2l0aW9uXCIsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobGlnaHRQb3NpdGlvbnMsIDMpKTtcbiAgICBjb25zdCBsaWdodE1hdGVyaWFsID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGUwYzg3OCxcbiAgICAgIHNpemU6IDAuMjUsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIG9wYWNpdHk6IDAuOCxcbiAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgfSk7XG4gICAgY29uc3QgbGlnaHRQb2ludHMgPSBuZXcgVEhSRUUuUG9pbnRzKGxpZ2h0R2VvbWV0cnksIGxpZ2h0TWF0ZXJpYWwpO1xuICAgIHRoaXMuc2NlbmUuYWRkKGxpZ2h0UG9pbnRzKTtcblxuICAgIC8vIOWFiea6kCBcbiAgICB0aGlzLnNjZW5lLmFkZChuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4ZmZmZmZmLCAwLjYpKTtcbiAgICBjb25zdCBkaXJMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmLCAxKTtcbiAgICBkaXJMaWdodC5wb3NpdGlvbi5zZXQoMTAsIDIwLCAxMCk7XG4gICAgdGhpcy5zY2VuZS5hZGQoZGlyTGlnaHQpO1xuXG4gICAgLy8g44Km44K144KuXG4gICAgZnVuY3Rpb24gY3JlYXRlUmFiYml0KCk6IFRIUkVFLkdyb3VwIHtcbiAgICAgIGNvbnN0IHJhYmJpdCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgICAgY29uc3QgYm9keU1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiwgcm91Z2huZXNzOiAwLjcgfSk7XG5cbiAgICAgIGNvbnN0IGJvZHkgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMSwgMzIsIDMyKSwgYm9keU1hdCk7XG4gICAgICBib2R5LnNjYWxlLnNldCgxLCAwLjgsIDEuNSk7XG4gICAgICByYWJiaXQuYWRkKGJvZHkpO1xuXG4gICAgICBjb25zdCBoZWFkID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuNiwgMzIsIDMyKSwgYm9keU1hdCk7XG4gICAgICBoZWFkLnBvc2l0aW9uLnNldCgwLCAxLjEsIDAuOCk7XG4gICAgICByYWJiaXQuYWRkKGhlYWQpO1xuXG4gICAgICBjb25zdCBlYXJHZW8gPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjE1LCAwLjE1LCAxLCAxNik7XG4gICAgICBjb25zdCBlYXJNYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZhZmEgfSk7XG4gICAgICBjb25zdCBsZWZ0RWFyID0gbmV3IFRIUkVFLk1lc2goZWFyR2VvLCBlYXJNYXQpO1xuICAgICAgbGVmdEVhci5wb3NpdGlvbi5zZXQoLTAuMywgMS44LCAwLjYpO1xuICAgICAgbGVmdEVhci5yb3RhdGlvbi56ID0gMC4zO1xuICAgICAgcmFiYml0LmFkZChsZWZ0RWFyKTtcblxuICAgICAgY29uc3QgcmlnaHRFYXIgPSBsZWZ0RWFyLmNsb25lKCk7XG4gICAgICByaWdodEVhci5wb3NpdGlvbi54ID0gMC4zO1xuICAgICAgcmlnaHRFYXIucm90YXRpb24ueiA9IC0wLjM7XG4gICAgICByYWJiaXQuYWRkKHJpZ2h0RWFyKTtcblxuICAgICAgY29uc3QgbGVnR2VvID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC4xNSwgMC4xNSwgMC43LCA4KTtcbiAgICAgIGNvbnN0IGZyb250TGVmdExlZyA9IG5ldyBUSFJFRS5NZXNoKGxlZ0dlbywgYm9keU1hdCk7XG4gICAgICBmcm9udExlZnRMZWcucG9zaXRpb24uc2V0KC0wLjQsIC0wLjUsIDAuNSk7XG4gICAgICByYWJiaXQuYWRkKGZyb250TGVmdExlZyk7XG5cbiAgICAgIGNvbnN0IGZyb250UmlnaHRMZWcgPSBmcm9udExlZnRMZWcuY2xvbmUoKTtcbiAgICAgIGZyb250UmlnaHRMZWcucG9zaXRpb24ueCA9IDAuNDtcbiAgICAgIHJhYmJpdC5hZGQoZnJvbnRSaWdodExlZyk7XG5cbiAgICAgIGNvbnN0IGJhY2tMZWZ0TGVnID0gZnJvbnRMZWZ0TGVnLmNsb25lKCk7XG4gICAgICBiYWNrTGVmdExlZy5wb3NpdGlvbi5zZXQoLTAuNCwgLTAuNSwgLTAuNSk7XG4gICAgICByYWJiaXQuYWRkKGJhY2tMZWZ0TGVnKTtcblxuICAgICAgY29uc3QgYmFja1JpZ2h0TGVnID0gZnJvbnRMZWZ0TGVnLmNsb25lKCk7XG4gICAgICBiYWNrUmlnaHRMZWcucG9zaXRpb24uc2V0KDAuNCwgLTAuNSwgLTAuNSk7XG4gICAgICByYWJiaXQuYWRkKGJhY2tSaWdodExlZyk7XG5cbiAgICAgIGNvbnN0IGV5ZUdlbyA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjEsIDE2LCAxNik7XG4gICAgICBjb25zdCBleWVNYXQgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHgwMDAwMDAgfSk7XG4gICAgICBjb25zdCBsZWZ0RXllID0gbmV3IFRIUkVFLk1lc2goZXllR2VvLCBleWVNYXQpO1xuICAgICAgbGVmdEV5ZS5wb3NpdGlvbi5zZXQoLTAuMiwgMS4yLCAxLjMpO1xuICAgICAgY29uc3QgcmlnaHRFeWUgPSBsZWZ0RXllLmNsb25lKCk7XG4gICAgICByaWdodEV5ZS5wb3NpdGlvbi54ID0gMC4yO1xuICAgICAgcmFiYml0LmFkZChsZWZ0RXllLCByaWdodEV5ZSk7XG5cbiAgICAgIHJldHVybiByYWJiaXQ7XG4gICAgfVxuXG4gICAgLy8g5p21IFxuICAgIGZ1bmN0aW9uIGNyZWF0ZUtpbmUoKTogVEhSRUUuR3JvdXAge1xuICAgICAgY29uc3Qga2luZSA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuXG4gICAgICBjb25zdCBtYWluR2VvID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC4xNSwgMC4xNSwgMiwgMTIpO1xuICAgICAgY29uc3QgbWFpbk1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IGNvbG9yOiAweGRlYjg4Nywgcm91Z2huZXNzOiAwLjcgfSk7XG4gICAgICBjb25zdCBtYWluU3RpY2sgPSBuZXcgVEhSRUUuTWVzaChtYWluR2VvLCBtYWluTWF0KTtcbiAgICAgIG1haW5TdGljay5wb3NpdGlvbi55ID0gMTtcbiAgICAgIGtpbmUuYWRkKG1haW5TdGljayk7XG5cbiAgICAgIGNvbnN0IGNyb3NzR2VvID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC4yLCAwLjIsIDEuMiwgMTIpO1xuICAgICAgY29uc3QgY3Jvc3NNYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHhkZWI4ODcsIHJvdWdobmVzczogMC43IH0pO1xuICAgICAgY29uc3QgY3Jvc3NTdGljayA9IG5ldyBUSFJFRS5NZXNoKGNyb3NzR2VvLCBjcm9zc01hdCk7XG4gICAgICBjcm9zc1N0aWNrLnJvdGF0aW9uLnogPSBNYXRoLlBJIC8gMjtcbiAgICAgIGNyb3NzU3RpY2sucG9zaXRpb24uc2V0KC0wLjIsIDEuOSwgMCk7XG4gICAgICBraW5lLmFkZChjcm9zc1N0aWNrKTtcblxuICAgICAga2luZS5yb3RhdGlvbi55ID0gTWF0aC5QSSAvIDQ7XG5cbiAgICAgIHJldHVybiBraW5lO1xuICAgIH1cblxuICAgIC8vIOiHvCBcbiAgICBmdW5jdGlvbiBjcmVhdGVVc3UoKTogVEhSRUUuR3JvdXAge1xuICAgICAgY29uc3QgdXN1ID0gbmV3IFRIUkVFLkdyb3VwKCk7XG5cbiAgICAgIGNvbnN0IG91dGVyR2VvID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMiwgMiwgMS4yLCAzMik7XG4gICAgICBjb25zdCBvdXRlck1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IGNvbG9yOiAweGQyYjQ4Yywgcm91Z2huZXNzOiAwLjkgfSk7XG4gICAgICBjb25zdCBvdXRlciA9IG5ldyBUSFJFRS5NZXNoKG91dGVyR2VvLCBvdXRlck1hdCk7XG4gICAgICBvdXRlci5wb3NpdGlvbi55ID0gMC42O1xuICAgICAgdXN1LmFkZChvdXRlcik7XG5cbiAgICAgIGNvbnN0IGlubmVyR2VvID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMS41LCAxLjUsIDEuMywgMzIpO1xuICAgICAgY29uc3QgaW5uZXJNYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYsIHJvdWdobmVzczogMC43IH0pO1xuICAgICAgY29uc3QgaW5uZXIgPSBuZXcgVEhSRUUuTWVzaChpbm5lckdlbywgaW5uZXJNYXQpO1xuICAgICAgaW5uZXIucG9zaXRpb24ueSA9IDAuNztcbiAgICAgIHVzdS5hZGQoaW5uZXIpO1xuXG4gICAgICByZXR1cm4gdXN1O1xuICAgIH1cblxuICAgIGNvbnN0IHVzdSA9IGNyZWF0ZVVzdSgpO1xuICAgIHVzdS5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XG4gICAgdGhpcy5zY2VuZS5hZGQodXN1KTtcblxuICAgIGNvbnN0IG1vY2hpUmFiYml0ID0gY3JlYXRlUmFiYml0KCk7XG4gICAgbW9jaGlSYWJiaXQucG9zaXRpb24uc2V0KDEuNSwgNSwgMy41KTtcbiAgICBjb25zdCBsb29rVGFyZ2V0ID0gdXN1LnBvc2l0aW9uLmNsb25lKCkuYWRkKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDUsIDApKTtcbiAgICBtb2NoaVJhYmJpdC5sb29rQXQobG9va1RhcmdldCk7XG4gICAgdGhpcy5zY2VuZS5hZGQobW9jaGlSYWJiaXQpO1xuXG4gICAgY29uc3Qga2luZVBpdm90ID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAga2luZVBpdm90LnBvc2l0aW9uLnNldCgwLjYsIDAuNCwgMSk7XG4gICAgbW9jaGlSYWJiaXQuYWRkKGtpbmVQaXZvdCk7XG5cbiAgICBjb25zdCBraW5lID0gY3JlYXRlS2luZSgpO1xuICAgIGtpbmUucm90YXRpb24ueiA9IE1hdGguUEkgLyA0O1xuICAgIGtpbmUucG9zaXRpb24ueSA9IDE7XG4gICAga2luZVBpdm90LmFkZChraW5lKTtcblxuICAgIC8vIOOCpuOCteOCrlxuICAgIGNvbnN0IHJhYmJpdHM6IFRIUkVFLkdyb3VwW10gPSBbXTtcbiAgICBjb25zdCByYWRpdXMgPSA4O1xuICAgIGNvbnN0IHJhYmJpdENvdW50ID0gODtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFiYml0Q291bnQ7IGkrKykge1xuICAgICAgY29uc3QgciA9IGNyZWF0ZVJhYmJpdCgpO1xuICAgICAgY29uc3QgYW5nbGUgPSAoaSAvIHJhYmJpdENvdW50KSAqIE1hdGguUEkgKiAyO1xuICAgICAgci5wb3NpdGlvbi5zZXQoTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzLCAwLCBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXMpO1xuICAgICAgci5sb29rQXQoMCwgMCwgMCk7XG4gICAgICB0aGlzLnNjZW5lLmFkZChyKTtcbiAgICAgIHJhYmJpdHMucHVzaChyKTtcbiAgICB9XG5cbiAgICBsZXQgdGltZSA9IDA7XG5cbiAgICBjb25zdCBhbmltYXRlVXBkYXRlID0gKCkgPT4ge1xuICAgICAgdGltZSArPSAwLjAyO1xuXG4gICAgICBjb25zdCBsaWdodFBvc0FycmF5ID0gbGlnaHRHZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmFycmF5IGFzIEZsb2F0MzJBcnJheTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGlnaHRQb3NBcnJheS5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICBsaWdodFBvc0FycmF5W2ldICs9IDAuMDE1O1xuICAgICAgICBpZiAobGlnaHRQb3NBcnJheVtpXSA+IDEwKSBsaWdodFBvc0FycmF5W2ldID0gLTEwO1xuICAgICAgfVxuICAgICAgbGlnaHRHZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgICAga2luZVBpdm90LnJvdGF0aW9uLnggPSBNYXRoLnNpbih0aW1lICogNCkgKiAwLjg7XG5cbiAgICAgIG1vY2hpUmFiYml0LnBvc2l0aW9uLnkgPSAwLjMgKyAwLjEgKiBNYXRoLmFicyhNYXRoLnNpbih0aW1lICogNCkpO1xuXG4gICAgICByYWJiaXRzLmZvckVhY2goKHIsIGkpID0+IHtcbiAgICAgICAgY29uc3QgYW5nbGVPZmZzZXQgPSAoaSAvIHJhYmJpdENvdW50KSAqIE1hdGguUEkgKiAyO1xuICAgICAgICBjb25zdCBhbmdsZSA9IHRpbWUgKiAwLjggKyBhbmdsZU9mZnNldDtcbiAgICAgICAgci5wb3NpdGlvbi54ID0gTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xuICAgICAgICByLnBvc2l0aW9uLnogPSBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XG4gICAgICAgIHIucG9zaXRpb24ueSA9IDAuNSArIE1hdGguYWJzKE1hdGguc2luKHRpbWUgKiAzICsgaSkpICogMS4yO1xuICAgICAgICByLnJvdGF0aW9uLnkgPSBhbmdsZSArIE1hdGguc2luKHRpbWUgKiA1ICsgaSkgKiAwLjM7XG4gICAgICB9KTtcblxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVVcGRhdGUpO1xuICAgIH07XG4gICAgYW5pbWF0ZVVwZGF0ZSgpO1xuICB9O1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xuICBjb25zdCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCBuZXcgVEhSRUUuVmVjdG9yMygxMCwgMTAsIDI1KSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xufSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9