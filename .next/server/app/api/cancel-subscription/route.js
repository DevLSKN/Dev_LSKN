"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/cancel-subscription/route";
exports.ids = ["app/api/cancel-subscription/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcancel-subscription%2Froute&page=%2Fapi%2Fcancel-subscription%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcancel-subscription%2Froute.js&appDir=C%3A%5CLSK_DEV%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CLSK_DEV&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcancel-subscription%2Froute&page=%2Fapi%2Fcancel-subscription%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcancel-subscription%2Froute.js&appDir=C%3A%5CLSK_DEV%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CLSK_DEV&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_LSK_DEV_app_api_cancel_subscription_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/cancel-subscription/route.js */ \"(rsc)/./app/api/cancel-subscription/route.js\");\n\r\n\r\n\r\n\r\n// We inject the nextConfigOutput here so that we can use them in the route\r\n// module.\r\nconst nextConfigOutput = \"\"\r\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\r\n    definition: {\r\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\r\n        page: \"/api/cancel-subscription/route\",\r\n        pathname: \"/api/cancel-subscription\",\r\n        filename: \"route\",\r\n        bundlePath: \"app/api/cancel-subscription/route\"\r\n    },\r\n    resolvedPagePath: \"C:\\\\LSK_DEV\\\\app\\\\api\\\\cancel-subscription\\\\route.js\",\r\n    nextConfigOutput,\r\n    userland: C_LSK_DEV_app_api_cancel_subscription_route_js__WEBPACK_IMPORTED_MODULE_3__\r\n});\r\n// Pull out the exports that we need to expose from the module. This should\r\n// be eliminated when we've moved the other routes to the new format. These\r\n// are used to hook into the route.\r\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\r\nconst originalPathname = \"/api/cancel-subscription/route\";\r\nfunction patchFetch() {\r\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\r\n        serverHooks,\r\n        staticGenerationAsyncStorage\r\n    });\r\n}\r\n\r\n\r\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjYW5jZWwtc3Vic2NyaXB0aW9uJTJGcm91dGUmcGFnZT0lMkZhcGklMkZjYW5jZWwtc3Vic2NyaXB0aW9uJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2FuY2VsLXN1YnNjcmlwdGlvbiUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDTFNLX0RFViU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q0xTS19ERVYmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ0k7QUFDakY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDtBQUN2SDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8veW91ci1wcm9qZWN0LW5hbWUvPzMwNTUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcclxuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcclxuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xyXG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcTFNLX0RFVlxcXFxhcHBcXFxcYXBpXFxcXGNhbmNlbC1zdWJzY3JpcHRpb25cXFxccm91dGUuanNcIjtcclxuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXHJcbi8vIG1vZHVsZS5cclxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcclxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XHJcbiAgICBkZWZpbml0aW9uOiB7XHJcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcclxuICAgICAgICBwYWdlOiBcIi9hcGkvY2FuY2VsLXN1YnNjcmlwdGlvbi9yb3V0ZVwiLFxyXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY2FuY2VsLXN1YnNjcmlwdGlvblwiLFxyXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXHJcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NhbmNlbC1zdWJzY3JpcHRpb24vcm91dGVcIlxyXG4gICAgfSxcclxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcTFNLX0RFVlxcXFxhcHBcXFxcYXBpXFxcXGNhbmNlbC1zdWJzY3JpcHRpb25cXFxccm91dGUuanNcIixcclxuICAgIG5leHRDb25maWdPdXRwdXQsXHJcbiAgICB1c2VybGFuZFxyXG59KTtcclxuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXHJcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxyXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxyXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcclxuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9jYW5jZWwtc3Vic2NyaXB0aW9uL3JvdXRlXCI7XHJcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XHJcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xyXG4gICAgICAgIHNlcnZlckhvb2tzLFxyXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XHJcblxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcancel-subscription%2Froute&page=%2Fapi%2Fcancel-subscription%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcancel-subscription%2Froute.js&appDir=C%3A%5CLSK_DEV%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CLSK_DEV&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/cancel-subscription/route.js":
/*!**********************************************!*\
  !*** ./app/api/cancel-subscription/route.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stripe */ \"(rsc)/./node_modules/stripe/esm/stripe.esm.node.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_3__);\n// app/api/cancel-subscription/route.js\n\n\n\n\nconst stripe = new stripe__WEBPACK_IMPORTED_MODULE_1__[\"default\"](process.env.STRIPE_SECRET_KEY);\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        const { subscriptionId } = body;\n        if (!subscriptionId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Se requiere el ID de suscripci\\xf3n\"\n            }, {\n                status: 400\n            });\n        }\n        // Cancelar la suscripción en Stripe\n        const subscription = await stripe.subscriptions.update(subscriptionId, {\n            cancel_at_period_end: true\n        });\n        // Actualizar en nuestra base de datos\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n        const db = (mongoose__WEBPACK_IMPORTED_MODULE_3___default().connection).db;\n        await db.collection(\"user_service\").updateOne({\n            subscriptionId: subscriptionId\n        }, {\n            $set: {\n                cancelAtPeriodEnd: true,\n                currentPeriodEnd: new Date(subscription.current_period_end * 1000)\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: \"Suscripci\\xf3n cancelada correctamente\",\n            cancelAtPeriodEnd: subscription.cancel_at_period_end,\n            currentPeriodEnd: new Date(subscription.current_period_end * 1000)\n        });\n    } catch (error) {\n        console.error(\"Error in cancel-subscription:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || \"Error al cancelar la suscripci\\xf3n\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NhbmNlbC1zdWJzY3JpcHRpb24vcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsdUNBQXVDO0FBQ0k7QUFDZjtBQUNVO0FBQ047QUFFaEMsTUFBTUksU0FBUyxJQUFJSCw4Q0FBTUEsQ0FBQ0ksUUFBUUMsR0FBRyxDQUFDQyxpQkFBaUI7QUFFaEQsZUFBZUMsS0FBS0MsT0FBTztJQUNoQyxJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNRCxRQUFRRSxJQUFJO1FBQy9CLE1BQU0sRUFBRUMsY0FBYyxFQUFFLEdBQUdGO1FBRTNCLElBQUksQ0FBQ0UsZ0JBQWdCO1lBQ25CLE9BQU9aLHFEQUFZQSxDQUFDVyxJQUFJLENBQ3RCO2dCQUFFRSxPQUFPO1lBQW1DLEdBQzVDO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxvQ0FBb0M7UUFDcEMsTUFBTUMsZUFBZSxNQUFNWCxPQUFPWSxhQUFhLENBQUNDLE1BQU0sQ0FBQ0wsZ0JBQWdCO1lBQ3JFTSxzQkFBc0I7UUFDeEI7UUFFQSxzQ0FBc0M7UUFDdEMsTUFBTWhCLHdEQUFTQTtRQUNmLE1BQU1pQixLQUFLaEIsNERBQW1CLENBQUNnQixFQUFFO1FBQ2pDLE1BQU1BLEdBQUdFLFVBQVUsQ0FBQyxnQkFBZ0JDLFNBQVMsQ0FDM0M7WUFBRVYsZ0JBQWdCQTtRQUFlLEdBQ2pDO1lBQ0VXLE1BQU07Z0JBQ0pDLG1CQUFtQjtnQkFDbkJDLGtCQUFrQixJQUFJQyxLQUFLWCxhQUFhWSxrQkFBa0IsR0FBRztZQUMvRDtRQUNGO1FBR0YsT0FBTzNCLHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7WUFDdkJpQixTQUFTO1lBQ1RDLFNBQVM7WUFDVEwsbUJBQW1CVCxhQUFhRyxvQkFBb0I7WUFDcERPLGtCQUFrQixJQUFJQyxLQUFLWCxhQUFhWSxrQkFBa0IsR0FBRztRQUMvRDtJQUNGLEVBQUUsT0FBT2QsT0FBTztRQUNkaUIsUUFBUWpCLEtBQUssQ0FBQyxpQ0FBaUNBO1FBQy9DLE9BQU9iLHFEQUFZQSxDQUFDVyxJQUFJLENBQ3RCO1lBQUVFLE9BQU9BLE1BQU1nQixPQUFPLElBQUk7UUFBbUMsR0FDN0Q7WUFBRWYsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95b3VyLXByb2plY3QtbmFtZS8uL2FwcC9hcGkvY2FuY2VsLXN1YnNjcmlwdGlvbi9yb3V0ZS5qcz8yMjdmIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC9hcGkvY2FuY2VsLXN1YnNjcmlwdGlvbi9yb3V0ZS5qc1xyXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcbmltcG9ydCBTdHJpcGUgZnJvbSAnc3RyaXBlJztcclxuaW1wb3J0IGRiQ29ubmVjdCBmcm9tICdAL2xpYi9tb25nb2RiJztcclxuaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuXHJcbmNvbnN0IHN0cmlwZSA9IG5ldyBTdHJpcGUocHJvY2Vzcy5lbnYuU1RSSVBFX1NFQ1JFVF9LRVkpO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcbiAgICBjb25zdCB7IHN1YnNjcmlwdGlvbklkIH0gPSBib2R5O1xyXG5cclxuICAgIGlmICghc3Vic2NyaXB0aW9uSWQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6ICdTZSByZXF1aWVyZSBlbCBJRCBkZSBzdXNjcmlwY2nDs24nIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2FuY2VsYXIgbGEgc3VzY3JpcGNpw7NuIGVuIFN0cmlwZVxyXG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gYXdhaXQgc3RyaXBlLnN1YnNjcmlwdGlvbnMudXBkYXRlKHN1YnNjcmlwdGlvbklkLCB7XHJcbiAgICAgIGNhbmNlbF9hdF9wZXJpb2RfZW5kOiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQWN0dWFsaXphciBlbiBudWVzdHJhIGJhc2UgZGUgZGF0b3NcclxuICAgIGF3YWl0IGRiQ29ubmVjdCgpO1xyXG4gICAgY29uc3QgZGIgPSBtb25nb29zZS5jb25uZWN0aW9uLmRiO1xyXG4gICAgYXdhaXQgZGIuY29sbGVjdGlvbigndXNlcl9zZXJ2aWNlJykudXBkYXRlT25lKFxyXG4gICAgICB7IHN1YnNjcmlwdGlvbklkOiBzdWJzY3JpcHRpb25JZCB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgJHNldDoge1xyXG4gICAgICAgICAgY2FuY2VsQXRQZXJpb2RFbmQ6IHRydWUsXHJcbiAgICAgICAgICBjdXJyZW50UGVyaW9kRW5kOiBuZXcgRGF0ZShzdWJzY3JpcHRpb24uY3VycmVudF9wZXJpb2RfZW5kICogMTAwMClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgbWVzc2FnZTogJ1N1c2NyaXBjacOzbiBjYW5jZWxhZGEgY29ycmVjdGFtZW50ZScsXHJcbiAgICAgIGNhbmNlbEF0UGVyaW9kRW5kOiBzdWJzY3JpcHRpb24uY2FuY2VsX2F0X3BlcmlvZF9lbmQsXHJcbiAgICAgIGN1cnJlbnRQZXJpb2RFbmQ6IG5ldyBEYXRlKHN1YnNjcmlwdGlvbi5jdXJyZW50X3BlcmlvZF9lbmQgKiAxMDAwKVxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluIGNhbmNlbC1zdWJzY3JpcHRpb246JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdFcnJvciBhbCBjYW5jZWxhciBsYSBzdXNjcmlwY2nDs24nIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiU3RyaXBlIiwiZGJDb25uZWN0IiwibW9uZ29vc2UiLCJzdHJpcGUiLCJwcm9jZXNzIiwiZW52IiwiU1RSSVBFX1NFQ1JFVF9LRVkiLCJQT1NUIiwicmVxdWVzdCIsImJvZHkiLCJqc29uIiwic3Vic2NyaXB0aW9uSWQiLCJlcnJvciIsInN0YXR1cyIsInN1YnNjcmlwdGlvbiIsInN1YnNjcmlwdGlvbnMiLCJ1cGRhdGUiLCJjYW5jZWxfYXRfcGVyaW9kX2VuZCIsImRiIiwiY29ubmVjdGlvbiIsImNvbGxlY3Rpb24iLCJ1cGRhdGVPbmUiLCIkc2V0IiwiY2FuY2VsQXRQZXJpb2RFbmQiLCJjdXJyZW50UGVyaW9kRW5kIiwiRGF0ZSIsImN1cnJlbnRfcGVyaW9kX2VuZCIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/cancel-subscription/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.js":
/*!************************!*\
  !*** ./lib/mongodb.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// /lib/mongodb.js\n\nif (!process.env.MONGODB_URI) {\n    throw new Error(\"Please add your MONGODB_URI to .env.local\");\n}\nconst MONGODB_URI = process.env.MONGODB_URI;\n/**\r\n * Global es usado aquí para mantener la conexión\r\n * durante hot reloads en desarrollo\r\n */ let cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            return mongoose;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrQkFBa0I7QUFDYztBQUVoQyxJQUFJLENBQUNDLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVyxFQUFFO0lBQzVCLE1BQU0sSUFBSUMsTUFBTTtBQUNsQjtBQUVBLE1BQU1ELGNBQWNGLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVztBQUUzQzs7O0NBR0MsR0FDRCxJQUFJRSxTQUFTQyxPQUFPTixRQUFRO0FBRTVCLElBQUksQ0FBQ0ssUUFBUTtJQUNYQSxTQUFTQyxPQUFPTixRQUFRLEdBQUc7UUFBRU8sTUFBTTtRQUFNQyxTQUFTO0lBQUs7QUFDekQ7QUFFQSxlQUFlQztJQUNiLElBQUlKLE9BQU9FLElBQUksRUFBRTtRQUNmLE9BQU9GLE9BQU9FLElBQUk7SUFDcEI7SUFFQSxJQUFJLENBQUNGLE9BQU9HLE9BQU8sRUFBRTtRQUNuQixNQUFNRSxPQUFPO1lBQ1hDLGdCQUFnQjtRQUNsQjtRQUVBTixPQUFPRyxPQUFPLEdBQUdSLHVEQUFnQixDQUFDRyxhQUFhTyxNQUFNRyxJQUFJLENBQUMsQ0FBQ2I7WUFDekQsT0FBT0E7UUFDVDtJQUNGO0lBRUEsSUFBSTtRQUNGSyxPQUFPRSxJQUFJLEdBQUcsTUFBTUYsT0FBT0csT0FBTztJQUNwQyxFQUFFLE9BQU9NLEdBQUc7UUFDVlQsT0FBT0csT0FBTyxHQUFHO1FBQ2pCLE1BQU1NO0lBQ1I7SUFFQSxPQUFPVCxPQUFPRSxJQUFJO0FBQ3BCO0FBRUEsaUVBQWVFLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95b3VyLXByb2plY3QtbmFtZS8uL2xpYi9tb25nb2RiLmpzP2Q5MjAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gL2xpYi9tb25nb2RiLmpzXHJcbmltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcblxyXG5pZiAoIXByb2Nlc3MuZW52Lk1PTkdPREJfVVJJKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgYWRkIHlvdXIgTU9OR09EQl9VUkkgdG8gLmVudi5sb2NhbCcpO1xyXG59XHJcblxyXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xyXG5cclxuLyoqXHJcbiAqIEdsb2JhbCBlcyB1c2FkbyBhcXXDrSBwYXJhIG1hbnRlbmVyIGxhIGNvbmV4acOzblxyXG4gKiBkdXJhbnRlIGhvdCByZWxvYWRzIGVuIGRlc2Fycm9sbG9cclxuICovXHJcbmxldCBjYWNoZWQgPSBnbG9iYWwubW9uZ29vc2U7XHJcblxyXG5pZiAoIWNhY2hlZCkge1xyXG4gIGNhY2hlZCA9IGdsb2JhbC5tb25nb29zZSA9IHsgY29ubjogbnVsbCwgcHJvbWlzZTogbnVsbCB9O1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkYkNvbm5lY3QoKSB7XHJcbiAgaWYgKGNhY2hlZC5jb25uKSB7XHJcbiAgICByZXR1cm4gY2FjaGVkLmNvbm47XHJcbiAgfVxyXG5cclxuICBpZiAoIWNhY2hlZC5wcm9taXNlKSB7XHJcbiAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICBidWZmZXJDb21tYW5kczogZmFsc2UsXHJcbiAgICB9O1xyXG5cclxuICAgIGNhY2hlZC5wcm9taXNlID0gbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSwgb3B0cykudGhlbigobW9uZ29vc2UpID0+IHtcclxuICAgICAgcmV0dXJuIG1vbmdvb3NlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgY2FjaGVkLmNvbm4gPSBhd2FpdCBjYWNoZWQucHJvbWlzZTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjYWNoZWQucHJvbWlzZSA9IG51bGw7XHJcbiAgICB0aHJvdyBlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNhY2hlZC5jb25uO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkYkNvbm5lY3Q7Il0sIm5hbWVzIjpbIm1vbmdvb3NlIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiRXJyb3IiLCJjYWNoZWQiLCJnbG9iYWwiLCJjb25uIiwicHJvbWlzZSIsImRiQ29ubmVjdCIsIm9wdHMiLCJidWZmZXJDb21tYW5kcyIsImNvbm5lY3QiLCJ0aGVuIiwiZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/stripe","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/qs","vendor-chunks/call-bind-apply-helpers","vendor-chunks/get-proto","vendor-chunks/object-inspect","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/side-channel","vendor-chunks/side-channel-weakmap","vendor-chunks/side-channel-map","vendor-chunks/side-channel-list","vendor-chunks/hasown","vendor-chunks/get-intrinsic","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/dunder-proto","vendor-chunks/call-bound"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcancel-subscription%2Froute&page=%2Fapi%2Fcancel-subscription%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcancel-subscription%2Froute.js&appDir=C%3A%5CLSK_DEV%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CLSK_DEV&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();