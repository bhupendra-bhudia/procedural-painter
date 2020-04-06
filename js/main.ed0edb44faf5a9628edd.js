(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"/dgu":function(e,t,n){e.exports=n.p+"assets/textures/dark-s_px.jpg"},"3K/N":function(e,t){e.exports='precision highp float;\n#define GLSLIFY 1\n\n//\n// GLSL textureless classic 3D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-10-11\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n\nattribute float vertexDisplacement;\n\nuniform float delta;\n\nvarying float vOpacity;\nvarying vec3 vUv;\n\nconst float PI = 3.14159265358979323846264;\nconst vec3 noiseVec3 = vec3(PI);\n\nvoid main() {\n    vUv = position;\n    vOpacity = vertexDisplacement;\n\n    vec3 p = position;\n\n    float displacement = pnoise(p + noiseVec3, noiseVec3) * 1.5;\n\n    p.x += sin(vertexDisplacement) * 50.0 + displacement * 10.0;\n    p.y += cos(vertexDisplacement) * 50.0 + displacement * 10.0;\n\n    vec4 modelViewPosition = modelViewMatrix * vec4(p, 1.0);\n    gl_Position = projectionMatrix * modelViewPosition;\n}\n'},"G/Gv":function(e,t){e.exports="precision highp float;\n#define GLSLIFY 1\n\nuniform float delta;\n\nvarying float vOpacity;\nvarying vec3 vUv;\n\nvoid main() {\n    float r = 1.0 + cos(vUv.x * delta);\n    float g = 0.5 + sin(delta) * 0.5;\n    float b = 0.0;\n    vec3 rgb = vec3(r, g, b);\n\n    gl_FragColor = vec4(rgb, vOpacity);\n}\n"},"I/Yd":function(e,t){e.exports="data:image/png;base64,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"},P8kk:function(e,t,n){e.exports=n.p+"assets/textures/dark-s_nz.jpg"},SKox:function(e,t,n){e.exports=n.p+"assets/textures/dark-s_pz.jpg"},e6Wu:function(e,t,n){"use strict";n.r(t);var i=n("Womt"),r=(n("SYky"),n("hZTp"),n("nPuz")),a=n.n(r),o=n("uPvV"),s=n.n(o),c=n("3K/N"),p=n("G/Gv");function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var d,u=n("xlnb"),g=n("MZFn"),v=n("zxTW"),m=n("I/Yd"),f=n("/dgu"),x=n("k/8N"),y=n("hU0l"),w=n("xkw7"),A=n("SKox"),b=n("P8kk");d=new(function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(h(this,e),this.width=window.innerWidth,this.height=window.innerHeight,t.container)this.container=t.container;else{var n=e.createContainer();document.body.appendChild(n),this.container=n}if(s.a.isWebGLAvailable())this.init(),this.render();else{var i=s.a.getWebGLErrorMessage();this.container.appendChild(i)}}var t,n,r;return t=e,r=[{key:"createContainer",value:function(){var e=document.createElement("div");return e.setAttribute("class","container"),e.setAttribute("id","canvas-container"),e}}],(n=[{key:"init",value:function(){this.scene=new i.Scene,this.stats=new g,this.setupRenderer(),this.setupCamera(),this.setupLights(),this.setupHelpers(),this.setupFloor(),this.setupControls(),this.setupCube(),this.setupCustomObject(),this.setupParticleSystem(),this.setupGroupObject(),this.setupSkyBox(),this.setupParamsControl()}},{key:"render",value:function(){var e=this;this.stats.update(),this.controls.update(),this.animate(),this.renderer.render(this.scene,this.camera),requestAnimationFrame((function(){return e.render()}))}},{key:"setupRenderer",value:function(){this.renderer=new i.WebGLRenderer({antialias:!0}),this.renderer.setClearColor(2236962),this.renderer.setPixelRatio(window.devicePixelRatio||1),this.renderer.setSize(this.width,this.height),this.renderer.shadowMap.enabled=!0,this.container.appendChild(this.stats.dom),this.container.appendChild(this.renderer.domElement)}},{key:"setupCamera",value:function(){var e=this.width/this.height;this.camera=new i.PerspectiveCamera(75,e,.1,1e4),this.camera.position.set(100,100,100),this.camera.lookAt(this.scene.position)}},{key:"setupLights",value:function(){this.dirLight=new i.DirectionalLight(4620980,1),this.dirLight.position.set(120,30,-200),this.dirLight.castShadow=!0,this.dirLight.shadow.camera.near=10,this.scene.add(this.dirLight),this.spotLight=new i.SpotLight(16755285),this.spotLight.position.set(100,50,0),this.spotLight.castShadow=!0,this.dirLight.shadow.camera.near=10,this.scene.add(this.spotLight);var e=new i.AmbientLight(131586);this.scene.add(e)}},{key:"setupCube",value:function(){var e=new i.CubeGeometry(20,20,20),t=new i.MeshLambertMaterial({color:16497669}),n=new i.Mesh(e,t);n.position.set(0,10,0),this.cube=n,this.scene.add(n)}},{key:"setupHelpers",value:function(){var e=new i.GridHelper(200,16);this.scene.add(e);var t=new i.AxisHelper(75);this.scene.add(t);var n=new i.DirectionalLightHelper(this.dirLight,10);this.scene.add(n);var r=new i.CameraHelper(this.dirLight.shadow.camera);this.scene.add(r);var a=new i.SpotLightHelper(this.spotLight);this.scene.add(a);var o=new i.CameraHelper(this.spotLight.shadow.camera);this.scene.add(o)}},{key:"setupFloor",value:function(){var e=new i.PlaneGeometry(200,200,1,1),t=(new i.TextureLoader).load(v);t.wrapS=i.RepeatWrapping,t.wrapT=i.RepeatWrapping,t.repeat.set(4,4);var n=new i.MeshBasicMaterial({side:i.DoubleSide,map:t}),r=new i.Mesh(e,n);r.position.y=-.5,r.rotation.x=Math.PI/2,this.scene.add(r)}},{key:"setupControls",value:function(){this.controls=new a.a(this.camera,this.renderer.domElement),this.controls.enabled=!0,this.controls.maxDistance=1500,this.controls.minDistance=0,this.controls.autoRotate=!0}},{key:"setupParamsControl",value:function(){var e=(new u.GUI).addFolder("Camera");e.add(this.camera.position,"x").name("Camera X").min(0).max(100),e.add(this.camera.position,"y").name("Camera Y").min(0).max(100),e.add(this.camera.position,"z").name("Camera Z").min(0).max(100),e.open()}},{key:"setupCustomObject",value:function(){this.delta=0;var e=new i.ShaderMaterial({vertexShader:c,fragmentShader:p,uniforms:{delta:{value:0}}}),t=new i.SphereBufferGeometry(5,64,64);this.vertexDisplacement=new Float32Array(t.attributes.position.count);for(var n=0;n<this.vertexDisplacement.length;n+=1)this.vertexDisplacement[n]=Math.sin(n)*Math.random()*.75+Math.cos(n)*Math.random()*.25;t.addAttribute("vertexDisplacement",new i.BufferAttribute(this.vertexDisplacement,1)),this.customMesh=new i.Mesh(t,e),this.customMesh.position.set(5,5,5),this.scene.add(this.customMesh)}},{key:"setupParticleSystem",value:function(){for(var e=new i.Geometry,t=0;t<500;t+=1){var n=new i.Vector3;n.x=i.Math.randFloatSpread(55),n.y=i.Math.randFloatSpread(55),n.z=i.Math.randFloatSpread(55),e.vertices.push(n)}var r=(new i.TextureLoader).load(m),a=new i.PointsMaterial({size:5,map:r,transparent:!0,alphaTest:.5}),o=new i.Points(e,a);o.position.set(-50,50,-50),this.particleSystem=o,this.scene.add(this.particleSystem)}},{key:"setupGroupObject",value:function(){for(var e=new i.Group,t=new i.BoxGeometry(5,5,5),n=new i.MeshLambertMaterial({color:7834487}),r=0;r<50;r+=1){var a=new i.Mesh(t,n);a.position.x=i.Math.randFloatSpread(50),a.position.y=i.Math.randFloatSpread(50),a.position.z=i.Math.randFloatSpread(50),a.rotation.x=360*Math.random()*(Math.PI/180),a.rotation.y=360*Math.random()*(Math.PI/180),a.rotation.z=360*Math.random()*(Math.PI/180),e.add(a)}e.position.set(50,20,50),this.group=e,this.scene.add(this.group)}},{key:"setupSkyBox",value:function(){var e=Math.pow(2,6),t=(new i.CubeTextureLoader).load([f,x,y,w,A,b]),n=new i.Mesh(new i.SphereGeometry(5e3,e,e),new i.MeshBasicMaterial({color:16777215,envMap:t,side:i.BackSide,transparent:!0}));this.scene.add(n)}},{key:"animate",value:function(){this.delta+=.1,this.cube.rotation.y+=.01,this.particleSystem.rotation.y+=.01,this.particleSystem.rotation.z-=.01,this.group.rotation.y-=.01;for(var e=0;e<50;e+=1)e%2==0&&(this.group.children[e].rotation.x+=.02),e%3==0&&(this.group.children[e].rotation.y+=.03),e%4==0&&(this.group.children[e].rotation.z+=.04);this.customMesh.material.uniforms.delta.value=.5+.5*Math.sin(this.delta);for(var t=0;t<this.vertexDisplacement.length;t+=1)this.vertexDisplacement[t]=.5+.25*Math.sin(t+this.delta);this.customMesh.geometry.attributes.vertexDisplacement.needsUpdate=!0}}])&&l(t.prototype,n),r&&l(t,r),e}())({container:document.getElementById("canvas-container")}),console.log(d)},hU0l:function(e,t,n){e.exports=n.p+"assets/textures/dark-s_py.jpg"},hZTp:function(e,t,n){},"k/8N":function(e,t,n){e.exports=n.p+"assets/textures/dark-s_nx.jpg"},uPvV:function(e,t,n){(function(e){function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var n={isWebGLAvailable:function(){try{var e=document.createElement("canvas");return!(!window.WebGLRenderingContext||!e.getContext("webgl")&&!e.getContext("experimental-webgl"))}catch(e){return!1}},isWebGL2Available:function(){try{var e=document.createElement("canvas");return!(!window.WebGL2RenderingContext||!e.getContext("webgl2"))}catch(e){return!1}},getWebGLErrorMessage:function(){return this.getErrorMessage(1)},getWebGL2ErrorMessage:function(){return this.getErrorMessage(2)},getErrorMessage:function(e){var t={1:window.WebGLRenderingContext,2:window.WebGL2RenderingContext},n='Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>',i=document.createElement("div");return i.id="webglmessage",i.style.fontFamily="monospace",i.style.fontSize="13px",i.style.fontWeight="normal",i.style.textAlign="center",i.style.background="#fff",i.style.color="#000",i.style.padding="1.5em",i.style.width="400px",i.style.margin="5em auto 0",n=(n=t[e]?n.replace("$0","graphics card"):n.replace("$0","browser")).replace("$1",{1:"WebGL",2:"WebGL 2"}[e]),i.innerHTML=n,i}};"object"===t(e)&&(e.exports=n)}).call(this,n("YuTi")(e))},xkw7:function(e,t,n){e.exports=n.p+"assets/textures/dark-s_ny.jpg"},zxTW:function(e,t){e.exports="data:image/jpeg;base64,UklGRvgAAABXRUJQVlA4IOwAAAAQFwCdASoAAQABPpFAm0klo6KhKwgAsBIJaW7ha54A/gH4AfoB/AP3wfyprixsVD6jXTJdhydDt8i2qagewWG3qFOauS/nrp5Rq5L+dXGsmX9glNoifl0/pSNqcVlQE57BQPYLDb1CnNXJfz108o1cl/OrjWTL+wSm0RPy6f0pG1OKyoCc9goHsFht6hTmrkv566eUauS/nVxrJl/YJTaIn5dP6UjanFZUBOewUD2Cw29QpzVyX89dPKNXJfzq41gAAPjL3WQj2jI3wB4sVUKUczqnygDHoBBiqhSjmFAE1/bGWxUO4vuAAAAAAA=="}},[["e6Wu",1,2]]]);