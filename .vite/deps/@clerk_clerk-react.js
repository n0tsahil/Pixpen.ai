import {
  dequal
} from "./chunk-W2HZVVEF.js";
import {
  require_react_dom
} from "./chunk-5HNGYYSW.js";
import {
  require_react
} from "./chunk-TVFQMRVC.js";
import {
  __commonJS,
  __export,
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
    "use strict";
    (function() {
      function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      function useSyncExternalStore$2(subscribe, getSnapshot) {
        didWarnOld18Alpha || void 0 === React15.startTransition || (didWarnOld18Alpha = true, console.error(
          "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
        ));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
          var cachedValue = getSnapshot();
          objectIs(value, cachedValue) || (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ), didWarnUncachedGetSnapshot = true);
        }
        cachedValue = useState5({
          inst: { value, getSnapshot }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect2(
          function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          },
          [subscribe, value, getSnapshot]
        );
        useEffect5(
          function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            return subscribe(function() {
              checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            });
          },
          [subscribe]
        );
        useDebugValue2(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function useSyncExternalStore$1(subscribe, getSnapshot) {
        return getSnapshot();
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React15 = require_react(), objectIs = "function" === typeof Object.is ? Object.is : is, useState5 = React15.useState, useEffect5 = React15.useEffect, useLayoutEffect2 = React15.useLayoutEffect, useDebugValue2 = React15.useDebugValue, didWarnOld18Alpha = false, didWarnUncachedGetSnapshot = false, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
      exports.useSyncExternalStore = void 0 !== React15.useSyncExternalStore ? React15.useSyncExternalStore : shim;
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// node_modules/@clerk/shared/dist/chunk-6NCNJZHF.mjs
function isClerkAPIResponseError(err) {
  return "clerkError" in err;
}
var ClerkRuntimeError = class _ClerkRuntimeError extends Error {
  constructor(message, { code }) {
    const prefix = "🔒 Clerk:";
    const regex = new RegExp(prefix.replace(" ", "\\s*"), "i");
    const sanitized = message.replace(regex, "");
    const _message = `${prefix} ${sanitized.trim()}

(code="${code}")
`;
    super(_message);
    this.toString = () => {
      return `[${this.name}]
Message:${this.message}`;
    };
    Object.setPrototypeOf(this, _ClerkRuntimeError.prototype);
    this.code = code;
    this.message = _message;
    this.clerkRuntimeError = true;
    this.name = "ClerkRuntimeError";
  }
};
var DefaultMessages = Object.freeze({
  InvalidProxyUrlErrorMessage: `The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})`,
  InvalidPublishableKeyErrorMessage: `The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})`,
  MissingPublishableKeyErrorMessage: `Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.`,
  MissingSecretKeyErrorMessage: `Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.`,
  MissingClerkProvider: `{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider`
});
function buildErrorThrower({ packageName, customMessages }) {
  let pkg = packageName;
  const messages = {
    ...DefaultMessages,
    ...customMessages
  };
  function buildMessage(rawMessage, replacements) {
    if (!replacements) {
      return `${pkg}: ${rawMessage}`;
    }
    let msg = rawMessage;
    const matches = rawMessage.matchAll(/{{([a-zA-Z0-9-_]+)}}/g);
    for (const match of matches) {
      const replacement = (replacements[match[1]] || "").toString();
      msg = msg.replace(`{{${match[1]}}}`, replacement);
    }
    return `${pkg}: ${msg}`;
  }
  return {
    setPackageName({ packageName: packageName2 }) {
      if (typeof packageName2 === "string") {
        pkg = packageName2;
      }
      return this;
    },
    setMessages({ customMessages: customMessages2 }) {
      Object.assign(messages, customMessages2 || {});
      return this;
    },
    throwInvalidPublishableKeyError(params) {
      throw new Error(buildMessage(messages.InvalidPublishableKeyErrorMessage, params));
    },
    throwInvalidProxyUrl(params) {
      throw new Error(buildMessage(messages.InvalidProxyUrlErrorMessage, params));
    },
    throwMissingPublishableKeyError() {
      throw new Error(buildMessage(messages.MissingPublishableKeyErrorMessage));
    },
    throwMissingSecretKeyError() {
      throw new Error(buildMessage(messages.MissingSecretKeyErrorMessage));
    },
    throwMissingClerkProviderError(params) {
      throw new Error(buildMessage(messages.MissingClerkProvider, params));
    },
    throw(message) {
      throw new Error(buildMessage(message));
    }
  };
}

// node_modules/@clerk/shared/dist/chunk-7ELT755Q.mjs
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __export2 = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// node_modules/@clerk/shared/dist/chunk-3CN5LOSN.mjs
var TYPES_TO_OBJECTS = {
  strict_mfa: {
    afterMinutes: 10,
    level: "multi_factor"
  },
  strict: {
    afterMinutes: 10,
    level: "second_factor"
  },
  moderate: {
    afterMinutes: 60,
    level: "second_factor"
  },
  lax: {
    afterMinutes: 1440,
    level: "second_factor"
  }
};
var ALLOWED_LEVELS = /* @__PURE__ */ new Set(["first_factor", "second_factor", "multi_factor"]);
var ALLOWED_TYPES = /* @__PURE__ */ new Set(["strict_mfa", "strict", "moderate", "lax"]);
var isValidMaxAge = (maxAge) => typeof maxAge === "number" && maxAge > 0;
var isValidLevel = (level) => ALLOWED_LEVELS.has(level);
var isValidVerificationType = (type) => ALLOWED_TYPES.has(type);
var prefixWithOrg = (value) => value.replace(/^(org:)*/, "org:");
var checkOrgAuthorization = (params, options) => {
  const { orgId, orgRole, orgPermissions } = options;
  if (!params.role && !params.permission) {
    return null;
  }
  if (!orgId || !orgRole || !orgPermissions) {
    return null;
  }
  if (params.permission) {
    return orgPermissions.includes(prefixWithOrg(params.permission));
  }
  if (params.role) {
    return prefixWithOrg(orgRole) === prefixWithOrg(params.role);
  }
  return null;
};
var checkForFeatureOrPlan = (claim, featureOrPlan) => {
  const { org: orgFeatures, user: userFeatures } = splitByScope(claim);
  const [scope, _id] = featureOrPlan.split(":");
  const id = _id || scope;
  if (scope === "org") {
    return orgFeatures.includes(id);
  } else if (scope === "user") {
    return userFeatures.includes(id);
  } else {
    return [...orgFeatures, ...userFeatures].includes(id);
  }
};
var checkBillingAuthorization = (params, options) => {
  const { features, plans } = options;
  if (params.feature && features) {
    return checkForFeatureOrPlan(features, params.feature);
  }
  if (params.plan && plans) {
    return checkForFeatureOrPlan(plans, params.plan);
  }
  return null;
};
var splitByScope = (fea) => {
  const features = fea ? fea.split(",").map((f) => f.trim()) : [];
  return {
    org: features.filter((f) => f.split(":")[0].includes("o")).map((f) => f.split(":")[1]),
    user: features.filter((f) => f.split(":")[0].includes("u")).map((f) => f.split(":")[1])
  };
};
var validateReverificationConfig = (config) => {
  if (!config) {
    return false;
  }
  const convertConfigToObject = (config2) => {
    if (typeof config2 === "string") {
      return TYPES_TO_OBJECTS[config2];
    }
    return config2;
  };
  const isValidStringValue = typeof config === "string" && isValidVerificationType(config);
  const isValidObjectValue = typeof config === "object" && isValidLevel(config.level) && isValidMaxAge(config.afterMinutes);
  if (isValidStringValue || isValidObjectValue) {
    return convertConfigToObject.bind(null, config);
  }
  return false;
};
var checkReverificationAuthorization = (params, { factorVerificationAge }) => {
  if (!params.reverification || !factorVerificationAge) {
    return null;
  }
  const isValidReverification = validateReverificationConfig(params.reverification);
  if (!isValidReverification) {
    return null;
  }
  const { level, afterMinutes } = isValidReverification();
  const [factor1Age, factor2Age] = factorVerificationAge;
  const isValidFactor1 = factor1Age !== -1 ? afterMinutes > factor1Age : null;
  const isValidFactor2 = factor2Age !== -1 ? afterMinutes > factor2Age : null;
  switch (level) {
    case "first_factor":
      return isValidFactor1;
    case "second_factor":
      return factor2Age !== -1 ? isValidFactor2 : isValidFactor1;
    case "multi_factor":
      return factor2Age === -1 ? isValidFactor1 : isValidFactor1 && isValidFactor2;
  }
};
var createCheckAuthorization = (options) => {
  return (params) => {
    if (!options.userId) {
      return false;
    }
    const billingAuthorization = checkBillingAuthorization(params, options);
    const orgAuthorization = checkOrgAuthorization(params, options);
    const reverificationAuthorization = checkReverificationAuthorization(params, options);
    if ([billingAuthorization || orgAuthorization, reverificationAuthorization].some((a) => a === null)) {
      return [billingAuthorization || orgAuthorization, reverificationAuthorization].some((a) => a === true);
    }
    return [billingAuthorization || orgAuthorization, reverificationAuthorization].every((a) => a === true);
  };
};
var resolveAuthState = ({
  authObject: {
    sessionId,
    sessionStatus,
    userId,
    actor,
    orgId,
    orgRole,
    orgSlug,
    signOut,
    getToken,
    has: has2,
    sessionClaims
  },
  options: { treatPendingAsSignedOut = true }
}) => {
  if (sessionId === void 0 && userId === void 0) {
    return {
      isLoaded: false,
      isSignedIn: void 0,
      sessionId,
      sessionClaims: void 0,
      userId,
      actor: void 0,
      orgId: void 0,
      orgRole: void 0,
      orgSlug: void 0,
      has: void 0,
      signOut,
      getToken
    };
  }
  if (sessionId === null && userId === null) {
    return {
      isLoaded: true,
      isSignedIn: false,
      sessionId,
      userId,
      sessionClaims: null,
      actor: null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      has: () => false,
      signOut,
      getToken
    };
  }
  if (treatPendingAsSignedOut && sessionStatus === "pending") {
    return {
      isLoaded: true,
      isSignedIn: false,
      sessionId: null,
      userId: null,
      sessionClaims: null,
      actor: null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      has: () => false,
      signOut,
      getToken
    };
  }
  if (!!sessionId && !!sessionClaims && !!userId && !!orgId && !!orgRole) {
    return {
      isLoaded: true,
      isSignedIn: true,
      sessionId,
      sessionClaims,
      userId,
      actor: actor || null,
      orgId,
      orgRole,
      orgSlug: orgSlug || null,
      has: has2,
      signOut,
      getToken
    };
  }
  if (!!sessionId && !!sessionClaims && !!userId && !orgId) {
    return {
      isLoaded: true,
      isSignedIn: true,
      sessionId,
      sessionClaims,
      userId,
      actor: actor || null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      has: has2,
      signOut,
      getToken
    };
  }
};

// node_modules/@clerk/shared/dist/chunk-GGFRMWFO.mjs
function snakeToCamel(str) {
  return str ? str.replace(/([-_][a-z])/g, (match) => match.toUpperCase().replace(/-|_/, "")) : "";
}
function camelToSnake(str) {
  return str ? str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`) : "";
}
var createDeepObjectTransformer = (transform) => {
  const deepTransform = (obj) => {
    if (!obj) {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map((el) => {
        if (typeof el === "object" || Array.isArray(el)) {
          return deepTransform(el);
        }
        return el;
      });
    }
    const copy = { ...obj };
    const keys = Object.keys(copy);
    for (const oldName of keys) {
      const newName = transform(oldName.toString());
      if (newName !== oldName) {
        copy[newName] = copy[oldName];
        delete copy[oldName];
      }
      if (typeof copy[newName] === "object") {
        copy[newName] = deepTransform(copy[newName]);
      }
    }
    return copy;
  };
  return deepTransform;
};
var deepCamelToSnake = createDeepObjectTransformer(camelToSnake);
var deepSnakeToCamel = createDeepObjectTransformer(snakeToCamel);

// node_modules/@clerk/shared/dist/chunk-TETGTEI2.mjs
var isomorphicAtob = (data) => {
  if (typeof atob !== "undefined" && typeof atob === "function") {
    return atob(data);
  } else if (typeof global !== "undefined" && global.Buffer) {
    return new global.Buffer(data, "base64").toString();
  }
  return data;
};

// node_modules/@clerk/shared/dist/chunk-I6MTSTOF.mjs
var DEV_OR_STAGING_SUFFIXES = [
  ".lcl.dev",
  ".stg.dev",
  ".lclstage.dev",
  ".stgstage.dev",
  ".dev.lclclerk.com",
  ".stg.lclclerk.com",
  ".accounts.lclclerk.com",
  "accountsstage.dev",
  "accounts.dev"
];

// node_modules/@clerk/shared/dist/chunk-IV7BOO4U.mjs
var PUBLISHABLE_KEY_LIVE_PREFIX = "pk_live_";
var PUBLISHABLE_KEY_TEST_PREFIX = "pk_test_";
function isValidDecodedPublishableKey(decoded) {
  if (!decoded.endsWith("$")) {
    return false;
  }
  const withoutTrailing = decoded.slice(0, -1);
  if (withoutTrailing.includes("$")) {
    return false;
  }
  return withoutTrailing.includes(".");
}
function parsePublishableKey(key, options = {}) {
  key = key || "";
  if (!key || !isPublishableKey(key)) {
    if (options.fatal && !key) {
      throw new Error(
        "Publishable key is missing. Ensure that your publishable key is correctly configured. Double-check your environment configuration for your keys, or access them here: https://dashboard.clerk.com/last-active?path=api-keys"
      );
    }
    if (options.fatal && !isPublishableKey(key)) {
      throw new Error("Publishable key not valid.");
    }
    return null;
  }
  const instanceType = key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) ? "production" : "development";
  let decodedFrontendApi;
  try {
    decodedFrontendApi = isomorphicAtob(key.split("_")[2]);
  } catch {
    if (options.fatal) {
      throw new Error("Publishable key not valid: Failed to decode key.");
    }
    return null;
  }
  if (!isValidDecodedPublishableKey(decodedFrontendApi)) {
    if (options.fatal) {
      throw new Error("Publishable key not valid: Decoded key has invalid format.");
    }
    return null;
  }
  let frontendApi = decodedFrontendApi.slice(0, -1);
  if (options.proxyUrl) {
    frontendApi = options.proxyUrl;
  } else if (instanceType !== "development" && options.domain && options.isSatellite) {
    frontendApi = `clerk.${options.domain}`;
  }
  return {
    instanceType,
    frontendApi
  };
}
function isPublishableKey(key = "") {
  try {
    const hasValidPrefix = key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) || key.startsWith(PUBLISHABLE_KEY_TEST_PREFIX);
    if (!hasValidPrefix) {
      return false;
    }
    const parts = key.split("_");
    if (parts.length !== 3) {
      return false;
    }
    const encodedPart = parts[2];
    if (!encodedPart) {
      return false;
    }
    const decoded = isomorphicAtob(encodedPart);
    return isValidDecodedPublishableKey(decoded);
  } catch {
    return false;
  }
}
function createDevOrStagingUrlCache() {
  const devOrStagingUrlCache = /* @__PURE__ */ new Map();
  return {
    /**
     * Checks if a URL is a development or staging environment.
     *
     * @param url - The URL to check (string or URL object).
     * @returns `true` if the URL is a development or staging environment, `false` otherwise.
     */
    isDevOrStagingUrl: (url) => {
      if (!url) {
        return false;
      }
      const hostname = typeof url === "string" ? url : url.hostname;
      let res = devOrStagingUrlCache.get(hostname);
      if (res === void 0) {
        res = DEV_OR_STAGING_SUFFIXES.some((s) => hostname.endsWith(s));
        devOrStagingUrlCache.set(hostname, res);
      }
      return res;
    }
  };
}

// node_modules/@clerk/shared/dist/chunk-YXR7ZZRP.mjs
var _storageKey;
var _cacheTtl;
var _TelemetryEventThrottler_instances;
var generateKey_fn;
var cache_get;
var isValidBrowser_get;
_storageKey = /* @__PURE__ */ new WeakMap();
_cacheTtl = /* @__PURE__ */ new WeakMap();
_TelemetryEventThrottler_instances = /* @__PURE__ */ new WeakSet();
generateKey_fn = function(event) {
  const { sk: _sk, pk: _pk, payload, ...rest } = event;
  const sanitizedEvent = {
    ...payload,
    ...rest
  };
  return JSON.stringify(
    Object.keys({
      ...payload,
      ...rest
    }).sort().map((key) => sanitizedEvent[key])
  );
};
cache_get = function() {
  const cacheString = localStorage.getItem(__privateGet(this, _storageKey));
  if (!cacheString) {
    return {};
  }
  return JSON.parse(cacheString);
};
isValidBrowser_get = function() {
  if (typeof window === "undefined") {
    return false;
  }
  const storage = window.localStorage;
  if (!storage) {
    return false;
  }
  try {
    const testKey = "test";
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch (err) {
    const isQuotaExceededError = err instanceof DOMException && // Check error names for different browsers
    (err.name === "QuotaExceededError" || err.name === "NS_ERROR_DOM_QUOTA_REACHED");
    if (isQuotaExceededError && storage.length > 0) {
      storage.removeItem(__privateGet(this, _storageKey));
    }
    return false;
  }
};
var _config;
var _eventThrottler;
var _metadata;
var _buffer;
var _pendingFlush;
var _TelemetryCollector_instances;
var shouldRecord_fn;
var shouldBeSampled_fn;
var scheduleFlush_fn;
var flush_fn;
var logEvent_fn;
var getSDKMetadata_fn;
var preparePayload_fn;
_config = /* @__PURE__ */ new WeakMap();
_eventThrottler = /* @__PURE__ */ new WeakMap();
_metadata = /* @__PURE__ */ new WeakMap();
_buffer = /* @__PURE__ */ new WeakMap();
_pendingFlush = /* @__PURE__ */ new WeakMap();
_TelemetryCollector_instances = /* @__PURE__ */ new WeakSet();
shouldRecord_fn = function(preparedPayload, eventSamplingRate) {
  return this.isEnabled && !this.isDebug && __privateMethod(this, _TelemetryCollector_instances, shouldBeSampled_fn).call(this, preparedPayload, eventSamplingRate);
};
shouldBeSampled_fn = function(preparedPayload, eventSamplingRate) {
  const randomSeed = Math.random();
  const toBeSampled = randomSeed <= __privateGet(this, _config).samplingRate && (typeof eventSamplingRate === "undefined" || randomSeed <= eventSamplingRate);
  if (!toBeSampled) {
    return false;
  }
  return !__privateGet(this, _eventThrottler).isEventThrottled(preparedPayload);
};
scheduleFlush_fn = function() {
  if (typeof window === "undefined") {
    __privateMethod(this, _TelemetryCollector_instances, flush_fn).call(this);
    return;
  }
  const isBufferFull = __privateGet(this, _buffer).length >= __privateGet(this, _config).maxBufferSize;
  if (isBufferFull) {
    if (__privateGet(this, _pendingFlush)) {
      const cancel = typeof cancelIdleCallback !== "undefined" ? cancelIdleCallback : clearTimeout;
      cancel(__privateGet(this, _pendingFlush));
    }
    __privateMethod(this, _TelemetryCollector_instances, flush_fn).call(this);
    return;
  }
  if (__privateGet(this, _pendingFlush)) {
    return;
  }
  if ("requestIdleCallback" in window) {
    __privateSet(this, _pendingFlush, requestIdleCallback(() => {
      __privateMethod(this, _TelemetryCollector_instances, flush_fn).call(this);
    }));
  } else {
    __privateSet(this, _pendingFlush, setTimeout(() => {
      __privateMethod(this, _TelemetryCollector_instances, flush_fn).call(this);
    }, 0));
  }
};
flush_fn = function() {
  fetch(new URL("/v1/event", __privateGet(this, _config).endpoint), {
    method: "POST",
    // TODO: We send an array here with that idea that we can eventually send multiple events.
    body: JSON.stringify({
      events: __privateGet(this, _buffer)
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).catch(() => void 0).then(() => {
    __privateSet(this, _buffer, []);
  }).catch(() => void 0);
};
logEvent_fn = function(event, payload) {
  if (!this.isDebug) {
    return;
  }
  if (typeof console.groupCollapsed !== "undefined") {
    console.groupCollapsed("[clerk/telemetry]", event);
    console.log(payload);
    console.groupEnd();
  } else {
    console.log("[clerk/telemetry]", event, payload);
  }
};
getSDKMetadata_fn = function() {
  let sdkMetadata = {
    name: __privateGet(this, _metadata).sdk,
    version: __privateGet(this, _metadata).sdkVersion
  };
  if (typeof window !== "undefined" && window.Clerk) {
    sdkMetadata = { ...sdkMetadata, ...window.Clerk.constructor.sdkMetadata };
  }
  return sdkMetadata;
};
preparePayload_fn = function(event, payload) {
  const sdkMetadata = __privateMethod(this, _TelemetryCollector_instances, getSDKMetadata_fn).call(this);
  return {
    event,
    cv: __privateGet(this, _metadata).clerkVersion ?? "",
    it: __privateGet(this, _metadata).instanceType ?? "",
    sdk: sdkMetadata.name,
    sdkv: sdkMetadata.version,
    ...__privateGet(this, _metadata).publishableKey ? { pk: __privateGet(this, _metadata).publishableKey } : {},
    ...__privateGet(this, _metadata).secretKey ? { sk: __privateGet(this, _metadata).secretKey } : {},
    payload
  };
};
var EVENT_METHOD_CALLED = "METHOD_CALLED";
function eventMethodCalled(method, payload) {
  return {
    event: EVENT_METHOD_CALLED,
    payload: {
      method,
      ...payload
    }
  };
}

// node_modules/@clerk/clerk-react/dist/chunk-NM4PUPXM.mjs
var import_react16 = __toESM(require_react(), 1);

// node_modules/@clerk/shared/dist/chunk-IBXKDGSZ.mjs
function getCurrentOrganizationMembership(organizationMemberships, organizationId) {
  return organizationMemberships.find(
    (organizationMembership) => organizationMembership.organization.id === organizationId
  );
}

// node_modules/@clerk/shared/dist/chunk-7FNX7RWY.mjs
var noop = (..._args) => {
};

// node_modules/@clerk/shared/dist/chunk-7QJ2QTJL.mjs
var createDeferredPromise = () => {
  let resolve = noop;
  let reject = noop;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

// node_modules/@clerk/shared/dist/chunk-43A5F2IE.mjs
var REVERIFICATION_REASON = "reverification-error";
var reverificationError = (missingConfig) => ({
  clerk_error: {
    type: "forbidden",
    reason: REVERIFICATION_REASON,
    metadata: {
      reverification: missingConfig
    }
  }
});
var isReverificationHint = (result) => {
  return result && typeof result === "object" && "clerk_error" in result && result.clerk_error?.type === "forbidden" && result.clerk_error?.reason === REVERIFICATION_REASON;
};

// node_modules/@clerk/shared/dist/react/index.mjs
var import_react6 = __toESM(require_react(), 1);
var import_react7 = __toESM(require_react(), 1);

// node_modules/swr/dist/index/index.mjs
var index_exports = {};
__export(index_exports, {
  SWRConfig: () => SWRConfig2,
  default: () => useSWR,
  mutate: () => mutate,
  preload: () => preload,
  unstable_serialize: () => unstable_serialize,
  useSWRConfig: () => useSWRConfig
});
var import_react3 = __toESM(require_react(), 1);
var import_shim = __toESM(require_shim(), 1);

// node_modules/swr/dist/_internal/config-context-client-BoS53ST9.mjs
var import_react = __toESM(require_react(), 1);

// node_modules/swr/dist/_internal/events.mjs
var events_exports = {};
__export(events_exports, {
  ERROR_REVALIDATE_EVENT: () => ERROR_REVALIDATE_EVENT,
  FOCUS_EVENT: () => FOCUS_EVENT,
  MUTATE_EVENT: () => MUTATE_EVENT,
  RECONNECT_EVENT: () => RECONNECT_EVENT
});
var FOCUS_EVENT = 0;
var RECONNECT_EVENT = 1;
var MUTATE_EVENT = 2;
var ERROR_REVALIDATE_EVENT = 3;

// node_modules/dequal/lite/index.mjs
var has = Object.prototype.hasOwnProperty;
function dequal2(foo, bar) {
  var ctor, len;
  if (foo === bar) return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && dequal2(foo[len], bar[len])) ;
      }
      return len === -1;
    }
    if (!ctor || typeof foo === "object") {
      len = 0;
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
        if (!(ctor in bar) || !dequal2(foo[ctor], bar[ctor])) return false;
      }
      return Object.keys(bar).length === len;
    }
  }
  return foo !== foo && bar !== bar;
}

// node_modules/swr/dist/_internal/config-context-client-BoS53ST9.mjs
var SWRGlobalState = /* @__PURE__ */ new WeakMap();
var noop2 = () => {
};
var UNDEFINED = (
  /*#__NOINLINE__*/
  noop2()
);
var OBJECT = Object;
var isUndefined = (v) => v === UNDEFINED;
var isFunction = (v) => typeof v == "function";
var mergeObjects = (a, b) => ({
  ...a,
  ...b
});
var isPromiseLike = (x) => isFunction(x.then);
var EMPTY_CACHE = {};
var INITIAL_CACHE = {};
var STR_UNDEFINED = "undefined";
var isWindowDefined = typeof window != STR_UNDEFINED;
var isDocumentDefined = typeof document != STR_UNDEFINED;
var isLegacyDeno = isWindowDefined && "Deno" in window;
var hasRequestAnimationFrame = () => isWindowDefined && typeof window["requestAnimationFrame"] != STR_UNDEFINED;
var createCacheHelper = (cache2, key) => {
  const state = SWRGlobalState.get(cache2);
  return [
    // Getter
    () => !isUndefined(key) && cache2.get(key) || EMPTY_CACHE,
    // Setter
    (info) => {
      if (!isUndefined(key)) {
        const prev = cache2.get(key);
        if (!(key in INITIAL_CACHE)) {
          INITIAL_CACHE[key] = prev;
        }
        state[5](key, mergeObjects(prev, info), prev || EMPTY_CACHE);
      }
    },
    // Subscriber
    state[6],
    // Get server cache snapshot
    () => {
      if (!isUndefined(key)) {
        if (key in INITIAL_CACHE) return INITIAL_CACHE[key];
      }
      return !isUndefined(key) && cache2.get(key) || EMPTY_CACHE;
    }
  ];
};
var online = true;
var isOnline = () => online;
var [onWindowEvent, offWindowEvent] = isWindowDefined && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  noop2,
  noop2
];
var isVisible = () => {
  const visibilityState = isDocumentDefined && document.visibilityState;
  return isUndefined(visibilityState) || visibilityState !== "hidden";
};
var initFocus = (callback) => {
  if (isDocumentDefined) {
    document.addEventListener("visibilitychange", callback);
  }
  onWindowEvent("focus", callback);
  return () => {
    if (isDocumentDefined) {
      document.removeEventListener("visibilitychange", callback);
    }
    offWindowEvent("focus", callback);
  };
};
var initReconnect = (callback) => {
  const onOnline = () => {
    online = true;
    callback();
  };
  const onOffline = () => {
    online = false;
  };
  onWindowEvent("online", onOnline);
  onWindowEvent("offline", onOffline);
  return () => {
    offWindowEvent("online", onOnline);
    offWindowEvent("offline", onOffline);
  };
};
var preset = {
  isOnline,
  isVisible
};
var defaultConfigOptions = {
  initFocus,
  initReconnect
};
var IS_REACT_LEGACY = !import_react.default.useId;
var IS_SERVER = !isWindowDefined || isLegacyDeno;
var rAF = (f) => hasRequestAnimationFrame() ? window["requestAnimationFrame"](f) : setTimeout(f, 1);
var useIsomorphicLayoutEffect = IS_SERVER ? import_react.useEffect : import_react.useLayoutEffect;
var navigatorConnection = typeof navigator !== "undefined" && navigator.connection;
var slowConnection = !IS_SERVER && navigatorConnection && ([
  "slow-2g",
  "2g"
].includes(navigatorConnection.effectiveType) || navigatorConnection.saveData);
var table = /* @__PURE__ */ new WeakMap();
var getTypeName = (value) => OBJECT.prototype.toString.call(value);
var isObjectTypeName = (typeName, type) => typeName === `[object ${type}]`;
var counter = 0;
var stableHash = (arg) => {
  const type = typeof arg;
  const typeName = getTypeName(arg);
  const isDate = isObjectTypeName(typeName, "Date");
  const isRegex = isObjectTypeName(typeName, "RegExp");
  const isPlainObject = isObjectTypeName(typeName, "Object");
  let result;
  let index;
  if (OBJECT(arg) === arg && !isDate && !isRegex) {
    result = table.get(arg);
    if (result) return result;
    result = ++counter + "~";
    table.set(arg, result);
    if (Array.isArray(arg)) {
      result = "@";
      for (index = 0; index < arg.length; index++) {
        result += stableHash(arg[index]) + ",";
      }
      table.set(arg, result);
    }
    if (isPlainObject) {
      result = "#";
      const keys = OBJECT.keys(arg).sort();
      while (!isUndefined(index = keys.pop())) {
        if (!isUndefined(arg[index])) {
          result += index + ":" + stableHash(arg[index]) + ",";
        }
      }
      table.set(arg, result);
    }
  } else {
    result = isDate ? arg.toJSON() : type == "symbol" ? arg.toString() : type == "string" ? JSON.stringify(arg) : "" + arg;
  }
  return result;
};
var serialize = (key) => {
  if (isFunction(key)) {
    try {
      key = key();
    } catch (err) {
      key = "";
    }
  }
  const args = key;
  key = typeof key == "string" ? key : (Array.isArray(key) ? key.length : key) ? stableHash(key) : "";
  return [
    key,
    args
  ];
};
var __timestamp = 0;
var getTimestamp = () => ++__timestamp;
async function internalMutate(...args) {
  const [cache2, _key, _data, _opts] = args;
  const options = mergeObjects({
    populateCache: true,
    throwOnError: true
  }, typeof _opts === "boolean" ? {
    revalidate: _opts
  } : _opts || {});
  let populateCache = options.populateCache;
  const rollbackOnErrorOption = options.rollbackOnError;
  let optimisticData = options.optimisticData;
  const rollbackOnError = (error) => {
    return typeof rollbackOnErrorOption === "function" ? rollbackOnErrorOption(error) : rollbackOnErrorOption !== false;
  };
  const throwOnError = options.throwOnError;
  if (isFunction(_key)) {
    const keyFilter = _key;
    const matchedKeys = [];
    const it = cache2.keys();
    for (const key of it) {
      if (
        // Skip the special useSWRInfinite and useSWRSubscription keys.
        !/^\$(inf|sub)\$/.test(key) && keyFilter(cache2.get(key)._k)
      ) {
        matchedKeys.push(key);
      }
    }
    return Promise.all(matchedKeys.map(mutateByKey));
  }
  return mutateByKey(_key);
  async function mutateByKey(_k) {
    const [key] = serialize(_k);
    if (!key) return;
    const [get, set] = createCacheHelper(cache2, key);
    const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache2);
    const startRevalidate = () => {
      const revalidators = EVENT_REVALIDATORS[key];
      const revalidate = isFunction(options.revalidate) ? options.revalidate(get().data, _k) : options.revalidate !== false;
      if (revalidate) {
        delete FETCH[key];
        delete PRELOAD[key];
        if (revalidators && revalidators[0]) {
          return revalidators[0](MUTATE_EVENT).then(() => get().data);
        }
      }
      return get().data;
    };
    if (args.length < 3) {
      return startRevalidate();
    }
    let data = _data;
    let error;
    let isError = false;
    const beforeMutationTs = getTimestamp();
    MUTATION[key] = [
      beforeMutationTs,
      0
    ];
    const hasOptimisticData = !isUndefined(optimisticData);
    const state = get();
    const displayedData = state.data;
    const currentData = state._c;
    const committedData = isUndefined(currentData) ? displayedData : currentData;
    if (hasOptimisticData) {
      optimisticData = isFunction(optimisticData) ? optimisticData(committedData, displayedData) : optimisticData;
      set({
        data: optimisticData,
        _c: committedData
      });
    }
    if (isFunction(data)) {
      try {
        data = data(committedData);
      } catch (err) {
        error = err;
        isError = true;
      }
    }
    if (data && isPromiseLike(data)) {
      data = await data.catch((err) => {
        error = err;
        isError = true;
      });
      if (beforeMutationTs !== MUTATION[key][0]) {
        if (isError) throw error;
        return data;
      } else if (isError && hasOptimisticData && rollbackOnError(error)) {
        populateCache = true;
        set({
          data: committedData,
          _c: UNDEFINED
        });
      }
    }
    if (populateCache) {
      if (!isError) {
        if (isFunction(populateCache)) {
          const populateCachedData = populateCache(data, committedData);
          set({
            data: populateCachedData,
            error: UNDEFINED,
            _c: UNDEFINED
          });
        } else {
          set({
            data,
            error: UNDEFINED,
            _c: UNDEFINED
          });
        }
      }
    }
    MUTATION[key][1] = getTimestamp();
    Promise.resolve(startRevalidate()).then(() => {
      set({
        _c: UNDEFINED
      });
    });
    if (isError) {
      if (throwOnError) throw error;
      return;
    }
    return data;
  }
}
var revalidateAllKeys = (revalidators, type) => {
  for (const key in revalidators) {
    if (revalidators[key][0]) revalidators[key][0](type);
  }
};
var initCache = (provider, options) => {
  if (!SWRGlobalState.has(provider)) {
    const opts = mergeObjects(defaultConfigOptions, options);
    const EVENT_REVALIDATORS = /* @__PURE__ */ Object.create(null);
    const mutate2 = internalMutate.bind(UNDEFINED, provider);
    let unmount = noop2;
    const subscriptions = /* @__PURE__ */ Object.create(null);
    const subscribe = (key, callback) => {
      const subs = subscriptions[key] || [];
      subscriptions[key] = subs;
      subs.push(callback);
      return () => subs.splice(subs.indexOf(callback), 1);
    };
    const setter = (key, value, prev) => {
      provider.set(key, value);
      const subs = subscriptions[key];
      if (subs) {
        for (const fn of subs) {
          fn(value, prev);
        }
      }
    };
    const initProvider = () => {
      if (!SWRGlobalState.has(provider)) {
        SWRGlobalState.set(provider, [
          EVENT_REVALIDATORS,
          /* @__PURE__ */ Object.create(null),
          /* @__PURE__ */ Object.create(null),
          /* @__PURE__ */ Object.create(null),
          mutate2,
          setter,
          subscribe
        ]);
        if (!IS_SERVER) {
          const releaseFocus = opts.initFocus(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, FOCUS_EVENT)));
          const releaseReconnect = opts.initReconnect(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, RECONNECT_EVENT)));
          unmount = () => {
            releaseFocus && releaseFocus();
            releaseReconnect && releaseReconnect();
            SWRGlobalState.delete(provider);
          };
        }
      }
    };
    initProvider();
    return [
      provider,
      mutate2,
      initProvider,
      unmount
    ];
  }
  return [
    provider,
    SWRGlobalState.get(provider)[4]
  ];
};
var onErrorRetry = (_, __, config, revalidate, opts) => {
  const maxRetryCount = config.errorRetryCount;
  const currentRetryCount = opts.retryCount;
  const timeout = ~~((Math.random() + 0.5) * (1 << (currentRetryCount < 8 ? currentRetryCount : 8))) * config.errorRetryInterval;
  if (!isUndefined(maxRetryCount) && currentRetryCount > maxRetryCount) {
    return;
  }
  setTimeout(revalidate, timeout, opts);
};
var compare = dequal2;
var [cache, mutate] = initCache(/* @__PURE__ */ new Map());
var defaultConfig = mergeObjects(
  {
    // events
    onLoadingSlow: noop2,
    onSuccess: noop2,
    onError: noop2,
    onErrorRetry,
    onDiscarded: noop2,
    // switches
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    shouldRetryOnError: true,
    // timeouts
    errorRetryInterval: slowConnection ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: slowConnection ? 5e3 : 3e3,
    // providers
    compare,
    isPaused: () => false,
    cache,
    mutate,
    fallback: {}
  },
  // use web preset by default
  preset
);
var mergeConfigs = (a, b) => {
  const v = mergeObjects(a, b);
  if (b) {
    const { use: u1, fallback: f1 } = a;
    const { use: u2, fallback: f2 } = b;
    if (u1 && u2) {
      v.use = u1.concat(u2);
    }
    if (f1 && f2) {
      v.fallback = mergeObjects(f1, f2);
    }
  }
  return v;
};
var SWRConfigContext = (0, import_react.createContext)({});
var SWRConfig = (props) => {
  const { value } = props;
  const parentConfig = (0, import_react.useContext)(SWRConfigContext);
  const isFunctionalConfig = isFunction(value);
  const config = (0, import_react.useMemo)(() => isFunctionalConfig ? value(parentConfig) : value, [
    isFunctionalConfig,
    parentConfig,
    value
  ]);
  const extendedConfig = (0, import_react.useMemo)(() => isFunctionalConfig ? config : mergeConfigs(parentConfig, config), [
    isFunctionalConfig,
    parentConfig,
    config
  ]);
  const provider = config && config.provider;
  const cacheContextRef = (0, import_react.useRef)(UNDEFINED);
  if (provider && !cacheContextRef.current) {
    cacheContextRef.current = initCache(provider(extendedConfig.cache || cache), config);
  }
  const cacheContext = cacheContextRef.current;
  if (cacheContext) {
    extendedConfig.cache = cacheContext[0];
    extendedConfig.mutate = cacheContext[1];
  }
  useIsomorphicLayoutEffect(() => {
    if (cacheContext) {
      cacheContext[2] && cacheContext[2]();
      return cacheContext[3];
    }
  }, []);
  return (0, import_react.createElement)(SWRConfigContext.Provider, mergeObjects(props, {
    value: extendedConfig
  }));
};

// node_modules/swr/dist/_internal/constants.mjs
var INFINITE_PREFIX = "$inf$";

// node_modules/swr/dist/_internal/index.mjs
var import_react2 = __toESM(require_react(), 1);
var enableDevtools = isWindowDefined && window.__SWR_DEVTOOLS_USE__;
var use = enableDevtools ? window.__SWR_DEVTOOLS_USE__ : [];
var setupDevTools = () => {
  if (enableDevtools) {
    window.__SWR_DEVTOOLS_REACT__ = import_react2.default;
  }
};
var normalize = (args) => {
  return isFunction(args[1]) ? [
    args[0],
    args[1],
    args[2] || {}
  ] : [
    args[0],
    null,
    (args[1] === null ? args[2] : args[1]) || {}
  ];
};
var useSWRConfig = () => {
  return mergeObjects(defaultConfig, (0, import_react2.useContext)(SWRConfigContext));
};
var preload = (key_, fetcher) => {
  const [key, fnArg] = serialize(key_);
  const [, , , PRELOAD] = SWRGlobalState.get(cache);
  if (PRELOAD[key]) return PRELOAD[key];
  const req = fetcher(fnArg);
  PRELOAD[key] = req;
  return req;
};
var middleware = (useSWRNext) => (key_, fetcher_, config) => {
  const fetcher = fetcher_ && ((...args) => {
    const [key] = serialize(key_);
    const [, , , PRELOAD] = SWRGlobalState.get(cache);
    if (key.startsWith(INFINITE_PREFIX)) {
      return fetcher_(...args);
    }
    const req = PRELOAD[key];
    if (isUndefined(req)) return fetcher_(...args);
    delete PRELOAD[key];
    return req;
  });
  return useSWRNext(key_, fetcher, config);
};
var BUILT_IN_MIDDLEWARE = use.concat(middleware);
var withArgs = (hook) => {
  return function useSWRArgs(...args) {
    const fallbackConfig = useSWRConfig();
    const [key, fn, _config2] = normalize(args);
    const config = mergeConfigs(fallbackConfig, _config2);
    let next = hook;
    const { use: use3 } = config;
    const middleware2 = (use3 || []).concat(BUILT_IN_MIDDLEWARE);
    for (let i = middleware2.length; i--; ) {
      next = middleware2[i](next);
    }
    return next(key, fn || config.fetcher || null, config);
  };
};
var subscribeCallback = (key, callbacks, callback) => {
  const keyedRevalidators = callbacks[key] || (callbacks[key] = []);
  keyedRevalidators.push(callback);
  return () => {
    const index = keyedRevalidators.indexOf(callback);
    if (index >= 0) {
      keyedRevalidators[index] = keyedRevalidators[keyedRevalidators.length - 1];
      keyedRevalidators.pop();
    }
  };
};
var withMiddleware = (useSWR2, middleware2) => {
  return (...args) => {
    const [key, fn, config] = normalize(args);
    const uses = (config.use || []).concat(middleware2);
    return useSWR2(key, fn, {
      ...config,
      use: uses
    });
  };
};
setupDevTools();

// node_modules/swr/dist/index/index.mjs
var noop3 = () => {
};
var UNDEFINED2 = (
  /*#__NOINLINE__*/
  noop3()
);
var OBJECT2 = Object;
var isUndefined2 = (v) => v === UNDEFINED2;
var isFunction2 = (v) => typeof v == "function";
var table2 = /* @__PURE__ */ new WeakMap();
var getTypeName2 = (value) => OBJECT2.prototype.toString.call(value);
var isObjectTypeName2 = (typeName, type) => typeName === `[object ${type}]`;
var counter2 = 0;
var stableHash2 = (arg) => {
  const type = typeof arg;
  const typeName = getTypeName2(arg);
  const isDate = isObjectTypeName2(typeName, "Date");
  const isRegex = isObjectTypeName2(typeName, "RegExp");
  const isPlainObject = isObjectTypeName2(typeName, "Object");
  let result;
  let index;
  if (OBJECT2(arg) === arg && !isDate && !isRegex) {
    result = table2.get(arg);
    if (result) return result;
    result = ++counter2 + "~";
    table2.set(arg, result);
    if (Array.isArray(arg)) {
      result = "@";
      for (index = 0; index < arg.length; index++) {
        result += stableHash2(arg[index]) + ",";
      }
      table2.set(arg, result);
    }
    if (isPlainObject) {
      result = "#";
      const keys = OBJECT2.keys(arg).sort();
      while (!isUndefined2(index = keys.pop())) {
        if (!isUndefined2(arg[index])) {
          result += index + ":" + stableHash2(arg[index]) + ",";
        }
      }
      table2.set(arg, result);
    }
  } else {
    result = isDate ? arg.toJSON() : type == "symbol" ? arg.toString() : type == "string" ? JSON.stringify(arg) : "" + arg;
  }
  return result;
};
var serialize2 = (key) => {
  if (isFunction2(key)) {
    try {
      key = key();
    } catch (err) {
      key = "";
    }
  }
  const args = key;
  key = typeof key == "string" ? key : (Array.isArray(key) ? key.length : key) ? stableHash2(key) : "";
  return [
    key,
    args
  ];
};
var unstable_serialize = (key) => serialize2(key)[0];
var use2 = import_react3.default.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
// and emitting an error.
// We assume that this is only for the `use(thenable)` case, not `use(context)`.
// https://github.com/facebook/react/blob/aed00dacfb79d17c53218404c52b1c7aa59c4a89/packages/react-server/src/ReactFizzThenable.js#L45
((thenable) => {
  switch (thenable.status) {
    case "pending":
      throw thenable;
    case "fulfilled":
      return thenable.value;
    case "rejected":
      throw thenable.reason;
    default:
      thenable.status = "pending";
      thenable.then((v) => {
        thenable.status = "fulfilled";
        thenable.value = v;
      }, (e) => {
        thenable.status = "rejected";
        thenable.reason = e;
      });
      throw thenable;
  }
});
var WITH_DEDUPE = {
  dedupe: true
};
var useSWRHandler = (_key, fetcher, config) => {
  const { cache: cache2, compare: compare2, suspense, fallbackData, revalidateOnMount, revalidateIfStale, refreshInterval, refreshWhenHidden, refreshWhenOffline, keepPreviousData } = config;
  const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache2);
  const [key, fnArg] = serialize(_key);
  const initialMountedRef = (0, import_react3.useRef)(false);
  const unmountedRef = (0, import_react3.useRef)(false);
  const keyRef = (0, import_react3.useRef)(key);
  const fetcherRef = (0, import_react3.useRef)(fetcher);
  const configRef = (0, import_react3.useRef)(config);
  const getConfig = () => configRef.current;
  const isActive = () => getConfig().isVisible() && getConfig().isOnline();
  const [getCache, setCache, subscribeCache, getInitialCache] = createCacheHelper(cache2, key);
  const stateDependencies = (0, import_react3.useRef)({}).current;
  const fallback = isUndefined(fallbackData) ? isUndefined(config.fallback) ? UNDEFINED : config.fallback[key] : fallbackData;
  const isEqual2 = (prev, current) => {
    for (const _ in stateDependencies) {
      const t = _;
      if (t === "data") {
        if (!compare2(prev[t], current[t])) {
          if (!isUndefined(prev[t])) {
            return false;
          }
          if (!compare2(returnedData, current[t])) {
            return false;
          }
        }
      } else {
        if (current[t] !== prev[t]) {
          return false;
        }
      }
    }
    return true;
  };
  const getSnapshot = (0, import_react3.useMemo)(() => {
    const shouldStartRequest = (() => {
      if (!key) return false;
      if (!fetcher) return false;
      if (!isUndefined(revalidateOnMount)) return revalidateOnMount;
      if (getConfig().isPaused()) return false;
      if (suspense) return false;
      return revalidateIfStale !== false;
    })();
    const getSelectedCache = (state) => {
      const snapshot = mergeObjects(state);
      delete snapshot._k;
      if (!shouldStartRequest) {
        return snapshot;
      }
      return {
        isValidating: true,
        isLoading: true,
        ...snapshot
      };
    };
    const cachedData2 = getCache();
    const initialData = getInitialCache();
    const clientSnapshot = getSelectedCache(cachedData2);
    const serverSnapshot = cachedData2 === initialData ? clientSnapshot : getSelectedCache(initialData);
    let memorizedSnapshot = clientSnapshot;
    return [
      () => {
        const newSnapshot = getSelectedCache(getCache());
        const compareResult = isEqual2(newSnapshot, memorizedSnapshot);
        if (compareResult) {
          memorizedSnapshot.data = newSnapshot.data;
          memorizedSnapshot.isLoading = newSnapshot.isLoading;
          memorizedSnapshot.isValidating = newSnapshot.isValidating;
          memorizedSnapshot.error = newSnapshot.error;
          return memorizedSnapshot;
        } else {
          memorizedSnapshot = newSnapshot;
          return newSnapshot;
        }
      },
      () => serverSnapshot
    ];
  }, [
    cache2,
    key
  ]);
  const cached = (0, import_shim.useSyncExternalStore)((0, import_react3.useCallback)(
    (callback) => subscribeCache(key, (current, prev) => {
      if (!isEqual2(prev, current)) callback();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      cache2,
      key
    ]
  ), getSnapshot[0], getSnapshot[1]);
  const isInitialMount = !initialMountedRef.current;
  const hasRevalidator = EVENT_REVALIDATORS[key] && EVENT_REVALIDATORS[key].length > 0;
  const cachedData = cached.data;
  const data = isUndefined(cachedData) ? fallback && isPromiseLike(fallback) ? use2(fallback) : fallback : cachedData;
  const error = cached.error;
  const laggyDataRef = (0, import_react3.useRef)(data);
  const returnedData = keepPreviousData ? isUndefined(cachedData) ? isUndefined(laggyDataRef.current) ? data : laggyDataRef.current : cachedData : data;
  const shouldDoInitialRevalidation = (() => {
    if (hasRevalidator && !isUndefined(error)) return false;
    if (isInitialMount && !isUndefined(revalidateOnMount)) return revalidateOnMount;
    if (getConfig().isPaused()) return false;
    if (suspense) return isUndefined(data) ? false : revalidateIfStale;
    return isUndefined(data) || revalidateIfStale;
  })();
  const defaultValidatingState = !!(key && fetcher && isInitialMount && shouldDoInitialRevalidation);
  const isValidating = isUndefined(cached.isValidating) ? defaultValidatingState : cached.isValidating;
  const isLoading = isUndefined(cached.isLoading) ? defaultValidatingState : cached.isLoading;
  const revalidate = (0, import_react3.useCallback)(
    async (revalidateOpts) => {
      const currentFetcher = fetcherRef.current;
      if (!key || !currentFetcher || unmountedRef.current || getConfig().isPaused()) {
        return false;
      }
      let newData;
      let startAt;
      let loading = true;
      const opts = revalidateOpts || {};
      const shouldStartNewRequest = !FETCH[key] || !opts.dedupe;
      const callbackSafeguard = () => {
        if (IS_REACT_LEGACY) {
          return !unmountedRef.current && key === keyRef.current && initialMountedRef.current;
        }
        return key === keyRef.current;
      };
      const finalState = {
        isValidating: false,
        isLoading: false
      };
      const finishRequestAndUpdateState = () => {
        setCache(finalState);
      };
      const cleanupState = () => {
        const requestInfo = FETCH[key];
        if (requestInfo && requestInfo[1] === startAt) {
          delete FETCH[key];
        }
      };
      const initialState = {
        isValidating: true
      };
      if (isUndefined(getCache().data)) {
        initialState.isLoading = true;
      }
      try {
        if (shouldStartNewRequest) {
          setCache(initialState);
          if (config.loadingTimeout && isUndefined(getCache().data)) {
            setTimeout(() => {
              if (loading && callbackSafeguard()) {
                getConfig().onLoadingSlow(key, config);
              }
            }, config.loadingTimeout);
          }
          FETCH[key] = [
            currentFetcher(fnArg),
            getTimestamp()
          ];
        }
        ;
        [newData, startAt] = FETCH[key];
        newData = await newData;
        if (shouldStartNewRequest) {
          setTimeout(cleanupState, config.dedupingInterval);
        }
        if (!FETCH[key] || FETCH[key][1] !== startAt) {
          if (shouldStartNewRequest) {
            if (callbackSafeguard()) {
              getConfig().onDiscarded(key);
            }
          }
          return false;
        }
        finalState.error = UNDEFINED;
        const mutationInfo = MUTATION[key];
        if (!isUndefined(mutationInfo) && // case 1
        (startAt <= mutationInfo[0] || // case 2
        startAt <= mutationInfo[1] || // case 3
        mutationInfo[1] === 0)) {
          finishRequestAndUpdateState();
          if (shouldStartNewRequest) {
            if (callbackSafeguard()) {
              getConfig().onDiscarded(key);
            }
          }
          return false;
        }
        const cacheData = getCache().data;
        finalState.data = compare2(cacheData, newData) ? cacheData : newData;
        if (shouldStartNewRequest) {
          if (callbackSafeguard()) {
            getConfig().onSuccess(newData, key, config);
          }
        }
      } catch (err) {
        cleanupState();
        const currentConfig = getConfig();
        const { shouldRetryOnError } = currentConfig;
        if (!currentConfig.isPaused()) {
          finalState.error = err;
          if (shouldStartNewRequest && callbackSafeguard()) {
            currentConfig.onError(err, key, currentConfig);
            if (shouldRetryOnError === true || isFunction(shouldRetryOnError) && shouldRetryOnError(err)) {
              if (!getConfig().revalidateOnFocus || !getConfig().revalidateOnReconnect || isActive()) {
                currentConfig.onErrorRetry(err, key, currentConfig, (_opts) => {
                  const revalidators = EVENT_REVALIDATORS[key];
                  if (revalidators && revalidators[0]) {
                    revalidators[0](events_exports.ERROR_REVALIDATE_EVENT, _opts);
                  }
                }, {
                  retryCount: (opts.retryCount || 0) + 1,
                  dedupe: true
                });
              }
            }
          }
        }
      }
      loading = false;
      finishRequestAndUpdateState();
      return true;
    },
    // `setState` is immutable, and `eventsCallback`, `fnArg`, and
    // `keyValidating` are depending on `key`, so we can exclude them from
    // the deps array.
    //
    // FIXME:
    // `fn` and `config` might be changed during the lifecycle,
    // but they might be changed every render like this.
    // `useSWR('key', () => fetch('/api/'), { suspense: true })`
    // So we omit the values from the deps array
    // even though it might cause unexpected behaviors.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      key,
      cache2
    ]
  );
  const boundMutate = (0, import_react3.useCallback)(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...args) => {
      return internalMutate(cache2, keyRef.current, ...args);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useIsomorphicLayoutEffect(() => {
    fetcherRef.current = fetcher;
    configRef.current = config;
    if (!isUndefined(cachedData)) {
      laggyDataRef.current = cachedData;
    }
  });
  useIsomorphicLayoutEffect(() => {
    if (!key) return;
    const softRevalidate = revalidate.bind(UNDEFINED, WITH_DEDUPE);
    let nextFocusRevalidatedAt = 0;
    if (getConfig().revalidateOnFocus) {
      const initNow = Date.now();
      nextFocusRevalidatedAt = initNow + getConfig().focusThrottleInterval;
    }
    const onRevalidate = (type, opts = {}) => {
      if (type == events_exports.FOCUS_EVENT) {
        const now = Date.now();
        if (getConfig().revalidateOnFocus && now > nextFocusRevalidatedAt && isActive()) {
          nextFocusRevalidatedAt = now + getConfig().focusThrottleInterval;
          softRevalidate();
        }
      } else if (type == events_exports.RECONNECT_EVENT) {
        if (getConfig().revalidateOnReconnect && isActive()) {
          softRevalidate();
        }
      } else if (type == events_exports.MUTATE_EVENT) {
        return revalidate();
      } else if (type == events_exports.ERROR_REVALIDATE_EVENT) {
        return revalidate(opts);
      }
      return;
    };
    const unsubEvents = subscribeCallback(key, EVENT_REVALIDATORS, onRevalidate);
    unmountedRef.current = false;
    keyRef.current = key;
    initialMountedRef.current = true;
    setCache({
      _k: fnArg
    });
    if (shouldDoInitialRevalidation) {
      if (!FETCH[key]) {
        if (isUndefined(data) || IS_SERVER) {
          softRevalidate();
        } else {
          rAF(softRevalidate);
        }
      }
    }
    return () => {
      unmountedRef.current = true;
      unsubEvents();
    };
  }, [
    key
  ]);
  useIsomorphicLayoutEffect(() => {
    let timer;
    function next() {
      const interval = isFunction(refreshInterval) ? refreshInterval(getCache().data) : refreshInterval;
      if (interval && timer !== -1) {
        timer = setTimeout(execute, interval);
      }
    }
    function execute() {
      if (!getCache().error && (refreshWhenHidden || getConfig().isVisible()) && (refreshWhenOffline || getConfig().isOnline())) {
        revalidate(WITH_DEDUPE).then(next);
      } else {
        next();
      }
    }
    next();
    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = -1;
      }
    };
  }, [
    refreshInterval,
    refreshWhenHidden,
    refreshWhenOffline,
    key
  ]);
  (0, import_react3.useDebugValue)(returnedData);
  if (suspense && isUndefined(data) && key) {
    if (!IS_REACT_LEGACY && IS_SERVER) {
      throw new Error("Fallback data is required when using Suspense in SSR.");
    }
    fetcherRef.current = fetcher;
    configRef.current = config;
    unmountedRef.current = false;
    const req = PRELOAD[key];
    if (!isUndefined(req)) {
      const promise = boundMutate(req);
      use2(promise);
    }
    if (isUndefined(error)) {
      const promise = revalidate(WITH_DEDUPE);
      if (!isUndefined(returnedData)) {
        promise.status = "fulfilled";
        promise.value = true;
      }
      use2(promise);
    } else {
      throw error;
    }
  }
  const swrResponse = {
    mutate: boundMutate,
    get data() {
      stateDependencies.data = true;
      return returnedData;
    },
    get error() {
      stateDependencies.error = true;
      return error;
    },
    get isValidating() {
      stateDependencies.isValidating = true;
      return isValidating;
    },
    get isLoading() {
      stateDependencies.isLoading = true;
      return isLoading;
    }
  };
  return swrResponse;
};
var SWRConfig2 = OBJECT.defineProperty(SWRConfig, "defaultValue", {
  value: defaultConfig
});
var useSWR = withArgs(useSWRHandler);

// node_modules/swr/dist/infinite/index.mjs
var import_react4 = __toESM(require_react(), 1);
var import_shim2 = __toESM(require_shim(), 1);
var noop4 = () => {
};
var UNDEFINED3 = (
  /*#__NOINLINE__*/
  noop4()
);
var OBJECT3 = Object;
var isUndefined3 = (v) => v === UNDEFINED3;
var isFunction3 = (v) => typeof v == "function";
var table3 = /* @__PURE__ */ new WeakMap();
var getTypeName3 = (value) => OBJECT3.prototype.toString.call(value);
var isObjectTypeName3 = (typeName, type) => typeName === `[object ${type}]`;
var counter3 = 0;
var stableHash3 = (arg) => {
  const type = typeof arg;
  const typeName = getTypeName3(arg);
  const isDate = isObjectTypeName3(typeName, "Date");
  const isRegex = isObjectTypeName3(typeName, "RegExp");
  const isPlainObject = isObjectTypeName3(typeName, "Object");
  let result;
  let index;
  if (OBJECT3(arg) === arg && !isDate && !isRegex) {
    result = table3.get(arg);
    if (result) return result;
    result = ++counter3 + "~";
    table3.set(arg, result);
    if (Array.isArray(arg)) {
      result = "@";
      for (index = 0; index < arg.length; index++) {
        result += stableHash3(arg[index]) + ",";
      }
      table3.set(arg, result);
    }
    if (isPlainObject) {
      result = "#";
      const keys = OBJECT3.keys(arg).sort();
      while (!isUndefined3(index = keys.pop())) {
        if (!isUndefined3(arg[index])) {
          result += index + ":" + stableHash3(arg[index]) + ",";
        }
      }
      table3.set(arg, result);
    }
  } else {
    result = isDate ? arg.toJSON() : type == "symbol" ? arg.toString() : type == "string" ? JSON.stringify(arg) : "" + arg;
  }
  return result;
};
var serialize3 = (key) => {
  if (isFunction3(key)) {
    try {
      key = key();
    } catch (err) {
      key = "";
    }
  }
  const args = key;
  key = typeof key == "string" ? key : (Array.isArray(key) ? key.length : key) ? stableHash3(key) : "";
  return [
    key,
    args
  ];
};
var getFirstPageKey = (getKey) => {
  return serialize3(getKey ? getKey(0, null) : null)[0];
};
var EMPTY_PROMISE = Promise.resolve();
var infinite = (useSWRNext) => (getKey, fn, config) => {
  const didMountRef = (0, import_react4.useRef)(false);
  const { cache: cache$1, initialSize = 1, revalidateAll = false, persistSize = false, revalidateFirstPage = true, revalidateOnMount = false, parallel = false } = config;
  const [, , , PRELOAD] = SWRGlobalState.get(cache);
  let infiniteKey;
  try {
    infiniteKey = getFirstPageKey(getKey);
    if (infiniteKey) infiniteKey = INFINITE_PREFIX + infiniteKey;
  } catch (err) {
  }
  const [get, set, subscribeCache] = createCacheHelper(cache$1, infiniteKey);
  const getSnapshot = (0, import_react4.useCallback)(() => {
    const size = isUndefined(get()._l) ? initialSize : get()._l;
    return size;
  }, [
    cache$1,
    infiniteKey,
    initialSize
  ]);
  (0, import_shim2.useSyncExternalStore)((0, import_react4.useCallback)(
    (callback) => {
      if (infiniteKey) return subscribeCache(infiniteKey, () => {
        callback();
      });
      return () => {
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      cache$1,
      infiniteKey
    ]
  ), getSnapshot, getSnapshot);
  const resolvePageSize = (0, import_react4.useCallback)(() => {
    const cachedPageSize = get()._l;
    return isUndefined(cachedPageSize) ? initialSize : cachedPageSize;
  }, [
    infiniteKey,
    initialSize
  ]);
  const lastPageSizeRef = (0, import_react4.useRef)(resolvePageSize());
  useIsomorphicLayoutEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (infiniteKey) {
      set({
        _l: persistSize ? lastPageSizeRef.current : resolvePageSize()
      });
    }
  }, [
    infiniteKey,
    cache$1
  ]);
  const shouldRevalidateOnMount = revalidateOnMount && !didMountRef.current;
  const swr = useSWRNext(infiniteKey, async (key) => {
    const forceRevalidateAll = get()._i;
    const shouldRevalidatePage = get()._r;
    set({
      _r: UNDEFINED
    });
    const data = [];
    const pageSize = resolvePageSize();
    const [getCache] = createCacheHelper(cache$1, key);
    const cacheData = getCache().data;
    const revalidators = [];
    let previousPageData = null;
    for (let i = 0; i < pageSize; ++i) {
      const [pageKey, pageArg] = serialize(getKey(i, parallel ? null : previousPageData));
      if (!pageKey) {
        break;
      }
      const [getSWRCache, setSWRCache] = createCacheHelper(cache$1, pageKey);
      let pageData = getSWRCache().data;
      const shouldFetchPage = revalidateAll || forceRevalidateAll || isUndefined(pageData) || revalidateFirstPage && !i && !isUndefined(cacheData) || shouldRevalidateOnMount || cacheData && !isUndefined(cacheData[i]) && !config.compare(cacheData[i], pageData);
      if (fn && (typeof shouldRevalidatePage === "function" ? shouldRevalidatePage(pageData, pageArg) : shouldFetchPage)) {
        const revalidate = async () => {
          const hasPreloadedRequest = pageKey in PRELOAD;
          if (!hasPreloadedRequest) {
            pageData = await fn(pageArg);
          } else {
            const req = PRELOAD[pageKey];
            delete PRELOAD[pageKey];
            pageData = await req;
          }
          setSWRCache({
            data: pageData,
            _k: pageArg
          });
          data[i] = pageData;
        };
        if (parallel) {
          revalidators.push(revalidate);
        } else {
          await revalidate();
        }
      } else {
        data[i] = pageData;
      }
      if (!parallel) {
        previousPageData = pageData;
      }
    }
    if (parallel) {
      await Promise.all(revalidators.map((r) => r()));
    }
    set({
      _i: UNDEFINED
    });
    return data;
  }, config);
  const mutate2 = (0, import_react4.useCallback)(
    // eslint-disable-next-line func-names
    function(data, opts) {
      const options = typeof opts === "boolean" ? {
        revalidate: opts
      } : opts || {};
      const shouldRevalidate = options.revalidate !== false;
      if (!infiniteKey) return EMPTY_PROMISE;
      if (shouldRevalidate) {
        if (!isUndefined(data)) {
          set({
            _i: false,
            _r: options.revalidate
          });
        } else {
          set({
            _i: true,
            _r: options.revalidate
          });
        }
      }
      return arguments.length ? swr.mutate(data, {
        ...options,
        revalidate: shouldRevalidate
      }) : swr.mutate();
    },
    // swr.mutate is always the same reference
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      infiniteKey,
      cache$1
    ]
  );
  const setSize = (0, import_react4.useCallback)(
    (arg) => {
      if (!infiniteKey) return EMPTY_PROMISE;
      const [, changeSize] = createCacheHelper(cache$1, infiniteKey);
      let size;
      if (isFunction(arg)) {
        size = arg(resolvePageSize());
      } else if (typeof arg == "number") {
        size = arg;
      }
      if (typeof size != "number") return EMPTY_PROMISE;
      changeSize({
        _l: size
      });
      lastPageSizeRef.current = size;
      const data = [];
      const [getInfiniteCache] = createCacheHelper(cache$1, infiniteKey);
      let previousPageData = null;
      for (let i = 0; i < size; ++i) {
        const [pageKey] = serialize(getKey(i, previousPageData));
        const [getCache] = createCacheHelper(cache$1, pageKey);
        const pageData = pageKey ? getCache().data : UNDEFINED;
        if (isUndefined(pageData)) {
          return mutate2(getInfiniteCache().data);
        }
        data.push(pageData);
        previousPageData = pageData;
      }
      return mutate2(data);
    },
    // exclude getKey from the dependencies, which isn't allowed to change during the lifecycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      infiniteKey,
      cache$1,
      mutate2,
      resolvePageSize
    ]
  );
  return {
    size: resolvePageSize(),
    setSize,
    mutate: mutate2,
    get data() {
      return swr.data;
    },
    get error() {
      return swr.error;
    },
    get isValidating() {
      return swr.isValidating;
    },
    get isLoading() {
      return swr.isLoading;
    }
  };
};
var useSWRInfinite = withMiddleware(useSWR, infinite);

// node_modules/@clerk/shared/dist/react/index.mjs
var import_react8 = __toESM(require_react(), 1);
var import_react9 = __toESM(require_react(), 1);
var import_react10 = __toESM(require_react(), 1);
var import_react11 = __toESM(require_react(), 1);
var import_react12 = __toESM(require_react(), 1);
var import_react13 = __toESM(require_react(), 1);

// node_modules/swr/dist/mutation/index.mjs
var import_react5 = __toESM(require_react(), 1);
var startTransition = IS_REACT_LEGACY ? (cb) => {
  cb();
} : import_react5.default.startTransition;
var useStateWithDeps = (initialState) => {
  const [, rerender] = (0, import_react5.useState)({});
  const unmountedRef = (0, import_react5.useRef)(false);
  const stateRef = (0, import_react5.useRef)(initialState);
  const stateDependenciesRef = (0, import_react5.useRef)({
    data: false,
    error: false,
    isValidating: false
  });
  const setState = (0, import_react5.useCallback)((payload) => {
    let shouldRerender = false;
    const currentState = stateRef.current;
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        const k = key;
        if (currentState[k] !== payload[k]) {
          currentState[k] = payload[k];
          if (stateDependenciesRef.current[k]) {
            shouldRerender = true;
          }
        }
      }
    }
    if (shouldRerender && !unmountedRef.current) {
      rerender({});
    }
  }, []);
  useIsomorphicLayoutEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  });
  return [
    stateRef,
    stateDependenciesRef.current,
    setState
  ];
};
var mutation = () => (key, fetcher, config = {}) => {
  const { mutate: mutate2 } = useSWRConfig();
  const keyRef = (0, import_react5.useRef)(key);
  const fetcherRef = (0, import_react5.useRef)(fetcher);
  const configRef = (0, import_react5.useRef)(config);
  const ditchMutationsUntilRef = (0, import_react5.useRef)(0);
  const [stateRef, stateDependencies, setState] = useStateWithDeps({
    data: UNDEFINED,
    error: UNDEFINED,
    isMutating: false
  });
  const currentState = stateRef.current;
  const trigger = (0, import_react5.useCallback)(
    async (arg, opts) => {
      const [serializedKey, resolvedKey] = serialize(keyRef.current);
      if (!fetcherRef.current) {
        throw new Error("Can’t trigger the mutation: missing fetcher.");
      }
      if (!serializedKey) {
        throw new Error("Can’t trigger the mutation: missing key.");
      }
      const options = mergeObjects(mergeObjects({
        populateCache: false,
        throwOnError: true
      }, configRef.current), opts);
      const mutationStartedAt = getTimestamp();
      ditchMutationsUntilRef.current = mutationStartedAt;
      setState({
        isMutating: true
      });
      try {
        const data = await mutate2(
          serializedKey,
          fetcherRef.current(resolvedKey, {
            arg
          }),
          // We must throw the error here so we can catch and update the states.
          mergeObjects(options, {
            throwOnError: true
          })
        );
        if (ditchMutationsUntilRef.current <= mutationStartedAt) {
          startTransition(() => setState({
            data,
            isMutating: false,
            error: void 0
          }));
          options.onSuccess == null ? void 0 : options.onSuccess.call(options, data, serializedKey, options);
        }
        return data;
      } catch (error) {
        if (ditchMutationsUntilRef.current <= mutationStartedAt) {
          startTransition(() => setState({
            error,
            isMutating: false
          }));
          options.onError == null ? void 0 : options.onError.call(options, error, serializedKey, options);
          if (options.throwOnError) {
            throw error;
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const reset = (0, import_react5.useCallback)(() => {
    ditchMutationsUntilRef.current = getTimestamp();
    setState({
      data: UNDEFINED,
      error: UNDEFINED,
      isMutating: false
    });
  }, []);
  useIsomorphicLayoutEffect(() => {
    keyRef.current = key;
    fetcherRef.current = fetcher;
    configRef.current = config;
  });
  return {
    trigger,
    reset,
    get data() {
      stateDependencies.data = true;
      return currentState.data;
    },
    get error() {
      stateDependencies.error = true;
      return currentState.error;
    },
    get isMutating() {
      stateDependencies.isMutating = true;
      return currentState.isMutating;
    }
  };
};
var useSWRMutation = withMiddleware(useSWR, mutation);

// node_modules/@clerk/shared/dist/react/index.mjs
var import_react14 = __toESM(require_react(), 1);
var import_react15 = __toESM(require_react(), 1);
function assertContextExists(contextVal, msgOrCtx) {
  if (!contextVal) {
    throw typeof msgOrCtx === "string" ? new Error(msgOrCtx) : new Error(`${msgOrCtx.displayName} not found`);
  }
}
var createContextAndHook = (displayName, options) => {
  const { assertCtxFn = assertContextExists } = options || {};
  const Ctx = import_react6.default.createContext(void 0);
  Ctx.displayName = displayName;
  const useCtx = () => {
    const ctx = import_react6.default.useContext(Ctx);
    assertCtxFn(ctx, `${displayName} not found`);
    return ctx.value;
  };
  const useCtxWithoutGuarantee = () => {
    const ctx = import_react6.default.useContext(Ctx);
    return ctx ? ctx.value : {};
  };
  return [Ctx, useCtx, useCtxWithoutGuarantee];
};
var clerk_swr_exports = {};
__export2(clerk_swr_exports, {
  useSWR: () => useSWR,
  useSWRInfinite: () => useSWRInfinite
});
__reExport(clerk_swr_exports, index_exports);
var [ClerkInstanceContext, useClerkInstanceContext] = createContextAndHook("ClerkInstanceContext");
var [UserContext, useUserContext] = createContextAndHook("UserContext");
var [ClientContext, useClientContext] = createContextAndHook("ClientContext");
var [SessionContext, useSessionContext] = createContextAndHook(
  "SessionContext"
);
var OptionsContext = import_react7.default.createContext({});
var [OrganizationContextInternal, useOrganizationContext] = createContextAndHook("OrganizationContext");
var OrganizationProvider = ({
  children,
  organization,
  swrConfig
}) => {
  return import_react7.default.createElement(clerk_swr_exports.SWRConfig, { value: swrConfig }, import_react7.default.createElement(
    OrganizationContextInternal.Provider,
    {
      value: {
        value: { organization }
      }
    },
    children
  ));
};
function useAssertWrappedByClerkProvider(displayNameOrFn) {
  const ctx = import_react7.default.useContext(ClerkInstanceContext);
  if (!ctx) {
    if (typeof displayNameOrFn === "function") {
      displayNameOrFn();
      return;
    }
    throw new Error(
      `${displayNameOrFn} can only be used within the <ClerkProvider /> component.

Possible fixes:
1. Ensure that the <ClerkProvider /> is correctly wrapping your application where this component is used.
2. Check for multiple versions of the \`@clerk/shared\` package in your project. Use a tool like \`npm ls @clerk/shared\` to identify multiple versions, and update your dependencies to only rely on one.

Learn more: https://clerk.com/docs/components/clerk-provider`.trim()
    );
  }
}
function getDifferentKeys(obj1, obj2) {
  const keysSet = new Set(Object.keys(obj2));
  const differentKeysObject = {};
  for (const key1 of Object.keys(obj1)) {
    if (!keysSet.has(key1)) {
      differentKeysObject[key1] = obj1[key1];
    }
  }
  return differentKeysObject;
}
var useWithSafeValues = (params, defaultValues) => {
  const shouldUseDefaults = typeof params === "boolean" && params;
  const initialPageRef = (0, import_react8.useRef)(
    shouldUseDefaults ? defaultValues.initialPage : params?.initialPage ?? defaultValues.initialPage
  );
  const pageSizeRef = (0, import_react8.useRef)(shouldUseDefaults ? defaultValues.pageSize : params?.pageSize ?? defaultValues.pageSize);
  const newObj = {};
  for (const key of Object.keys(defaultValues)) {
    newObj[key] = shouldUseDefaults ? defaultValues[key] : params?.[key] ?? defaultValues[key];
  }
  return {
    ...newObj,
    initialPage: initialPageRef.current,
    pageSize: pageSizeRef.current
  };
};
var cachingSWROptions = {
  dedupingInterval: 1e3 * 60,
  focusThrottleInterval: 1e3 * 60 * 2
};
var usePagesOrInfinite = (params, fetcher, config, cacheKeys) => {
  const [paginatedPage, setPaginatedPage] = (0, import_react8.useState)(params.initialPage ?? 1);
  const initialPageRef = (0, import_react8.useRef)(params.initialPage ?? 1);
  const pageSizeRef = (0, import_react8.useRef)(params.pageSize ?? 10);
  const enabled = config.enabled ?? true;
  const cacheMode = config.__experimental_mode === "cache";
  const triggerInfinite = config.infinite ?? false;
  const keepPreviousData = config.keepPreviousData ?? false;
  const pagesCacheKey = {
    ...cacheKeys,
    ...params,
    initialPage: paginatedPage,
    pageSize: pageSizeRef.current
  };
  const shouldFetch = !triggerInfinite && enabled && (!cacheMode ? !!fetcher : true);
  const swrKey = shouldFetch ? pagesCacheKey : null;
  const swrFetcher = !cacheMode && !!fetcher ? (cacheKeyParams) => {
    const requestParams = getDifferentKeys(cacheKeyParams, cacheKeys);
    return fetcher({ ...params, ...requestParams });
  } : null;
  const {
    data: swrData,
    isValidating: swrIsValidating,
    isLoading: swrIsLoading,
    error: swrError,
    mutate: swrMutate
  } = useSWR(swrKey, swrFetcher, { keepPreviousData, ...cachingSWROptions });
  const {
    data: swrInfiniteData,
    isLoading: swrInfiniteIsLoading,
    isValidating: swrInfiniteIsValidating,
    error: swrInfiniteError,
    size,
    setSize,
    mutate: swrInfiniteMutate
  } = useSWRInfinite(
    (pageIndex) => {
      if (!triggerInfinite || !enabled) {
        return null;
      }
      return {
        ...params,
        ...cacheKeys,
        initialPage: initialPageRef.current + pageIndex,
        pageSize: pageSizeRef.current
      };
    },
    (cacheKeyParams) => {
      const requestParams = getDifferentKeys(cacheKeyParams, cacheKeys);
      return fetcher?.(requestParams);
    },
    cachingSWROptions
  );
  const page = (0, import_react8.useMemo)(() => {
    if (triggerInfinite) {
      return size;
    }
    return paginatedPage;
  }, [triggerInfinite, size, paginatedPage]);
  const fetchPage = (0, import_react8.useCallback)(
    (numberOrgFn) => {
      if (triggerInfinite) {
        void setSize(numberOrgFn);
        return;
      }
      return setPaginatedPage(numberOrgFn);
    },
    [setSize]
  );
  const data = (0, import_react8.useMemo)(() => {
    if (triggerInfinite) {
      return swrInfiniteData?.map((a) => a?.data).flat() ?? [];
    }
    return swrData?.data ?? [];
  }, [triggerInfinite, swrData, swrInfiniteData]);
  const count = (0, import_react8.useMemo)(() => {
    if (triggerInfinite) {
      return swrInfiniteData?.[swrInfiniteData?.length - 1]?.total_count || 0;
    }
    return swrData?.total_count ?? 0;
  }, [triggerInfinite, swrData, swrInfiniteData]);
  const isLoading = triggerInfinite ? swrInfiniteIsLoading : swrIsLoading;
  const isFetching = triggerInfinite ? swrInfiniteIsValidating : swrIsValidating;
  const error = (triggerInfinite ? swrInfiniteError : swrError) ?? null;
  const isError = !!error;
  const fetchNext = (0, import_react8.useCallback)(() => {
    fetchPage((n) => Math.max(0, n + 1));
  }, [fetchPage]);
  const fetchPrevious = (0, import_react8.useCallback)(() => {
    fetchPage((n) => Math.max(0, n - 1));
  }, [fetchPage]);
  const offsetCount = (initialPageRef.current - 1) * pageSizeRef.current;
  const pageCount = Math.ceil((count - offsetCount) / pageSizeRef.current);
  const hasNextPage = count - offsetCount * pageSizeRef.current > page * pageSizeRef.current;
  const hasPreviousPage = (page - 1) * pageSizeRef.current > offsetCount * pageSizeRef.current;
  const setData = triggerInfinite ? (value) => swrInfiniteMutate(value, {
    revalidate: false
  }) : (value) => swrMutate(value, {
    revalidate: false
  });
  const revalidate = triggerInfinite ? () => swrInfiniteMutate() : () => swrMutate();
  return {
    data,
    count,
    error,
    isLoading,
    isFetching,
    isError,
    page,
    pageCount,
    fetchPage,
    fetchNext,
    fetchPrevious,
    hasNextPage,
    hasPreviousPage,
    // Let the hook return type define this type
    revalidate,
    // Let the hook return type define this type
    setData
  };
};
var undefinedPaginatedResource = {
  data: void 0,
  count: void 0,
  error: void 0,
  isLoading: false,
  isFetching: false,
  isError: false,
  page: void 0,
  pageCount: void 0,
  fetchPage: void 0,
  fetchNext: void 0,
  fetchPrevious: void 0,
  hasNextPage: false,
  hasPreviousPage: false,
  revalidate: void 0,
  setData: void 0
};
function useOrganization(params) {
  const {
    domains: domainListParams,
    membershipRequests: membershipRequestsListParams,
    memberships: membersListParams,
    invitations: invitationsListParams,
    subscriptions: subscriptionsListParams
  } = params || {};
  useAssertWrappedByClerkProvider("useOrganization");
  const { organization } = useOrganizationContext();
  const session = useSessionContext();
  const domainSafeValues = useWithSafeValues(domainListParams, {
    initialPage: 1,
    pageSize: 10,
    keepPreviousData: false,
    infinite: false,
    enrollmentMode: void 0
  });
  const membershipRequestSafeValues = useWithSafeValues(membershipRequestsListParams, {
    initialPage: 1,
    pageSize: 10,
    status: "pending",
    keepPreviousData: false,
    infinite: false
  });
  const membersSafeValues = useWithSafeValues(membersListParams, {
    initialPage: 1,
    pageSize: 10,
    role: void 0,
    keepPreviousData: false,
    infinite: false,
    query: void 0
  });
  const invitationsSafeValues = useWithSafeValues(invitationsListParams, {
    initialPage: 1,
    pageSize: 10,
    status: ["pending"],
    keepPreviousData: false,
    infinite: false
  });
  const subscriptionsSafeValues = useWithSafeValues(subscriptionsListParams, {
    initialPage: 1,
    pageSize: 10,
    keepPreviousData: false,
    infinite: false
  });
  const clerk = useClerkInstanceContext();
  clerk.telemetry?.record(eventMethodCalled("useOrganization"));
  const domainParams = typeof domainListParams === "undefined" ? void 0 : {
    initialPage: domainSafeValues.initialPage,
    pageSize: domainSafeValues.pageSize,
    enrollmentMode: domainSafeValues.enrollmentMode
  };
  const membershipRequestParams = typeof membershipRequestsListParams === "undefined" ? void 0 : {
    initialPage: membershipRequestSafeValues.initialPage,
    pageSize: membershipRequestSafeValues.pageSize,
    status: membershipRequestSafeValues.status
  };
  const membersParams = typeof membersListParams === "undefined" ? void 0 : {
    initialPage: membersSafeValues.initialPage,
    pageSize: membersSafeValues.pageSize,
    role: membersSafeValues.role,
    query: membersSafeValues.query
  };
  const invitationsParams = typeof invitationsListParams === "undefined" ? void 0 : {
    initialPage: invitationsSafeValues.initialPage,
    pageSize: invitationsSafeValues.pageSize,
    status: invitationsSafeValues.status
  };
  const subscriptionsParams = typeof subscriptionsListParams === "undefined" ? void 0 : {
    initialPage: subscriptionsSafeValues.initialPage,
    pageSize: subscriptionsSafeValues.pageSize,
    orgId: organization?.id
  };
  const domains = usePagesOrInfinite(
    {
      ...domainParams
    },
    organization?.getDomains,
    {
      keepPreviousData: domainSafeValues.keepPreviousData,
      infinite: domainSafeValues.infinite,
      enabled: !!domainParams
    },
    {
      type: "domains",
      organizationId: organization?.id
    }
  );
  const membershipRequests = usePagesOrInfinite(
    {
      ...membershipRequestParams
    },
    organization?.getMembershipRequests,
    {
      keepPreviousData: membershipRequestSafeValues.keepPreviousData,
      infinite: membershipRequestSafeValues.infinite,
      enabled: !!membershipRequestParams
    },
    {
      type: "membershipRequests",
      organizationId: organization?.id
    }
  );
  const memberships = usePagesOrInfinite(
    membersParams || {},
    organization?.getMemberships,
    {
      keepPreviousData: membersSafeValues.keepPreviousData,
      infinite: membersSafeValues.infinite,
      enabled: !!membersParams
    },
    {
      type: "members",
      organizationId: organization?.id
    }
  );
  const invitations = usePagesOrInfinite(
    {
      ...invitationsParams
    },
    organization?.getInvitations,
    {
      keepPreviousData: invitationsSafeValues.keepPreviousData,
      infinite: invitationsSafeValues.infinite,
      enabled: !!invitationsParams
    },
    {
      type: "invitations",
      organizationId: organization?.id
    }
  );
  const subscriptions = usePagesOrInfinite(
    {
      ...subscriptionsParams
    },
    organization?.getSubscriptions,
    {
      keepPreviousData: subscriptionsSafeValues.keepPreviousData,
      infinite: subscriptionsSafeValues.infinite,
      enabled: !!subscriptionsParams
    },
    {
      type: "subscriptions",
      organizationId: organization?.id
    }
  );
  if (organization === void 0) {
    return {
      isLoaded: false,
      organization: void 0,
      membership: void 0,
      domains: undefinedPaginatedResource,
      membershipRequests: undefinedPaginatedResource,
      memberships: undefinedPaginatedResource,
      invitations: undefinedPaginatedResource,
      subscriptions: undefinedPaginatedResource
    };
  }
  if (organization === null) {
    return {
      isLoaded: true,
      organization: null,
      membership: null,
      domains: null,
      membershipRequests: null,
      memberships: null,
      invitations: null,
      subscriptions: null
    };
  }
  if (!clerk.loaded && organization) {
    return {
      isLoaded: true,
      organization,
      membership: void 0,
      domains: undefinedPaginatedResource,
      membershipRequests: undefinedPaginatedResource,
      memberships: undefinedPaginatedResource,
      invitations: undefinedPaginatedResource,
      subscriptions: undefinedPaginatedResource
    };
  }
  return {
    isLoaded: clerk.loaded,
    organization,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    membership: getCurrentOrganizationMembership(session.user.organizationMemberships, organization.id),
    // your membership in the current org
    domains,
    membershipRequests,
    memberships,
    invitations,
    subscriptions
  };
}
var undefinedPaginatedResource2 = {
  data: void 0,
  count: void 0,
  error: void 0,
  isLoading: false,
  isFetching: false,
  isError: false,
  page: void 0,
  pageCount: void 0,
  fetchPage: void 0,
  fetchNext: void 0,
  fetchPrevious: void 0,
  hasNextPage: false,
  hasPreviousPage: false,
  revalidate: void 0,
  setData: void 0
};
function useOrganizationList(params) {
  const { userMemberships, userInvitations, userSuggestions } = params || {};
  useAssertWrappedByClerkProvider("useOrganizationList");
  const userMembershipsSafeValues = useWithSafeValues(userMemberships, {
    initialPage: 1,
    pageSize: 10,
    keepPreviousData: false,
    infinite: false
  });
  const userInvitationsSafeValues = useWithSafeValues(userInvitations, {
    initialPage: 1,
    pageSize: 10,
    status: "pending",
    keepPreviousData: false,
    infinite: false
  });
  const userSuggestionsSafeValues = useWithSafeValues(userSuggestions, {
    initialPage: 1,
    pageSize: 10,
    status: "pending",
    keepPreviousData: false,
    infinite: false
  });
  const clerk = useClerkInstanceContext();
  const user = useUserContext();
  clerk.telemetry?.record(eventMethodCalled("useOrganizationList"));
  const userMembershipsParams = typeof userMemberships === "undefined" ? void 0 : {
    initialPage: userMembershipsSafeValues.initialPage,
    pageSize: userMembershipsSafeValues.pageSize
  };
  const userInvitationsParams = typeof userInvitations === "undefined" ? void 0 : {
    initialPage: userInvitationsSafeValues.initialPage,
    pageSize: userInvitationsSafeValues.pageSize,
    status: userInvitationsSafeValues.status
  };
  const userSuggestionsParams = typeof userSuggestions === "undefined" ? void 0 : {
    initialPage: userSuggestionsSafeValues.initialPage,
    pageSize: userSuggestionsSafeValues.pageSize,
    status: userSuggestionsSafeValues.status
  };
  const isClerkLoaded = !!(clerk.loaded && user);
  const memberships = usePagesOrInfinite(
    userMembershipsParams || {},
    user?.getOrganizationMemberships,
    {
      keepPreviousData: userMembershipsSafeValues.keepPreviousData,
      infinite: userMembershipsSafeValues.infinite,
      enabled: !!userMembershipsParams
    },
    {
      type: "userMemberships",
      userId: user?.id
    }
  );
  const invitations = usePagesOrInfinite(
    {
      ...userInvitationsParams
    },
    user?.getOrganizationInvitations,
    {
      keepPreviousData: userInvitationsSafeValues.keepPreviousData,
      infinite: userInvitationsSafeValues.infinite,
      enabled: !!userInvitationsParams
    },
    {
      type: "userInvitations",
      userId: user?.id
    }
  );
  const suggestions = usePagesOrInfinite(
    {
      ...userSuggestionsParams
    },
    user?.getOrganizationSuggestions,
    {
      keepPreviousData: userSuggestionsSafeValues.keepPreviousData,
      infinite: userSuggestionsSafeValues.infinite,
      enabled: !!userSuggestionsParams
    },
    {
      type: "userSuggestions",
      userId: user?.id
    }
  );
  if (!isClerkLoaded) {
    return {
      isLoaded: false,
      createOrganization: void 0,
      setActive: void 0,
      userMemberships: undefinedPaginatedResource2,
      userInvitations: undefinedPaginatedResource2,
      userSuggestions: undefinedPaginatedResource2
    };
  }
  return {
    isLoaded: isClerkLoaded,
    setActive: clerk.setActive,
    createOrganization: clerk.createOrganization,
    userMemberships: memberships,
    userInvitations: invitations,
    userSuggestions: suggestions
  };
}
var useSafeLayoutEffect = typeof window !== "undefined" ? import_react9.default.useLayoutEffect : import_react9.default.useEffect;
var hookName = `useSession`;
var useSession = (options = {}) => {
  useAssertWrappedByClerkProvider(hookName);
  const session = useSessionContext();
  const clerk = useClerkInstanceContext();
  clerk.telemetry?.record(eventMethodCalled(hookName));
  if (session === void 0) {
    return { isLoaded: false, isSignedIn: void 0, session: void 0 };
  }
  const pendingAsSignedOut = session?.status === "pending" && (options.treatPendingAsSignedOut ?? clerk.__internal_getOption("treatPendingAsSignedOut"));
  const isSignedOut = session === null || pendingAsSignedOut;
  if (isSignedOut) {
    return { isLoaded: true, isSignedIn: false, session: null };
  }
  return { isLoaded: true, isSignedIn: true, session };
};
var hookName2 = "useSessionList";
var useSessionList = () => {
  useAssertWrappedByClerkProvider(hookName2);
  const isomorphicClerk = useClerkInstanceContext();
  const client = useClientContext();
  const clerk = useClerkInstanceContext();
  clerk.telemetry?.record(eventMethodCalled(hookName2));
  if (!client) {
    return { isLoaded: false, sessions: void 0, setActive: void 0 };
  }
  return {
    isLoaded: true,
    sessions: client.sessions,
    setActive: isomorphicClerk.setActive
  };
};
var hookName3 = "useUser";
function useUser() {
  useAssertWrappedByClerkProvider(hookName3);
  const user = useUserContext();
  const clerk = useClerkInstanceContext();
  clerk.telemetry?.record(eventMethodCalled(hookName3));
  if (user === void 0) {
    return { isLoaded: false, isSignedIn: void 0, user: void 0 };
  }
  if (user === null) {
    return { isLoaded: true, isSignedIn: false, user: null };
  }
  return { isLoaded: true, isSignedIn: true, user };
}
var useClerk = () => {
  useAssertWrappedByClerkProvider("useClerk");
  return useClerkInstanceContext();
};
var isDeeplyEqual = dequal;
var CLERK_API_REVERIFICATION_ERROR_CODE = "session_reverification_required";
async function resolveResult(result) {
  try {
    const r = await result;
    if (r instanceof Response) {
      return r.json();
    }
    return r;
  } catch (e) {
    if (isClerkAPIResponseError(e) && e.errors.find(({ code }) => code === CLERK_API_REVERIFICATION_ERROR_CODE)) {
      return reverificationError();
    }
    throw e;
  }
}
function createReverificationHandler(params) {
  function assertReverification(fetcher) {
    return async (...args) => {
      let result = await resolveResult(fetcher(...args));
      if (isReverificationHint(result)) {
        const resolvers = createDeferredPromise();
        const isValidMetadata = validateReverificationConfig(result.clerk_error.metadata?.reverification);
        const level = isValidMetadata ? isValidMetadata().level : void 0;
        const cancel = () => {
          resolvers.reject(
            new ClerkRuntimeError("User cancelled attempted verification", {
              code: "reverification_cancelled"
            })
          );
        };
        const complete = () => {
          resolvers.resolve(true);
        };
        if (params.onNeedsReverification === void 0) {
          params.openUIComponent?.({
            level,
            afterVerification: complete,
            afterVerificationCancelled: cancel
          });
        } else {
          params.onNeedsReverification({
            cancel,
            complete,
            level
          });
        }
        await resolvers.promise;
        result = await resolveResult(fetcher(...args));
      }
      return result;
    };
  }
  return assertReverification;
}
var useReverification = (fetcher, options) => {
  const { __internal_openReverification, telemetry } = useClerk();
  const fetcherRef = (0, import_react11.useRef)(fetcher);
  const optionsRef = (0, import_react11.useRef)(options);
  telemetry?.record(
    eventMethodCalled("useReverification", {
      onNeedsReverification: Boolean(options?.onNeedsReverification)
    })
  );
  useSafeLayoutEffect(() => {
    fetcherRef.current = fetcher;
    optionsRef.current = options;
  });
  return (0, import_react11.useCallback)(
    (...args) => {
      const handler = createReverificationHandler({
        openUIComponent: __internal_openReverification,
        telemetry,
        ...optionsRef.current
      })(fetcherRef.current);
      return handler(...args);
    },
    [__internal_openReverification, telemetry]
  );
};
function createCommerceHook({
  hookName: hookName4,
  resourceType,
  useFetcher
}) {
  return function useCommerceHook(params) {
    const { for: _for, ...paginationParams } = params;
    useAssertWrappedByClerkProvider(hookName4);
    const fetchFn = useFetcher(_for);
    const safeValues = useWithSafeValues(paginationParams, {
      initialPage: 1,
      pageSize: 10,
      keepPreviousData: false,
      infinite: false,
      __experimental_mode: void 0
    });
    const clerk = useClerkInstanceContext();
    const user = useUserContext();
    const { organization } = useOrganizationContext();
    clerk.telemetry?.record(eventMethodCalled(hookName4));
    const hookParams = typeof paginationParams === "undefined" ? void 0 : {
      initialPage: safeValues.initialPage,
      pageSize: safeValues.pageSize,
      ..._for === "organization" ? { orgId: organization?.id } : {}
    };
    const isClerkLoaded = !!(clerk.loaded && user);
    const isEnabled = !!hookParams && isClerkLoaded;
    const result = usePagesOrInfinite(
      hookParams || {},
      fetchFn,
      {
        keepPreviousData: safeValues.keepPreviousData,
        infinite: safeValues.infinite,
        enabled: isEnabled,
        __experimental_mode: safeValues.__experimental_mode
      },
      {
        type: resourceType,
        userId: user?.id,
        ..._for === "organization" ? { orgId: organization?.id } : {}
      }
    );
    return result;
  };
}
var useStatements = createCommerceHook({
  hookName: "useStatements",
  resourceType: "commerce-statements",
  useFetcher: () => {
    const clerk = useClerkInstanceContext();
    return clerk.billing.getStatements;
  }
});
var usePaymentAttempts = createCommerceHook({
  hookName: "usePaymentAttempts",
  resourceType: "commerce-payment-attempts",
  useFetcher: () => {
    const clerk = useClerkInstanceContext();
    return clerk.billing.getPaymentAttempts;
  }
});
var usePaymentMethods = createCommerceHook({
  hookName: "usePaymentMethods",
  resourceType: "commerce-payment-methods",
  useFetcher: (resource) => {
    const { organization } = useOrganizationContext();
    const user = useUserContext();
    if (resource === "organization") {
      return organization?.getPaymentSources;
    }
    return user?.getPaymentSources;
  }
});
var useSubscriptionItems = createCommerceHook({
  hookName: "useSubscriptionItems",
  resourceType: "commerce-subscription-items",
  useFetcher: () => {
    const clerk = useClerkInstanceContext();
    return clerk.billing.getSubscriptions;
  }
});
var usePrevious = (value) => {
  const ref = (0, import_react15.useRef)(value);
  (0, import_react15.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
var useAttachEvent = (element, event, cb) => {
  const cbDefined = !!cb;
  const cbRef = (0, import_react15.useRef)(cb);
  (0, import_react15.useEffect)(() => {
    cbRef.current = cb;
  }, [cb]);
  (0, import_react15.useEffect)(() => {
    if (!cbDefined || !element) {
      return () => {
      };
    }
    const decoratedCb = (...args) => {
      if (cbRef.current) {
        cbRef.current(...args);
      }
    };
    element.on(event, decoratedCb);
    return () => {
      element.off(event, decoratedCb);
    };
  }, [cbDefined, event, element, cbRef]);
};
var ElementsContext = import_react14.default.createContext(null);
ElementsContext.displayName = "ElementsContext";
var parseElementsContext = (ctx, useCase) => {
  if (!ctx) {
    throw new Error(
      `Could not find Elements context; You need to wrap the part of your app that ${useCase} in an <Elements> provider.`
    );
  }
  return ctx;
};
var Elements = ({
  stripe: rawStripeProp,
  options,
  children
}) => {
  const parsed = import_react14.default.useMemo(() => parseStripeProp(rawStripeProp), [rawStripeProp]);
  const [ctx, setContext] = import_react14.default.useState(() => ({
    stripe: parsed.tag === "sync" ? parsed.stripe : null,
    elements: parsed.tag === "sync" ? parsed.stripe.elements(options) : null
  }));
  import_react14.default.useEffect(() => {
    let isMounted = true;
    const safeSetContext = (stripe) => {
      setContext((ctx2) => {
        if (ctx2.stripe) return ctx2;
        return {
          stripe,
          elements: stripe.elements(options)
        };
      });
    };
    if (parsed.tag === "async" && !ctx.stripe) {
      parsed.stripePromise.then((stripe) => {
        if (stripe && isMounted) {
          safeSetContext(stripe);
        }
      });
    } else if (parsed.tag === "sync" && !ctx.stripe) {
      safeSetContext(parsed.stripe);
    }
    return () => {
      isMounted = false;
    };
  }, [parsed, ctx, options]);
  const prevStripe = usePrevious(rawStripeProp);
  import_react14.default.useEffect(() => {
    if (prevStripe !== null && prevStripe !== rawStripeProp) {
      console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.");
    }
  }, [prevStripe, rawStripeProp]);
  const prevOptions = usePrevious(options);
  import_react14.default.useEffect(() => {
    if (!ctx.elements) {
      return;
    }
    const updates = extractAllowedOptionsUpdates(options, prevOptions, ["clientSecret", "fonts"]);
    if (updates) {
      ctx.elements.update(updates);
    }
  }, [options, prevOptions, ctx.elements]);
  return import_react14.default.createElement(ElementsContext.Provider, { value: ctx }, children);
};
var useElementsContextWithUseCase = (useCaseMessage) => {
  const ctx = import_react14.default.useContext(ElementsContext);
  return parseElementsContext(ctx, useCaseMessage);
};
var useElements = () => {
  const { elements } = useElementsContextWithUseCase("calls useElements()");
  return elements;
};
var INVALID_STRIPE_ERROR = "Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.";
var validateStripe = (maybeStripe, errorMsg = INVALID_STRIPE_ERROR) => {
  if (maybeStripe === null || isStripe(maybeStripe)) {
    return maybeStripe;
  }
  throw new Error(errorMsg);
};
var parseStripeProp = (raw, errorMsg = INVALID_STRIPE_ERROR) => {
  if (isPromise(raw)) {
    return {
      tag: "async",
      stripePromise: Promise.resolve(raw).then((result) => validateStripe(result, errorMsg))
    };
  }
  const stripe = validateStripe(raw, errorMsg);
  if (stripe === null) {
    return { tag: "empty" };
  }
  return { tag: "sync", stripe };
};
var isUnknownObject = (raw) => {
  return raw !== null && typeof raw === "object";
};
var isPromise = (raw) => {
  return isUnknownObject(raw) && typeof raw.then === "function";
};
var isStripe = (raw) => {
  return isUnknownObject(raw) && typeof raw.elements === "function" && typeof raw.createToken === "function" && typeof raw.createPaymentMethod === "function" && typeof raw.confirmCardPayment === "function";
};
var extractAllowedOptionsUpdates = (options, prevOptions, immutableKeys) => {
  if (!isUnknownObject(options)) {
    return null;
  }
  return Object.keys(options).reduce((newOptions, key) => {
    const isUpdated = !isUnknownObject(prevOptions) || !isEqual(options[key], prevOptions[key]);
    if (immutableKeys.includes(key)) {
      if (isUpdated) {
        console.warn(`Unsupported prop change: options.${key} is not a mutable property.`);
      }
      return newOptions;
    }
    if (!isUpdated) {
      return newOptions;
    }
    return { ...newOptions || {}, [key]: options[key] };
  }, null);
};
var PLAIN_OBJECT_STR = "[object Object]";
var isEqual = (left, right) => {
  if (!isUnknownObject(left) || !isUnknownObject(right)) {
    return left === right;
  }
  const leftArray = Array.isArray(left);
  const rightArray = Array.isArray(right);
  if (leftArray !== rightArray) return false;
  const leftPlainObject = Object.prototype.toString.call(left) === PLAIN_OBJECT_STR;
  const rightPlainObject = Object.prototype.toString.call(right) === PLAIN_OBJECT_STR;
  if (leftPlainObject !== rightPlainObject) return false;
  if (!leftPlainObject && !leftArray) return left === right;
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) return false;
  const keySet = {};
  for (let i = 0; i < leftKeys.length; i += 1) {
    keySet[leftKeys[i]] = true;
  }
  for (let i = 0; i < rightKeys.length; i += 1) {
    keySet[rightKeys[i]] = true;
  }
  const allKeys = Object.keys(keySet);
  if (allKeys.length !== leftKeys.length) {
    return false;
  }
  const l = left;
  const r = right;
  const pred = (key) => {
    return isEqual(l[key], r[key]);
  };
  return allKeys.every(pred);
};
var useStripe = () => {
  const { stripe } = useElementsOrCheckoutSdkContextWithUseCase("calls useStripe()");
  return stripe;
};
var useElementsOrCheckoutSdkContextWithUseCase = (useCaseString) => {
  const elementsContext = import_react14.default.useContext(ElementsContext);
  return parseElementsContext(elementsContext, useCaseString);
};
var capitalized = (str) => str.charAt(0).toUpperCase() + str.slice(1);
var createElementComponent = (type, isServer2) => {
  const displayName = `${capitalized(type)}Element`;
  const ClientElement = ({
    id,
    className,
    fallback,
    options = {},
    onBlur,
    onFocus,
    onReady,
    onChange,
    onEscape,
    onClick,
    onLoadError,
    onLoaderStart,
    onNetworksChange,
    onConfirm,
    onCancel,
    onShippingAddressChange,
    onShippingRateChange
  }) => {
    const ctx = useElementsOrCheckoutSdkContextWithUseCase(`mounts <${displayName}>`);
    const elements = "elements" in ctx ? ctx.elements : null;
    const [element, setElement] = import_react14.default.useState(null);
    const elementRef = import_react14.default.useRef(null);
    const domNode = import_react14.default.useRef(null);
    const [isReady, setReady] = (0, import_react14.useState)(false);
    useAttachEvent(element, "blur", onBlur);
    useAttachEvent(element, "focus", onFocus);
    useAttachEvent(element, "escape", onEscape);
    useAttachEvent(element, "click", onClick);
    useAttachEvent(element, "loaderror", onLoadError);
    useAttachEvent(element, "loaderstart", onLoaderStart);
    useAttachEvent(element, "networkschange", onNetworksChange);
    useAttachEvent(element, "confirm", onConfirm);
    useAttachEvent(element, "cancel", onCancel);
    useAttachEvent(element, "shippingaddresschange", onShippingAddressChange);
    useAttachEvent(element, "shippingratechange", onShippingRateChange);
    useAttachEvent(element, "change", onChange);
    let readyCallback;
    if (onReady) {
      readyCallback = () => {
        setReady(true);
        onReady(element);
      };
    }
    useAttachEvent(element, "ready", readyCallback);
    import_react14.default.useLayoutEffect(() => {
      if (elementRef.current === null && domNode.current !== null && elements) {
        let newElement = null;
        if (elements) {
          newElement = elements.create(type, options);
        }
        elementRef.current = newElement;
        setElement(newElement);
        if (newElement) {
          newElement.mount(domNode.current);
        }
      }
    }, [elements, options]);
    const prevOptions = usePrevious(options);
    import_react14.default.useEffect(() => {
      if (!elementRef.current) {
        return;
      }
      const updates = extractAllowedOptionsUpdates(options, prevOptions, ["paymentRequest"]);
      if (updates && "update" in elementRef.current) {
        elementRef.current.update(updates);
      }
    }, [options, prevOptions]);
    import_react14.default.useLayoutEffect(() => {
      return () => {
        if (elementRef.current && typeof elementRef.current.destroy === "function") {
          try {
            elementRef.current.destroy();
            elementRef.current = null;
          } catch {
          }
        }
      };
    }, []);
    return import_react14.default.createElement(import_react14.default.Fragment, null, !isReady && fallback, import_react14.default.createElement(
      "div",
      {
        id,
        className,
        ref: domNode
      }
    ));
  };
  const ServerElement = (props) => {
    useElementsOrCheckoutSdkContextWithUseCase(`mounts <${displayName}>`);
    const { id, className } = props;
    return import_react14.default.createElement(
      "div",
      {
        id,
        className
      }
    );
  };
  const Element = isServer2 ? ServerElement : ClientElement;
  Element.displayName = displayName;
  Element.__elementType = type;
  return Element;
};
var isServer = typeof window === "undefined";
var PaymentElement = createElementComponent("payment", isServer);
var [StripeLibsContext, useStripeLibsContext] = createContextAndHook("StripeLibsContext");
var StripeLibsProvider = ({ children }) => {
  const clerk = useClerk();
  const { data: stripeClerkLibs } = useSWR(
    "clerk-stripe-sdk",
    async () => {
      const loadStripe = await clerk.__internal_loadStripeJs();
      return { loadStripe };
    },
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: Infinity
    }
  );
  return import_react13.default.createElement(
    StripeLibsContext.Provider,
    {
      value: {
        value: stripeClerkLibs || null
      }
    },
    children
  );
};
var useInternalEnvironment = () => {
  const clerk = useClerk();
  return clerk.__unstable__environment;
};
var usePaymentSourceUtils = (forResource) => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const resource = forResource === "org" ? organization : user;
  const stripeClerkLibs = useStripeLibsContext();
  const { data: initializedPaymentSource, trigger: initializePaymentSource } = useSWRMutation(
    {
      key: "commerce-payment-source-initialize",
      resourceId: resource?.id
    },
    () => resource?.initializePaymentSource({
      gateway: "stripe"
    })
  );
  const environment = useInternalEnvironment();
  (0, import_react12.useEffect)(() => {
    initializePaymentSource().catch(() => {
    });
  }, []);
  const externalGatewayId = initializedPaymentSource?.externalGatewayId;
  const externalClientSecret = initializedPaymentSource?.externalClientSecret;
  const paymentMethodOrder = initializedPaymentSource?.paymentMethodOrder;
  const stripePublishableKey = environment?.commerceSettings.billing.stripePublishableKey;
  const { data: stripe } = useSWR(
    stripeClerkLibs && externalGatewayId && stripePublishableKey ? { key: "stripe-sdk", externalGatewayId, stripePublishableKey } : null,
    ({ stripePublishableKey: stripePublishableKey2, externalGatewayId: externalGatewayId2 }) => {
      return stripeClerkLibs?.loadStripe(stripePublishableKey2, {
        stripeAccount: externalGatewayId2
      });
    },
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 1e3 * 60
      // 1 minute
    }
  );
  return {
    stripe,
    initializePaymentSource,
    externalClientSecret,
    paymentMethodOrder
  };
};
var [PaymentElementContext, usePaymentElementContext] = createContextAndHook("PaymentElementContext");
var [StripeUtilsContext, useStripeUtilsContext] = createContextAndHook("StripeUtilsContext");
var ValidateStripeUtils = ({ children }) => {
  const stripe = useStripe();
  const elements = useElements();
  return import_react13.default.createElement(StripeUtilsContext.Provider, { value: { value: { stripe, elements } } }, children);
};
var DummyStripeUtils = ({ children }) => {
  return import_react13.default.createElement(StripeUtilsContext.Provider, { value: { value: {} } }, children);
};
var PropsProvider = ({ children, ...props }) => {
  const utils = usePaymentSourceUtils(props.for);
  const [isPaymentElementReady, setIsPaymentElementReady] = (0, import_react12.useState)(false);
  return import_react13.default.createElement(
    PaymentElementContext.Provider,
    {
      value: {
        value: {
          ...props,
          ...utils,
          setIsPaymentElementReady,
          isPaymentElementReady
        }
      }
    },
    children
  );
};
var PaymentElementProvider = ({ children, ...props }) => {
  return import_react13.default.createElement(StripeLibsProvider, null, import_react13.default.createElement(PropsProvider, { ...props }, import_react13.default.createElement(PaymentElementInternalRoot, null, children)));
};
var PaymentElementInternalRoot = (props) => {
  const { stripe, externalClientSecret, stripeAppearance } = usePaymentElementContext();
  if (stripe && externalClientSecret) {
    return import_react13.default.createElement(
      Elements,
      {
        key: externalClientSecret,
        stripe,
        options: {
          clientSecret: externalClientSecret,
          appearance: {
            variables: stripeAppearance
          }
        }
      },
      import_react13.default.createElement(ValidateStripeUtils, null, props.children)
    );
  }
  return import_react13.default.createElement(DummyStripeUtils, null, props.children);
};
var PaymentElement2 = ({ fallback }) => {
  const {
    setIsPaymentElementReady,
    paymentMethodOrder,
    checkout,
    stripe,
    externalClientSecret,
    paymentDescription,
    for: subscriberType
  } = usePaymentElementContext();
  const environment = useInternalEnvironment();
  const applePay = (0, import_react12.useMemo)(() => {
    if (!checkout) {
      return void 0;
    }
    return {
      recurringPaymentRequest: {
        paymentDescription: paymentDescription || "",
        managementURL: subscriberType === "org" ? environment?.displayConfig.organizationProfileUrl || "" : environment?.displayConfig.userProfileUrl || "",
        regularBilling: {
          amount: checkout.totals.totalDueNow?.amount || checkout.totals.grandTotal.amount,
          label: checkout.plan.name,
          recurringPaymentIntervalUnit: checkout.planPeriod === "annual" ? "year" : "month"
        }
      }
    };
  }, [checkout, paymentDescription, subscriberType, environment]);
  const options = (0, import_react12.useMemo)(() => {
    return {
      layout: {
        type: "tabs",
        defaultCollapsed: false
      },
      paymentMethodOrder,
      applePay
    };
  }, [applePay, paymentMethodOrder]);
  const onReady = (0, import_react12.useCallback)(() => {
    setIsPaymentElementReady(true);
  }, [setIsPaymentElementReady]);
  if (!stripe || !externalClientSecret) {
    return import_react13.default.createElement(import_react13.default.Fragment, null, fallback);
  }
  return import_react13.default.createElement(
    PaymentElement,
    {
      fallback,
      onReady,
      options
    }
  );
};
var throwLibsMissingError = () => {
  throw new Error(
    "Clerk: Unable to submit, Stripe libraries are not yet loaded. Be sure to check `isFormReady` before calling `submit`."
  );
};
var usePaymentElement = () => {
  const { isPaymentElementReady, initializePaymentSource } = usePaymentElementContext();
  const { stripe, elements } = useStripeUtilsContext();
  const { externalClientSecret } = usePaymentElementContext();
  const submit = (0, import_react12.useCallback)(async () => {
    if (!stripe || !elements) {
      return throwLibsMissingError();
    }
    const { setupIntent, error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.href
      },
      redirect: "if_required"
    });
    if (error) {
      return {
        data: null,
        error: {
          gateway: "stripe",
          error: {
            code: error.code,
            message: error.message,
            type: error.type
          }
        }
      };
    }
    return {
      data: { gateway: "stripe", paymentToken: setupIntent.payment_method },
      error: null
    };
  }, [stripe, elements]);
  const reset = (0, import_react12.useCallback)(async () => {
    if (!stripe || !elements) {
      return throwLibsMissingError();
    }
    await initializePaymentSource();
  }, [stripe, elements, initializePaymentSource]);
  const isProviderReady = Boolean(stripe && externalClientSecret);
  if (!isProviderReady) {
    return {
      submit: throwLibsMissingError,
      reset: throwLibsMissingError,
      isFormReady: false,
      provider: void 0,
      isProviderReady: false
    };
  }
  return {
    submit,
    reset,
    isFormReady: isPaymentElementReady,
    provider: {
      name: "stripe"
    },
    isProviderReady
  };
};

// node_modules/@clerk/clerk-react/dist/chunk-NM4PUPXM.mjs
var import_react20 = __toESM(require_react(), 1);

// node_modules/@clerk/shared/dist/chunk-7HPDNZ3R.mjs
var isDevelopmentEnvironment = () => {
  try {
    return true;
  } catch {
  }
  return false;
};
var isTestEnvironment = () => {
  try {
    return false;
  } catch {
  }
  return false;
};
var isProductionEnvironment = () => {
  try {
    return false;
  } catch {
  }
  return false;
};

// node_modules/@clerk/shared/dist/chunk-UEY4AZIP.mjs
var displayedWarnings = /* @__PURE__ */ new Set();
var deprecated = (fnName, warning, key) => {
  const hideWarning = isTestEnvironment() || isProductionEnvironment();
  const messageId = key ?? fnName;
  if (displayedWarnings.has(messageId) || hideWarning) {
    return;
  }
  displayedWarnings.add(messageId);
  console.warn(
    `Clerk - DEPRECATION WARNING: "${fnName}" is deprecated and will be removed in the next major release.
${warning}`
  );
};

// node_modules/@clerk/clerk-react/dist/chunk-NM4PUPXM.mjs
var import_react24 = __toESM(require_react(), 1);
var import_react26 = __toESM(require_react(), 1);
var errorThrower = buildErrorThrower({ packageName: "@clerk/clerk-react" });
function setErrorThrowerOptions(options) {
  errorThrower.setMessages(options).setPackageName(options);
}
var [AuthContext, useAuthContext] = createContextAndHook("AuthContext");
var IsomorphicClerkContext = ClerkInstanceContext;
var useIsomorphicClerkContext = useClerkInstanceContext;
var multipleClerkProvidersError = "You've added multiple <ClerkProvider> components in your React component tree. Wrap your components in a single <ClerkProvider>.";
var multipleChildrenInButtonComponent = (name) => `You've passed multiple children components to <${name}/>. You can only pass a single child component or text.`;
var invalidStateError = "Invalid state. Feel free to submit a bug or reach out to support here: https://clerk.com/support";
var unsupportedNonBrowserDomainOrProxyUrlFunction = "Unsupported usage of isSatellite, domain or proxyUrl. The usage of isSatellite, domain or proxyUrl as function is not supported in non-browser environments.";
var userProfilePageRenderedError = "<UserProfile.Page /> component needs to be a direct child of `<UserProfile />` or `<UserButton />`.";
var userProfileLinkRenderedError = "<UserProfile.Link /> component needs to be a direct child of `<UserProfile />` or `<UserButton />`.";
var organizationProfilePageRenderedError = "<OrganizationProfile.Page /> component needs to be a direct child of `<OrganizationProfile />` or `<OrganizationSwitcher />`.";
var organizationProfileLinkRenderedError = "<OrganizationProfile.Link /> component needs to be a direct child of `<OrganizationProfile />` or `<OrganizationSwitcher />`.";
var customPagesIgnoredComponent = (componentName) => `<${componentName} /> can only accept <${componentName}.Page /> and <${componentName}.Link /> as its children. Any other provided component will be ignored. Additionally, please ensure that the component is rendered in a client component.`;
var customPageWrongProps = (componentName) => `Missing props. <${componentName}.Page /> component requires the following props: url, label, labelIcon, alongside with children to be rendered inside the page.`;
var customLinkWrongProps = (componentName) => `Missing props. <${componentName}.Link /> component requires the following props: url, label and labelIcon.`;
var userButtonIgnoredComponent = `<UserButton /> can only accept <UserButton.UserProfilePage />, <UserButton.UserProfileLink /> and <UserButton.MenuItems /> as its children. Any other provided component will be ignored. Additionally, please ensure that the component is rendered in a client component.`;
var customMenuItemsIgnoredComponent = "<UserButton.MenuItems /> component can only accept <UserButton.Action /> and <UserButton.Link /> as its children. Any other provided component will be ignored. Additionally, please ensure that the component is rendered in a client component.";
var userButtonMenuItemsRenderedError = "<UserButton.MenuItems /> component needs to be a direct child of `<UserButton />`.";
var userButtonMenuActionRenderedError = "<UserButton.Action /> component needs to be a direct child of `<UserButton.MenuItems />`.";
var userButtonMenuLinkRenderedError = "<UserButton.Link /> component needs to be a direct child of `<UserButton.MenuItems />`.";
var userButtonMenuItemLinkWrongProps = "Missing props. <UserButton.Link /> component requires the following props: href, label and labelIcon.";
var userButtonMenuItemsActionWrongsProps = "Missing props. <UserButton.Action /> component requires the following props: label.";
var useAssertWrappedByClerkProvider2 = (source) => {
  useAssertWrappedByClerkProvider(() => {
    errorThrower.throwMissingClerkProviderError({ source });
  });
};
var clerkLoaded = (isomorphicClerk) => {
  return new Promise((resolve) => {
    const handler = (status) => {
      if (["ready", "degraded"].includes(status)) {
        resolve();
        isomorphicClerk.off("status", handler);
      }
    };
    isomorphicClerk.on("status", handler, { notify: true });
  });
};
var createGetToken = (isomorphicClerk) => {
  return async (options) => {
    await clerkLoaded(isomorphicClerk);
    if (!isomorphicClerk.session) {
      return null;
    }
    return isomorphicClerk.session.getToken(options);
  };
};
var createSignOut = (isomorphicClerk) => {
  return async (...args) => {
    await clerkLoaded(isomorphicClerk);
    return isomorphicClerk.signOut(...args);
  };
};
var useAuth = (initialAuthStateOrOptions = {}) => {
  var _a, _b;
  useAssertWrappedByClerkProvider2("useAuth");
  const { treatPendingAsSignedOut, ...rest } = initialAuthStateOrOptions != null ? initialAuthStateOrOptions : {};
  const initialAuthState = rest;
  const authContextFromHook = useAuthContext();
  let authContext = authContextFromHook;
  if (authContext.sessionId === void 0 && authContext.userId === void 0) {
    authContext = initialAuthState != null ? initialAuthState : {};
  }
  const isomorphicClerk = useIsomorphicClerkContext();
  const getToken = (0, import_react16.useCallback)(createGetToken(isomorphicClerk), [isomorphicClerk]);
  const signOut = (0, import_react16.useCallback)(createSignOut(isomorphicClerk), [isomorphicClerk]);
  (_a = isomorphicClerk.telemetry) == null ? void 0 : _a.record(eventMethodCalled("useAuth", { treatPendingAsSignedOut }));
  return useDerivedAuth(
    {
      ...authContext,
      getToken,
      signOut
    },
    {
      treatPendingAsSignedOut: treatPendingAsSignedOut != null ? treatPendingAsSignedOut : (_b = isomorphicClerk.__internal_getOption) == null ? void 0 : _b.call(isomorphicClerk, "treatPendingAsSignedOut")
    }
  );
};
function useDerivedAuth(authObject, { treatPendingAsSignedOut = true } = {}) {
  const { userId, orgId, orgRole, has: has2, signOut, getToken, orgPermissions, factorVerificationAge, sessionClaims } = authObject != null ? authObject : {};
  const derivedHas = (0, import_react16.useCallback)(
    (params) => {
      if (has2) {
        return has2(params);
      }
      return createCheckAuthorization({
        userId,
        orgId,
        orgRole,
        orgPermissions,
        factorVerificationAge,
        features: (sessionClaims == null ? void 0 : sessionClaims.fea) || "",
        plans: (sessionClaims == null ? void 0 : sessionClaims.pla) || ""
      })(params);
    },
    [has2, userId, orgId, orgRole, orgPermissions, factorVerificationAge]
  );
  const payload = resolveAuthState({
    authObject: {
      ...authObject,
      getToken,
      signOut,
      has: derivedHas
    },
    options: {
      treatPendingAsSignedOut
    }
  });
  if (!payload) {
    return errorThrower.throw(invalidStateError);
  }
  return payload;
}
function useEmailLink(resource) {
  const { startEmailLinkFlow, cancelEmailLinkFlow } = import_react20.default.useMemo(() => resource.createEmailLinkFlow(), [resource]);
  import_react20.default.useEffect(() => {
    return cancelEmailLinkFlow;
  }, []);
  return {
    startEmailLinkFlow,
    cancelEmailLinkFlow
  };
}
var useSignIn = () => {
  var _a;
  useAssertWrappedByClerkProvider2("useSignIn");
  const isomorphicClerk = useIsomorphicClerkContext();
  const client = useClientContext();
  (_a = isomorphicClerk.telemetry) == null ? void 0 : _a.record(eventMethodCalled("useSignIn"));
  if (!client) {
    return { isLoaded: false, signIn: void 0, setActive: void 0 };
  }
  return {
    isLoaded: true,
    signIn: client.signIn,
    setActive: isomorphicClerk.setActive
  };
};
var useSignUp = () => {
  var _a;
  useAssertWrappedByClerkProvider2("useSignUp");
  const isomorphicClerk = useIsomorphicClerkContext();
  const client = useClientContext();
  (_a = isomorphicClerk.telemetry) == null ? void 0 : _a.record(eventMethodCalled("useSignUp"));
  if (!client) {
    return { isLoaded: false, signUp: void 0, setActive: void 0 };
  }
  return {
    isLoaded: true,
    signUp: client.signUp,
    setActive: isomorphicClerk.setActive
  };
};
var withClerk = (Component, displayNameOrOptions) => {
  const passedDisplayedName = typeof displayNameOrOptions === "string" ? displayNameOrOptions : displayNameOrOptions == null ? void 0 : displayNameOrOptions.component;
  const displayName = passedDisplayedName || Component.displayName || Component.name || "Component";
  Component.displayName = displayName;
  const options = typeof displayNameOrOptions === "string" ? void 0 : displayNameOrOptions;
  const HOC = (props) => {
    useAssertWrappedByClerkProvider2(displayName || "withClerk");
    const clerk = useIsomorphicClerkContext();
    if (!clerk.loaded && !(options == null ? void 0 : options.renderWhileLoading)) {
      return null;
    }
    return import_react26.default.createElement(
      Component,
      {
        ...props,
        component: displayName,
        clerk
      }
    );
  };
  HOC.displayName = `withClerk(${displayName})`;
  return HOC;
};
var SignedIn = ({ children, treatPendingAsSignedOut }) => {
  useAssertWrappedByClerkProvider2("SignedIn");
  const { userId } = useAuth({ treatPendingAsSignedOut });
  if (userId) {
    return children;
  }
  return null;
};
var SignedOut = ({ children, treatPendingAsSignedOut }) => {
  useAssertWrappedByClerkProvider2("SignedOut");
  const { userId } = useAuth({ treatPendingAsSignedOut });
  if (userId === null) {
    return children;
  }
  return null;
};
var ClerkLoaded = ({ children }) => {
  useAssertWrappedByClerkProvider2("ClerkLoaded");
  const isomorphicClerk = useIsomorphicClerkContext();
  if (!isomorphicClerk.loaded) {
    return null;
  }
  return children;
};
var ClerkLoading = ({ children }) => {
  useAssertWrappedByClerkProvider2("ClerkLoading");
  const isomorphicClerk = useIsomorphicClerkContext();
  if (isomorphicClerk.status !== "loading") {
    return null;
  }
  return children;
};
var ClerkFailed = ({ children }) => {
  useAssertWrappedByClerkProvider2("ClerkFailed");
  const isomorphicClerk = useIsomorphicClerkContext();
  if (isomorphicClerk.status !== "error") {
    return null;
  }
  return children;
};
var ClerkDegraded = ({ children }) => {
  useAssertWrappedByClerkProvider2("ClerkDegraded");
  const isomorphicClerk = useIsomorphicClerkContext();
  if (isomorphicClerk.status !== "degraded") {
    return null;
  }
  return children;
};
var Protect = ({ children, fallback, treatPendingAsSignedOut, ...restAuthorizedParams }) => {
  useAssertWrappedByClerkProvider2("Protect");
  const { isLoaded, has: has2, userId } = useAuth({ treatPendingAsSignedOut });
  if (!isLoaded) {
    return null;
  }
  const unauthorized = fallback != null ? fallback : null;
  const authorized = children;
  if (!userId) {
    return unauthorized;
  }
  if (typeof restAuthorizedParams.condition === "function") {
    if (restAuthorizedParams.condition(has2)) {
      return authorized;
    }
    return unauthorized;
  }
  if (restAuthorizedParams.role || restAuthorizedParams.permission || restAuthorizedParams.feature || restAuthorizedParams.plan) {
    if (has2(restAuthorizedParams)) {
      return authorized;
    }
    return unauthorized;
  }
  return authorized;
};
var RedirectToSignIn = withClerk(({ clerk, ...props }) => {
  const { client, session } = clerk;
  const hasSignedInSessions = client.signedInSessions ? client.signedInSessions.length > 0 : (
    // Compat for clerk-js<5.54.0 (which was released with the `signedInSessions` property)
    client.activeSessions && client.activeSessions.length > 0
  );
  import_react24.default.useEffect(() => {
    if (session === null && hasSignedInSessions) {
      void clerk.redirectToAfterSignOut();
    } else {
      void clerk.redirectToSignIn(props);
    }
  }, []);
  return null;
}, "RedirectToSignIn");
var RedirectToSignUp = withClerk(({ clerk, ...props }) => {
  import_react24.default.useEffect(() => {
    void clerk.redirectToSignUp(props);
  }, []);
  return null;
}, "RedirectToSignUp");
var RedirectToUserProfile = withClerk(({ clerk }) => {
  import_react24.default.useEffect(() => {
    deprecated("RedirectToUserProfile", "Use the `redirectToUserProfile()` method instead.");
    void clerk.redirectToUserProfile();
  }, []);
  return null;
}, "RedirectToUserProfile");
var RedirectToOrganizationProfile = withClerk(({ clerk }) => {
  import_react24.default.useEffect(() => {
    deprecated("RedirectToOrganizationProfile", "Use the `redirectToOrganizationProfile()` method instead.");
    void clerk.redirectToOrganizationProfile();
  }, []);
  return null;
}, "RedirectToOrganizationProfile");
var RedirectToCreateOrganization = withClerk(({ clerk }) => {
  import_react24.default.useEffect(() => {
    deprecated("RedirectToCreateOrganization", "Use the `redirectToCreateOrganization()` method instead.");
    void clerk.redirectToCreateOrganization();
  }, []);
  return null;
}, "RedirectToCreateOrganization");
var AuthenticateWithRedirectCallback = withClerk(
  ({ clerk, ...handleRedirectCallbackParams }) => {
    import_react24.default.useEffect(() => {
      void clerk.handleRedirectCallback(handleRedirectCallbackParams);
    }, []);
    return null;
  },
  "AuthenticateWithRedirectCallback"
);

// node_modules/@clerk/clerk-react/dist/chunk-OANWQR3B.mjs
var __typeError2 = (msg) => {
  throw TypeError(msg);
};
var __accessCheck2 = (obj, member, msg) => member.has(obj) || __typeError2("Cannot " + msg);
var __privateGet2 = (obj, member, getter) => (__accessCheck2(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd2 = (obj, member, value) => member.has(obj) ? __typeError2("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet2 = (obj, member, value, setter) => (__accessCheck2(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod2 = (obj, member, method) => (__accessCheck2(obj, member, "access private method"), method);

// node_modules/@clerk/shared/dist/chunk-J647DFGM.mjs
var versionSelector = (clerkJSVersion, packageVersion = "5.71.0") => {
  if (clerkJSVersion) {
    return clerkJSVersion;
  }
  const prereleaseTag = getPrereleaseTag(packageVersion);
  if (prereleaseTag) {
    if (prereleaseTag === "snapshot") {
      return "5.71.0";
    }
    return prereleaseTag;
  }
  return getMajorVersion(packageVersion);
};
var getPrereleaseTag = (packageVersion) => packageVersion.trim().replace(/^v/, "").match(/-(.+?)(\.|$)/)?.[1];
var getMajorVersion = (packageVersion) => packageVersion.trim().replace(/^v/, "").split(".")[0];

// node_modules/@clerk/shared/dist/chunk-6NDGN2IU.mjs
function isValidProxyUrl(key) {
  if (!key) {
    return true;
  }
  return isHttpOrHttps(key) || isProxyUrlRelative(key);
}
function isHttpOrHttps(key) {
  return /^http(s)?:\/\//.test(key || "");
}
function isProxyUrlRelative(key) {
  return key.startsWith("/");
}
function proxyUrlToAbsoluteURL(url) {
  if (!url) {
    return "";
  }
  return isProxyUrlRelative(url) ? new URL(url, window.location.origin).toString() : url;
}

// node_modules/@clerk/shared/dist/chunk-IFTVZ2LQ.mjs
function addClerkPrefix(str) {
  if (!str) {
    return "";
  }
  let regex;
  if (str.match(/^(clerk\.)+\w*$/)) {
    regex = /(clerk\.)*(?=clerk\.)/;
  } else if (str.match(/\.clerk.accounts/)) {
    return str;
  } else {
    regex = /^(clerk\.)*/gi;
  }
  const stripped = str.replace(regex, "");
  return `clerk.${stripped}`;
}

// node_modules/@clerk/shared/dist/chunk-N2V3PKFE.mjs
var defaultOptions = {
  initialDelay: 125,
  maxDelayBetweenRetries: 0,
  factor: 2,
  shouldRetry: (_, iteration) => iteration < 5,
  retryImmediately: false,
  jitter: true
};
var RETRY_IMMEDIATELY_DELAY = 100;
var sleep = async (ms) => new Promise((s) => setTimeout(s, ms));
var applyJitter = (delay, jitter) => {
  return jitter ? delay * (1 + Math.random()) : delay;
};
var createExponentialDelayAsyncFn = (opts) => {
  let timesCalled = 0;
  const calculateDelayInMs = () => {
    const constant = opts.initialDelay;
    const base = opts.factor;
    let delay = constant * Math.pow(base, timesCalled);
    delay = applyJitter(delay, opts.jitter);
    return Math.min(opts.maxDelayBetweenRetries || delay, delay);
  };
  return async () => {
    await sleep(calculateDelayInMs());
    timesCalled++;
  };
};
var retry = async (callback, options = {}) => {
  let iterations = 0;
  const { shouldRetry, initialDelay, maxDelayBetweenRetries, factor, retryImmediately, jitter } = {
    ...defaultOptions,
    ...options
  };
  const delay = createExponentialDelayAsyncFn({
    initialDelay,
    maxDelayBetweenRetries,
    factor,
    jitter
  });
  while (true) {
    try {
      return await callback();
    } catch (e) {
      iterations++;
      if (!shouldRetry(e, iterations)) {
        throw e;
      }
      if (retryImmediately && iterations === 1) {
        await sleep(applyJitter(RETRY_IMMEDIATELY_DELAY, jitter));
      } else {
        await delay();
      }
    }
  }
};

// node_modules/@clerk/shared/dist/chunk-E3R3SJ7O.mjs
var NO_DOCUMENT_ERROR = "loadScript cannot be called when document does not exist";
var NO_SRC_ERROR = "loadScript cannot be called without a src";
async function loadScript(src = "", opts) {
  const { async, defer, beforeLoad, crossOrigin, nonce } = opts || {};
  const load = () => {
    return new Promise((resolve, reject) => {
      if (!src) {
        reject(new Error(NO_SRC_ERROR));
      }
      if (!document || !document.body) {
        reject(NO_DOCUMENT_ERROR);
      }
      const script = document.createElement("script");
      if (crossOrigin) script.setAttribute("crossorigin", crossOrigin);
      script.async = async || false;
      script.defer = defer || false;
      script.addEventListener("load", () => {
        script.remove();
        resolve(script);
      });
      script.addEventListener("error", () => {
        script.remove();
        reject();
      });
      script.src = src;
      script.nonce = nonce;
      beforeLoad?.(script);
      document.body.appendChild(script);
    });
  };
  return retry(load, { shouldRetry: (_, iterations) => iterations <= 5 });
}

// node_modules/@clerk/shared/dist/chunk-GN6NFPYL.mjs
var FAILED_TO_LOAD_ERROR = "Clerk: Failed to load Clerk";
var { isDevOrStagingUrl } = createDevOrStagingUrlCache();
var errorThrower2 = buildErrorThrower({ packageName: "@clerk/shared" });
function setClerkJsLoadingErrorPackageName(packageName) {
  errorThrower2.setPackageName({ packageName });
}
var loadClerkJsScript = async (opts) => {
  const existingScript = document.querySelector("script[data-clerk-js-script]");
  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener("load", () => {
        resolve(existingScript);
      });
      existingScript.addEventListener("error", () => {
        reject(FAILED_TO_LOAD_ERROR);
      });
    });
  }
  if (!opts?.publishableKey) {
    errorThrower2.throwMissingPublishableKeyError();
    return;
  }
  return loadScript(clerkJsScriptUrl(opts), {
    async: true,
    crossOrigin: "anonymous",
    nonce: opts.nonce,
    beforeLoad: applyClerkJsScriptAttributes(opts)
  }).catch(() => {
    throw new Error(FAILED_TO_LOAD_ERROR);
  });
};
var clerkJsScriptUrl = (opts) => {
  const { clerkJSUrl, clerkJSVariant, clerkJSVersion, proxyUrl, domain, publishableKey } = opts;
  if (clerkJSUrl) {
    return clerkJSUrl;
  }
  let scriptHost = "";
  if (!!proxyUrl && isValidProxyUrl(proxyUrl)) {
    scriptHost = proxyUrlToAbsoluteURL(proxyUrl).replace(/http(s)?:\/\//, "");
  } else if (domain && !isDevOrStagingUrl(parsePublishableKey(publishableKey)?.frontendApi || "")) {
    scriptHost = addClerkPrefix(domain);
  } else {
    scriptHost = parsePublishableKey(publishableKey)?.frontendApi || "";
  }
  const variant = clerkJSVariant ? `${clerkJSVariant.replace(/\.+$/, "")}.` : "";
  const version = versionSelector(clerkJSVersion);
  return `https://${scriptHost}/npm/@clerk/clerk-js@${version}/dist/clerk.${variant}browser.js`;
};
var buildClerkJsScriptAttributes = (options) => {
  const obj = {};
  if (options.publishableKey) {
    obj["data-clerk-publishable-key"] = options.publishableKey;
  }
  if (options.proxyUrl) {
    obj["data-clerk-proxy-url"] = options.proxyUrl;
  }
  if (options.domain) {
    obj["data-clerk-domain"] = options.domain;
  }
  if (options.nonce) {
    obj.nonce = options.nonce;
  }
  return obj;
};
var applyClerkJsScriptAttributes = (options) => (script) => {
  const attributes = buildClerkJsScriptAttributes(options);
  for (const attribute in attributes) {
    script.setAttribute(attribute, attributes[attribute]);
  }
};

// node_modules/@clerk/shared/dist/chunk-ARQUL5DC.mjs
var logErrorInDevMode = (message) => {
  if (isDevelopmentEnvironment()) {
    console.error(`Clerk: ${message}`);
  }
};

// node_modules/@clerk/shared/dist/chunk-O32JQBM6.mjs
function handleValueOrFn(value, url, defaultValue) {
  if (typeof value === "function") {
    return value(url);
  }
  if (typeof value !== "undefined") {
    return value;
  }
  if (typeof defaultValue !== "undefined") {
    return defaultValue;
  }
  return void 0;
}

// node_modules/@clerk/clerk-react/dist/index.mjs
var import_react27 = __toESM(require_react(), 1);
var import_react28 = __toESM(require_react(), 1);
var import_react29 = __toESM(require_react(), 1);
var import_react30 = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);
var import_react31 = __toESM(require_react(), 1);
var import_react32 = __toESM(require_react(), 1);
var import_react33 = __toESM(require_react(), 1);
var import_react34 = __toESM(require_react(), 1);

// node_modules/@clerk/shared/dist/chunk-CFXQSUF6.mjs
var without = (obj, ...props) => {
  const copy = { ...obj };
  for (const prop of props) {
    delete copy[prop];
  }
  return copy;
};

// node_modules/@clerk/clerk-react/dist/index.mjs
var import_react36 = __toESM(require_react(), 1);
var import_react37 = __toESM(require_react(), 1);
var import_react38 = __toESM(require_react(), 1);
var import_react39 = __toESM(require_react(), 1);
var import_react40 = __toESM(require_react(), 1);
var import_react41 = __toESM(require_react(), 1);

// node_modules/@clerk/shared/dist/chunk-ZIXJBK4O.mjs
var deriveState = (clerkOperational, state, initialState) => {
  if (!clerkOperational && initialState) {
    return deriveFromSsrInitialState(initialState);
  }
  return deriveFromClientSideState(state);
};
var deriveFromSsrInitialState = (initialState) => {
  const userId = initialState.userId;
  const user = initialState.user;
  const sessionId = initialState.sessionId;
  const sessionStatus = initialState.sessionStatus;
  const sessionClaims = initialState.sessionClaims;
  const session = initialState.session;
  const organization = initialState.organization;
  const orgId = initialState.orgId;
  const orgRole = initialState.orgRole;
  const orgPermissions = initialState.orgPermissions;
  const orgSlug = initialState.orgSlug;
  const actor = initialState.actor;
  const factorVerificationAge = initialState.factorVerificationAge;
  return {
    userId,
    user,
    sessionId,
    session,
    sessionStatus,
    sessionClaims,
    organization,
    orgId,
    orgRole,
    orgPermissions,
    orgSlug,
    actor,
    factorVerificationAge
  };
};
var deriveFromClientSideState = (state) => {
  const userId = state.user ? state.user.id : state.user;
  const user = state.user;
  const sessionId = state.session ? state.session.id : state.session;
  const session = state.session;
  const sessionStatus = state.session?.status;
  const sessionClaims = state.session ? state.session.lastActiveToken?.jwt?.claims : null;
  const factorVerificationAge = state.session ? state.session.factorVerificationAge : null;
  const actor = session?.actor;
  const organization = state.organization;
  const orgId = state.organization ? state.organization.id : state.organization;
  const orgSlug = organization?.slug;
  const membership = organization ? user?.organizationMemberships?.find((om) => om.organization.id === orgId) : organization;
  const orgPermissions = membership ? membership.permissions : membership;
  const orgRole = membership ? membership.role : membership;
  return {
    userId,
    user,
    sessionId,
    session,
    sessionStatus,
    sessionClaims,
    organization,
    orgId,
    orgRole,
    orgSlug,
    orgPermissions,
    actor,
    factorVerificationAge
  };
};

// node_modules/@clerk/clerk-react/dist/index.mjs
var import_react43 = __toESM(require_react(), 1);

// node_modules/@clerk/shared/dist/chunk-JKSAJ6AV.mjs
function inBrowser() {
  return typeof window !== "undefined";
}
var botAgents = [
  "bot",
  "spider",
  "crawl",
  "APIs-Google",
  "AdsBot",
  "Googlebot",
  "mediapartners",
  "Google Favicon",
  "FeedFetcher",
  "Google-Read-Aloud",
  "DuplexWeb-Google",
  "googleweblight",
  "bing",
  "yandex",
  "baidu",
  "duckduck",
  "yahoo",
  "ecosia",
  "ia_archiver",
  "facebook",
  "instagram",
  "pinterest",
  "reddit",
  "slack",
  "twitter",
  "whatsapp",
  "youtube",
  "semrush"
];
var botAgentRegex = new RegExp(botAgents.join("|"), "i");

// node_modules/@clerk/shared/dist/chunk-GVKBGR5N.mjs
var _on = (eventToHandlersMap, latestPayloadMap, event, handler, opts) => {
  const { notify } = opts || {};
  let handlers = eventToHandlersMap.get(event);
  if (!handlers) {
    handlers = [];
    eventToHandlersMap.set(event, handlers);
  }
  handlers.push(handler);
  if (notify && latestPayloadMap.has(event)) {
    handler(latestPayloadMap.get(event));
  }
};
var _dispatch = (eventToHandlersMap, event, payload) => (eventToHandlersMap.get(event) || []).map((h) => h(payload));
var _off = (eventToHandlersMap, event, handler) => {
  const handlers = eventToHandlersMap.get(event);
  if (handlers) {
    if (handler) {
      handlers.splice(handlers.indexOf(handler) >>> 0, 1);
    } else {
      eventToHandlersMap.set(event, []);
    }
  }
};
var createEventBus = () => {
  const eventToHandlersMap = /* @__PURE__ */ new Map();
  const latestPayloadMap = /* @__PURE__ */ new Map();
  const eventToPredispatchHandlersMap = /* @__PURE__ */ new Map();
  const emit = (event, payload) => {
    latestPayloadMap.set(event, payload);
    _dispatch(eventToPredispatchHandlersMap, event, payload);
    _dispatch(eventToHandlersMap, event, payload);
  };
  return {
    // Subscribe to an event
    on: (...args) => _on(eventToHandlersMap, latestPayloadMap, ...args),
    // Subscribe to an event with priority
    // Registered handlers with `prioritizedOn` will be called before handlers registered with `on`
    prioritizedOn: (...args) => _on(eventToPredispatchHandlersMap, latestPayloadMap, ...args),
    // Dispatch an event
    emit,
    // Unsubscribe from an event
    off: (...args) => _off(eventToHandlersMap, ...args),
    // Unsubscribe from an event with priority
    // Unsubscribes handlers only registered with `prioritizedOn`
    prioritizedOff: (...args) => _off(eventToPredispatchHandlersMap, ...args),
    // Internal utilities
    internal: {
      retrieveListeners: (event) => eventToHandlersMap.get(event) || []
    }
  };
};

// node_modules/@clerk/shared/dist/clerkEventBus.mjs
var clerkEvents = {
  Status: "status"
};
var createClerkEventBus = () => {
  return createEventBus();
};

// node_modules/@clerk/clerk-react/dist/index.mjs
if (typeof window !== "undefined" && !window.global) {
  window.global = typeof global === "undefined" ? window : global;
}
var assertSingleChild = (children) => (name) => {
  try {
    return import_react28.default.Children.only(children);
  } catch {
    return errorThrower.throw(multipleChildrenInButtonComponent(name));
  }
};
var normalizeWithDefaultValue = (children, defaultText) => {
  if (!children) {
    children = defaultText;
  }
  if (typeof children === "string") {
    children = import_react28.default.createElement("button", null, children);
  }
  return children;
};
var safeExecute = (cb) => (...args) => {
  if (cb && typeof cb === "function") {
    return cb(...args);
  }
};
function isConstructor(f) {
  return typeof f === "function";
}
var counts = /* @__PURE__ */ new Map();
function useMaxAllowedInstancesGuard(name, error, maxCount = 1) {
  import_react29.default.useEffect(() => {
    const count = counts.get(name) || 0;
    if (count == maxCount) {
      return errorThrower.throw(error);
    }
    counts.set(name, count + 1);
    return () => {
      counts.set(name, (counts.get(name) || 1) - 1);
    };
  }, []);
}
function withMaxAllowedInstancesGuard(WrappedComponent, name, error) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || name || "Component";
  const Hoc = (props) => {
    useMaxAllowedInstancesGuard(name, error);
    return import_react29.default.createElement(WrappedComponent, { ...props });
  };
  Hoc.displayName = `withMaxAllowedInstancesGuard(${displayName})`;
  return Hoc;
}
var useCustomElementPortal = (elements) => {
  const initialState = Array(elements.length).fill(null);
  const [nodes, setNodes] = (0, import_react30.useState)(initialState);
  return elements.map((el, index) => ({
    id: el.id,
    mount: (node) => setNodes((prevState) => prevState.map((n, i) => i === index ? node : n)),
    unmount: () => setNodes((prevState) => prevState.map((n, i) => i === index ? null : n)),
    portal: () => import_react30.default.createElement(import_react30.default.Fragment, null, nodes[index] ? (0, import_react_dom.createPortal)(el.component, nodes[index]) : null)
  }));
};
var isThatComponent = (v, component) => {
  return !!v && import_react32.default.isValidElement(v) && (v == null ? void 0 : v.type) === component;
};
var useUserProfileCustomPages = (children, options) => {
  const reorderItemsLabels = ["account", "security"];
  return useCustomPages(
    {
      children,
      reorderItemsLabels,
      LinkComponent: UserProfileLink,
      PageComponent: UserProfilePage,
      MenuItemsComponent: MenuItems,
      componentName: "UserProfile"
    },
    options
  );
};
var useOrganizationProfileCustomPages = (children, options) => {
  const reorderItemsLabels = ["general", "members"];
  return useCustomPages(
    {
      children,
      reorderItemsLabels,
      LinkComponent: OrganizationProfileLink,
      PageComponent: OrganizationProfilePage,
      componentName: "OrganizationProfile"
    },
    options
  );
};
var useSanitizedChildren = (children) => {
  const sanitizedChildren = [];
  const excludedComponents = [
    OrganizationProfileLink,
    OrganizationProfilePage,
    MenuItems,
    UserProfilePage,
    UserProfileLink
  ];
  import_react31.default.Children.forEach(children, (child) => {
    if (!excludedComponents.some((component) => isThatComponent(child, component))) {
      sanitizedChildren.push(child);
    }
  });
  return sanitizedChildren;
};
var useCustomPages = (params, options) => {
  const { children, LinkComponent, PageComponent, MenuItemsComponent, reorderItemsLabels, componentName } = params;
  const { allowForAnyChildren = false } = options || {};
  const validChildren = [];
  import_react31.default.Children.forEach(children, (child) => {
    if (!isThatComponent(child, PageComponent) && !isThatComponent(child, LinkComponent) && !isThatComponent(child, MenuItemsComponent)) {
      if (child && !allowForAnyChildren) {
        logErrorInDevMode(customPagesIgnoredComponent(componentName));
      }
      return;
    }
    const { props } = child;
    const { children: children2, label, url, labelIcon } = props;
    if (isThatComponent(child, PageComponent)) {
      if (isReorderItem(props, reorderItemsLabels)) {
        validChildren.push({ label });
      } else if (isCustomPage(props)) {
        validChildren.push({ label, labelIcon, children: children2, url });
      } else {
        logErrorInDevMode(customPageWrongProps(componentName));
        return;
      }
    }
    if (isThatComponent(child, LinkComponent)) {
      if (isExternalLink(props)) {
        validChildren.push({ label, labelIcon, url });
      } else {
        logErrorInDevMode(customLinkWrongProps(componentName));
        return;
      }
    }
  });
  const customPageContents = [];
  const customPageLabelIcons = [];
  const customLinkLabelIcons = [];
  validChildren.forEach((cp, index) => {
    if (isCustomPage(cp)) {
      customPageContents.push({ component: cp.children, id: index });
      customPageLabelIcons.push({ component: cp.labelIcon, id: index });
      return;
    }
    if (isExternalLink(cp)) {
      customLinkLabelIcons.push({ component: cp.labelIcon, id: index });
    }
  });
  const customPageContentsPortals = useCustomElementPortal(customPageContents);
  const customPageLabelIconsPortals = useCustomElementPortal(customPageLabelIcons);
  const customLinkLabelIconsPortals = useCustomElementPortal(customLinkLabelIcons);
  const customPages = [];
  const customPagesPortals = [];
  validChildren.forEach((cp, index) => {
    if (isReorderItem(cp, reorderItemsLabels)) {
      customPages.push({ label: cp.label });
      return;
    }
    if (isCustomPage(cp)) {
      const {
        portal: contentPortal,
        mount,
        unmount
      } = customPageContentsPortals.find((p) => p.id === index);
      const {
        portal: labelPortal,
        mount: mountIcon,
        unmount: unmountIcon
      } = customPageLabelIconsPortals.find((p) => p.id === index);
      customPages.push({ label: cp.label, url: cp.url, mount, unmount, mountIcon, unmountIcon });
      customPagesPortals.push(contentPortal);
      customPagesPortals.push(labelPortal);
      return;
    }
    if (isExternalLink(cp)) {
      const {
        portal: labelPortal,
        mount: mountIcon,
        unmount: unmountIcon
      } = customLinkLabelIconsPortals.find((p) => p.id === index);
      customPages.push({ label: cp.label, url: cp.url, mountIcon, unmountIcon });
      customPagesPortals.push(labelPortal);
      return;
    }
  });
  return { customPages, customPagesPortals };
};
var isReorderItem = (childProps, validItems) => {
  const { children, label, url, labelIcon } = childProps;
  return !children && !url && !labelIcon && validItems.some((v) => v === label);
};
var isCustomPage = (childProps) => {
  const { children, label, url, labelIcon } = childProps;
  return !!children && !!url && !!labelIcon && !!label;
};
var isExternalLink = (childProps) => {
  const { children, label, url, labelIcon } = childProps;
  return !children && !!url && !!labelIcon && !!label;
};
var useUserButtonCustomMenuItems = (children) => {
  const reorderItemsLabels = ["manageAccount", "signOut"];
  return useCustomMenuItems({
    children,
    reorderItemsLabels,
    MenuItemsComponent: MenuItems,
    MenuActionComponent: MenuAction,
    MenuLinkComponent: MenuLink,
    UserProfileLinkComponent: UserProfileLink,
    UserProfilePageComponent: UserProfilePage
  });
};
var useCustomMenuItems = ({
  children,
  MenuItemsComponent,
  MenuActionComponent,
  MenuLinkComponent,
  UserProfileLinkComponent,
  UserProfilePageComponent,
  reorderItemsLabels
}) => {
  const validChildren = [];
  const customMenuItems = [];
  const customMenuItemsPortals = [];
  import_react33.default.Children.forEach(children, (child) => {
    if (!isThatComponent(child, MenuItemsComponent) && !isThatComponent(child, UserProfileLinkComponent) && !isThatComponent(child, UserProfilePageComponent)) {
      if (child) {
        logErrorInDevMode(userButtonIgnoredComponent);
      }
      return;
    }
    if (isThatComponent(child, UserProfileLinkComponent) || isThatComponent(child, UserProfilePageComponent)) {
      return;
    }
    const { props } = child;
    import_react33.default.Children.forEach(props.children, (child2) => {
      if (!isThatComponent(child2, MenuActionComponent) && !isThatComponent(child2, MenuLinkComponent)) {
        if (child2) {
          logErrorInDevMode(customMenuItemsIgnoredComponent);
        }
        return;
      }
      const { props: props2 } = child2;
      const { label, labelIcon, href, onClick, open } = props2;
      if (isThatComponent(child2, MenuActionComponent)) {
        if (isReorderItem2(props2, reorderItemsLabels)) {
          validChildren.push({ label });
        } else if (isCustomMenuItem(props2)) {
          const baseItem = {
            label,
            labelIcon
          };
          if (onClick !== void 0) {
            validChildren.push({
              ...baseItem,
              onClick
            });
          } else if (open !== void 0) {
            validChildren.push({
              ...baseItem,
              open: open.startsWith("/") ? open : `/${open}`
            });
          } else {
            logErrorInDevMode("Custom menu item must have either onClick or open property");
            return;
          }
        } else {
          logErrorInDevMode(userButtonMenuItemsActionWrongsProps);
          return;
        }
      }
      if (isThatComponent(child2, MenuLinkComponent)) {
        if (isExternalLink2(props2)) {
          validChildren.push({ label, labelIcon, href });
        } else {
          logErrorInDevMode(userButtonMenuItemLinkWrongProps);
          return;
        }
      }
    });
  });
  const customMenuItemLabelIcons = [];
  const customLinkLabelIcons = [];
  validChildren.forEach((mi, index) => {
    if (isCustomMenuItem(mi)) {
      customMenuItemLabelIcons.push({ component: mi.labelIcon, id: index });
    }
    if (isExternalLink2(mi)) {
      customLinkLabelIcons.push({ component: mi.labelIcon, id: index });
    }
  });
  const customMenuItemLabelIconsPortals = useCustomElementPortal(customMenuItemLabelIcons);
  const customLinkLabelIconsPortals = useCustomElementPortal(customLinkLabelIcons);
  validChildren.forEach((mi, index) => {
    if (isReorderItem2(mi, reorderItemsLabels)) {
      customMenuItems.push({
        label: mi.label
      });
    }
    if (isCustomMenuItem(mi)) {
      const {
        portal: iconPortal,
        mount: mountIcon,
        unmount: unmountIcon
      } = customMenuItemLabelIconsPortals.find((p) => p.id === index);
      const menuItem = {
        label: mi.label,
        mountIcon,
        unmountIcon
      };
      if ("onClick" in mi) {
        menuItem.onClick = mi.onClick;
      } else if ("open" in mi) {
        menuItem.open = mi.open;
      }
      customMenuItems.push(menuItem);
      customMenuItemsPortals.push(iconPortal);
    }
    if (isExternalLink2(mi)) {
      const {
        portal: iconPortal,
        mount: mountIcon,
        unmount: unmountIcon
      } = customLinkLabelIconsPortals.find((p) => p.id === index);
      customMenuItems.push({
        label: mi.label,
        href: mi.href,
        mountIcon,
        unmountIcon
      });
      customMenuItemsPortals.push(iconPortal);
    }
  });
  return { customMenuItems, customMenuItemsPortals };
};
var isReorderItem2 = (childProps, validItems) => {
  const { children, label, onClick, labelIcon } = childProps;
  return !children && !onClick && !labelIcon && validItems.some((v) => v === label);
};
var isCustomMenuItem = (childProps) => {
  const { label, labelIcon, onClick, open } = childProps;
  return !!labelIcon && !!label && (typeof onClick === "function" || typeof open === "string");
};
var isExternalLink2 = (childProps) => {
  const { label, href, labelIcon } = childProps;
  return !!href && !!labelIcon && !!label;
};
function waitForElementChildren(options) {
  const { root = document == null ? void 0 : document.body, selector, timeout = 0 } = options;
  return new Promise((resolve, reject) => {
    if (!root) {
      reject(new Error("No root element provided"));
      return;
    }
    let elementToWatch = root;
    if (selector) {
      elementToWatch = root == null ? void 0 : root.querySelector(selector);
    }
    const isElementAlreadyPresent = (elementToWatch == null ? void 0 : elementToWatch.childElementCount) && elementToWatch.childElementCount > 0;
    if (isElementAlreadyPresent) {
      resolve();
      return;
    }
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation2 of mutationsList) {
        if (mutation2.type === "childList") {
          if (!elementToWatch && selector) {
            elementToWatch = root == null ? void 0 : root.querySelector(selector);
          }
          if ((elementToWatch == null ? void 0 : elementToWatch.childElementCount) && elementToWatch.childElementCount > 0) {
            observer.disconnect();
            resolve();
            return;
          }
        }
      }
    });
    observer.observe(root, { childList: true, subtree: true });
    if (timeout > 0) {
      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Timeout waiting for element children`));
      }, timeout);
    }
  });
}
function useWaitForComponentMount(component) {
  const watcherRef = (0, import_react34.useRef)();
  const [status, setStatus] = (0, import_react34.useState)("rendering");
  (0, import_react34.useEffect)(() => {
    if (!component) {
      throw new Error("Clerk: no component name provided, unable to detect mount.");
    }
    if (typeof window !== "undefined" && !watcherRef.current) {
      watcherRef.current = waitForElementChildren({ selector: `[data-clerk-component="${component}"]` }).then(() => {
        setStatus("rendered");
      }).catch(() => {
        setStatus("error");
      });
    }
  }, [component]);
  return status;
}
var isMountProps = (props) => {
  return "mount" in props;
};
var isOpenProps = (props) => {
  return "open" in props;
};
var stripMenuItemIconHandlers = (menuItems) => {
  return menuItems == null ? void 0 : menuItems.map(({ mountIcon, unmountIcon, ...rest }) => rest);
};
var ClerkHostRenderer = class extends import_react36.default.PureComponent {
  constructor() {
    super(...arguments);
    this.rootRef = import_react36.default.createRef();
  }
  componentDidUpdate(_prevProps) {
    var _a, _b, _c, _d;
    if (!isMountProps(_prevProps) || !isMountProps(this.props)) {
      return;
    }
    const prevProps = without(_prevProps.props, "customPages", "customMenuItems", "children");
    const newProps = without(this.props.props, "customPages", "customMenuItems", "children");
    const customPagesChanged = ((_a = prevProps.customPages) == null ? void 0 : _a.length) !== ((_b = newProps.customPages) == null ? void 0 : _b.length);
    const customMenuItemsChanged = ((_c = prevProps.customMenuItems) == null ? void 0 : _c.length) !== ((_d = newProps.customMenuItems) == null ? void 0 : _d.length);
    const prevMenuItemsWithoutHandlers = stripMenuItemIconHandlers(_prevProps.props.customMenuItems);
    const newMenuItemsWithoutHandlers = stripMenuItemIconHandlers(this.props.props.customMenuItems);
    if (!isDeeplyEqual(prevProps, newProps) || !isDeeplyEqual(prevMenuItemsWithoutHandlers, newMenuItemsWithoutHandlers) || customPagesChanged || customMenuItemsChanged) {
      if (this.rootRef.current) {
        this.props.updateProps({ node: this.rootRef.current, props: this.props.props });
      }
    }
  }
  componentDidMount() {
    if (this.rootRef.current) {
      if (isMountProps(this.props)) {
        this.props.mount(this.rootRef.current, this.props.props);
      }
      if (isOpenProps(this.props)) {
        this.props.open(this.props.props);
      }
    }
  }
  componentWillUnmount() {
    if (this.rootRef.current) {
      if (isMountProps(this.props)) {
        this.props.unmount(this.rootRef.current);
      }
      if (isOpenProps(this.props)) {
        this.props.close();
      }
    }
  }
  render() {
    const { hideRootHtmlElement = false } = this.props;
    const rootAttributes = {
      ref: this.rootRef,
      ...this.props.rootProps,
      ...this.props.component && { "data-clerk-component": this.props.component }
    };
    return import_react36.default.createElement(import_react36.default.Fragment, null, !hideRootHtmlElement && import_react36.default.createElement("div", { ...rootAttributes }), this.props.children);
  }
};
var CustomPortalsRenderer = (props) => {
  var _a, _b;
  return import_react27.default.createElement(import_react27.default.Fragment, null, (_a = props == null ? void 0 : props.customPagesPortals) == null ? void 0 : _a.map((portal, index) => (0, import_react27.createElement)(portal, { key: index })), (_b = props == null ? void 0 : props.customMenuItemsPortals) == null ? void 0 : _b.map((portal, index) => (0, import_react27.createElement)(portal, { key: index })));
};
var SignIn = withClerk(
  ({ clerk, component, fallback, ...props }) => {
    const mountingStatus = useWaitForComponentMount(component);
    const shouldShowFallback = mountingStatus === "rendering" || !clerk.loaded;
    const rendererRootProps = {
      ...shouldShowFallback && fallback && { style: { display: "none" } }
    };
    return import_react27.default.createElement(import_react27.default.Fragment, null, shouldShowFallback && fallback, clerk.loaded && import_react27.default.createElement(
      ClerkHostRenderer,
      {
        component,
        mount: clerk.mountSignIn,
        unmount: clerk.unmountSignIn,
        updateProps: clerk.__unstable__updateProps,
        props,
        rootProps: rendererRootProps
      }
    ));
  },
  { component: "SignIn", renderWhileLoading: true }
);
var SignUp = withClerk(
  ({ clerk, component, fallback, ...props }) => {
    const mountingStatus = useWaitForComponentMount(component);
    const shouldShowFallback = mountingStatus === "rendering" || !clerk.loaded;
    const rendererRootProps = {
      ...shouldShowFallback && fallback && { style: { display: "none" } }
    };
    return import_react27.default.createElement(import_react27.default.Fragment, null, shouldShowFallback && fallback, clerk.loaded && import_react27.default.createElement(
      ClerkHostRenderer,
      {
        component,
        mount: clerk.mountSignUp,
        unmount: clerk.unmountSignUp,
        updateProps: clerk.__unstable__updateProps,
        props,
        rootProps: rendererRootProps
      }
    ));
  },
  { component: "SignUp", renderWhileLoading: true }
);
function UserProfilePage({ children }) {
  logErrorInDevMode(userProfilePageRenderedError);
  return import_react27.default.createElement(import_react27.default.Fragment, null, children);
}
function UserProfileLink({ children }) {
  logErrorInDevMode(userProfileLinkRenderedError);
  return import_react27.default.createElement(import_react27.default.Fragment, null, children);
}
var _UserProfile = withClerk(
  ({
    clerk,
    component,
    fallback,
    ...props
  }) => {
    const mountingStatus = useWaitForComponentMount(component);
    const shouldShowFallback = mountingStatus === "rendering" || !clerk.loaded;
    const rendererRootProps = {
      ...shouldShowFallback && fallback && { style: { display: "none" } }
    };
    const { customPages, customPagesPortals } = useUserProfileCustomPages(props.children);
    return import_react27.default.createElement(import_react27.default.Fragment, null, shouldShowFallback && fallback, import_react27.default.createElement(
      ClerkHostRenderer,
      {
        component,
        mount: clerk.mountUserProfile,
        unmount: clerk.unmountUserProfile,
        updateProps: clerk.__unstable__updateProps,
        props: { ...props, customPages },
        rootProps: rendererRootProps
      },
      import_react27.default.createElement(CustomPortalsRenderer, { customPagesPortals })
    ));
  },
  { component: "UserProfile", renderWhileLoading: true }
);
var UserProfile = Object.assign(_UserProfile, {
  Page: UserProfilePage,
  Link: UserProfileLink
});
var UserButtonContext = (0, import_react27.createContext)({
  mount: () => {
  },
  unmount: () => {
  },
  updateProps: () => {
  }
});
var _UserButton = withClerk(
  ({
    clerk,
    component,
    fallback,
    ...props
  }) => {
    const mountingStatus = useWaitForComponentMount(component);
    const shouldShowFallback = mountingStatus === "rendering" || !clerk.loaded;
    const rendererRootProps = {
      ...shouldShowFallback && fallback && { style: { display: "none" } }
    };
    const { customPages, customPagesPortals } = useUserProfileCustomPages(props.children, {
      allowForAnyChildren: !!props.__experimental_asProvider
    });
    const userProfileProps = Object.assign(props.userProfileProps || {}, { customPages });
    const { customMenuItems, customMenuItemsPortals } = useUserButtonCustomMenuItems(props.children);
    const sanitizedChildren = useSanitizedChildren(props.children);
    const passableProps = {
      mount: clerk.mountUserButton,
      unmount: clerk.unmountUserButton,
      updateProps: clerk.__unstable__updateProps,
      props: { ...props, userProfileProps, customMenuItems }
    };
    const portalProps = {
      customPagesPortals,
      customMenuItemsPortals
    };
    return import_react27.default.createElement(UserButtonContext.Provider, { value: passableProps }, shouldShowFallback && fallback, clerk.loaded && import_react27.default.createElement(
      ClerkHostRenderer,
      {
        component,
        ...passableProps,
        hideRootHtmlElement: !!props.__experimental_asProvider,
        rootProps: rendererRootProps
      },
      props.__experimental_asProvider ? sanitizedChildren : null,
      import_react27.default.createElement(CustomPortalsRenderer, { ...portalProps })
    ));
  },
  { component: "UserButton", renderWhileLoading: true }
);
function MenuItems({ children }) {
  logErrorInDevMode(userButtonMenuItemsRenderedError);
  return import_react27.default.createElement(import_react27.default.Fragment, null, children);
}
function MenuAction({ children }) {
  logErrorInDevMode(userButtonMenuActionRenderedError);
  return import_react27.default.createElement(import_react27.default.Fragment, null, children);
}
function MenuLink({ children }) {
  logErrorInDevMode(userButtonMenuLinkRenderedError);
  return import_react27.default.createElement(import_react27.default.Fragment, null, children);
}
function UserButtonOutlet(outletProps) {
  const providerProps = (0, import_react27.useContext)(UserButtonContext);
  const portalProps = {
    ...providerProps,
    props: {
      ...providerProps.props,
      ...outletProps
    }
  };
  return import_react27.default.createElement(ClerkHostRenderer, { ...portalProps });
}
var UserButton = Object.assign(_UserButton, {
  UserProfilePage,
  UserProfileLink,
  MenuItems,
  Action: MenuAction,
  Link: MenuLink,
  __experimental_Outlet: UserButtonOutlet
});
function OrganizationProfilePage({ children }) {
  logErrorInDevMode(organizationProfilePageRenderedError);
  return import_react27.default.createElement(import_react27.default.Fragment, null, children);
}
function OrganizationProfileLink({ children }) {
  logErrorInDevMode(organizationProfileLinkRenderedError);
  return import_react27.default.createElement(import_react27.default.Fragment, null, children);
}
var _OrganizationProfile = withClerk(
  ({
    clerk,
    component,
    fallback,
    ...props
  }) => {
    const mountingStatus = useWaitForComponentMount(component);
    const shouldShowFallback = mountingStatus === "rendering" || !clerk.loaded;
    const rendererRootProps = {
      ...shouldShowFallback && fallback && { style: { display: "none" } }
    };
    const { customPages, customPagesPortals } = useOrganizationProfileCustomPages(props.children);
    return import_react27.default.createElement(import_react27.default.Fragment, null, shouldShowFallback && fallback, clerk.loaded && import_react27.default.createElement(
      ClerkHostRenderer,
      {
        component,
        mount: clerk.mountOrganizationProfile,
        unmount: clerk.unmountOrganizationProfile,
        updateProps: clerk.__unstable__updateProps,
        props: { ...props, customPages },
        rootProps: rendererRootProps
      },
      import_react27.default.createElement(CustomPortalsRenderer, { customPagesPortals })
    ));
  },
  { component: "OrganizationProfile", renderWhileLoading: true }
);
var OrganizationProfile = Object.assign(_OrganizationProfile, {
  Page: OrganizationProfilePage,
  Link: OrganizationProfileLink
});
var CreateOrganization = withClerk(
  ({ clerk, component, fallback, ...props }) => {
    const mountingStatus = useWaitForComponentMount(component);
    const shouldShowFallback = mountingStatus === "rendering" || !clerk.loaded;
    const rendererRootProps = {
      ...shouldShowFallback && fallback && { style: { display: "none" } }
    };
    return import_react27.default.createElement(import_react27.default.Fragment, null, shouldShowFallback && fallback, clerk.loaded && import_react27.default.createElement(
      ClerkHostRenderer,
      {
        component,
        mount: clerk.mountCreateOrganization,
        unmount: clerk.unmountCreateOrganization,
        updateProps: clerk.__unstable__updateProps,
        props,
        rootProps: rendererRootProps
      }
    ));
  },
  { component: "CreateOrganization", renderWhileLoading: true }
);
var OrganizationSwitcherContext = (0, import_react27.createContext)({
  mount: () => {
  },
  unmount: () => {
  },
  updateProps: () => {
  }
});
var _OrganizationSwitcher = withClerk(
  ({
    clerk,
    component,
    fallback,
    ...props
  }) => {
    const mountingStatus = useWaitForComponentMount(component);
    const shouldShowFallback = mountingStatus === "rendering" || !clerk.loaded;
    const rendererRootProps = {
      ...shouldShowFallback && fallback && { style: { display: "none" } }
    };
    const { customPages, customPagesPortals } = useOrganizationProfileCustomPages(props.children, {
      allowForAnyChildren: !!props.__experimental_asProvider
    });
    const organizationProfileProps = Object.assign(props.organizationProfileProps || {}, { customPages });
    const sanitizedChildren = useSanitizedChildren(props.children);
    const passableProps = {
      mount: clerk.mountOrganizationSwitcher,
      unmount: clerk.unmountOrganizationSwitcher,
      updateProps: clerk.__unstable__updateProps,
      props: { ...props, organizationProfileProps },
      rootProps: rendererRootProps,
      component
    };
    clerk.__experimental_prefetchOrganizationSwitcher();
    return import_react27.default.createElement(OrganizationSwitcherContext.Provider, { value: passableProps }, import_react27.default.createElement(import_react27.default.Fragment, null, shouldShowFallback && fallback, clerk.loaded && import_react27.default.createElement(
      ClerkHostRenderer,
      {
        ...passableProps,
        hideRootHtmlElement: !!props.__experimental_asProvider
      },
      props.__experimental_asProvider ? sanitizedChildren : null,
      import_react27.default.createElement(CustomPortalsRenderer, { customPagesPortals })
    )));
  },
  { component: "OrganizationSwitcher", renderWhileLoading: true }
);
function OrganizationSwitcherOutlet(outletProps) {
  const providerProps = (0, import_react27.useContext)(OrganizationSwitcherContext);
  const portalProps = {
    ...providerProps,
    props: {
      ...providerProps.props,
      ...outletProps
    }
  };
  return import_react27.default.createElement(ClerkHostRenderer, { ...portalProps });
}
var OrganizationSwitcher = Object.assign(_OrganizationSwitcher, {
  OrganizationProfilePage,
  OrganizationProfileLink,
  __experimental_Outlet: OrganizationSwitcherOutlet
});
var OrganizationList = withClerk(
  ({ clerk, component, fallback, ...props }) => {
    const mountingStatus = useWaitForComponentMount(component);
    const shouldShowFallback = mountingStatus === "rendering" || !clerk.loaded;
    const rendererRootProps = {
      ...shouldShowFallback && fallback && { style: { display: "none" } }
    };
    return import_react27.default.createElement(import_react27.default.Fragment, null, shouldShowFallback && fallback, clerk.loaded && import_react27.default.createElement(
      ClerkHostRenderer,
      {
        component,
        mount: clerk.mountOrganizationList,
        unmount: clerk.unmountOrganizationList,
        updateProps: clerk.__unstable__updateProps,
        props,
        rootProps: rendererRootProps
      }
    ));
  },
  { component: "OrganizationList", renderWhileLoading: true }
);
var GoogleOneTap = withClerk(
  ({ clerk, component, fallback, ...props }) => {
    const mountingStatus = useWaitForComponentMount(component);
    const shouldShowFallback = mountingStatus === "rendering" || !clerk.loaded;
    const rendererRootProps = {
      ...shouldShowFallback && fallback && { style: { display: "none" } }
    };
    return import_react27.default.createElement(import_react27.default.Fragment, null, shouldShowFallback && fallback, clerk.loaded && import_react27.default.createElement(
      ClerkHostRenderer,
      {
        component,
        open: clerk.openGoogleOneTap,
        close: clerk.closeGoogleOneTap,
        updateProps: clerk.__unstable__updateProps,
        props,
        rootProps: rendererRootProps
      }
    ));
  },
  { component: "GoogleOneTap", renderWhileLoading: true }
);
var Waitlist = withClerk(
  ({ clerk, component, fallback, ...props }) => {
    const mountingStatus = useWaitForComponentMount(component);
    const shouldShowFallback = mountingStatus === "rendering" || !clerk.loaded;
    const rendererRootProps = {
      ...shouldShowFallback && fallback && { style: { display: "none" } }
    };
    return import_react27.default.createElement(import_react27.default.Fragment, null, shouldShowFallback && fallback, clerk.loaded && import_react27.default.createElement(
      ClerkHostRenderer,
      {
        component,
        mount: clerk.mountWaitlist,
        unmount: clerk.unmountWaitlist,
        updateProps: clerk.__unstable__updateProps,
        props,
        rootProps: rendererRootProps
      }
    ));
  },
  { component: "Waitlist", renderWhileLoading: true }
);
var PricingTable = withClerk(
  ({ clerk, component, fallback, ...props }) => {
    const mountingStatus = useWaitForComponentMount(component);
    const shouldShowFallback = mountingStatus === "rendering" || !clerk.loaded;
    const rendererRootProps = {
      ...shouldShowFallback && fallback && { style: { display: "none" } }
    };
    return import_react27.default.createElement(import_react27.default.Fragment, null, shouldShowFallback && fallback, clerk.loaded && import_react27.default.createElement(
      ClerkHostRenderer,
      {
        component,
        mount: clerk.mountPricingTable,
        unmount: clerk.unmountPricingTable,
        updateProps: clerk.__unstable__updateProps,
        props,
        rootProps: rendererRootProps
      }
    ));
  },
  { component: "PricingTable", renderWhileLoading: true }
);
var APIKeys = withClerk(
  ({ clerk, component, fallback, ...props }) => {
    const mountingStatus = useWaitForComponentMount(component);
    const shouldShowFallback = mountingStatus === "rendering" || !clerk.loaded;
    const rendererRootProps = {
      ...shouldShowFallback && fallback && { style: { display: "none" } }
    };
    return import_react27.default.createElement(import_react27.default.Fragment, null, shouldShowFallback && fallback, clerk.loaded && import_react27.default.createElement(
      ClerkHostRenderer,
      {
        component,
        mount: clerk.mountApiKeys,
        unmount: clerk.unmountApiKeys,
        updateProps: clerk.__unstable__updateProps,
        props,
        rootProps: rendererRootProps
      }
    ));
  },
  { component: "ApiKeys", renderWhileLoading: true }
);
var SignInButton = withClerk(
  ({ clerk, children, ...props }) => {
    const {
      signUpFallbackRedirectUrl,
      forceRedirectUrl,
      fallbackRedirectUrl,
      signUpForceRedirectUrl,
      mode,
      initialValues,
      withSignUp,
      oauthFlow,
      ...rest
    } = props;
    children = normalizeWithDefaultValue(children, "Sign in");
    const child = assertSingleChild(children)("SignInButton");
    const clickHandler = () => {
      const opts = {
        forceRedirectUrl,
        fallbackRedirectUrl,
        signUpFallbackRedirectUrl,
        signUpForceRedirectUrl,
        initialValues,
        withSignUp,
        oauthFlow
      };
      if (mode === "modal") {
        return clerk.openSignIn({ ...opts, appearance: props.appearance });
      }
      return clerk.redirectToSignIn({
        ...opts,
        signInFallbackRedirectUrl: fallbackRedirectUrl,
        signInForceRedirectUrl: forceRedirectUrl
      });
    };
    const wrappedChildClickHandler = async (e) => {
      if (child && typeof child === "object" && "props" in child) {
        await safeExecute(child.props.onClick)(e);
      }
      return clickHandler();
    };
    const childProps = { ...rest, onClick: wrappedChildClickHandler };
    return import_react37.default.cloneElement(child, childProps);
  },
  { component: "SignInButton", renderWhileLoading: true }
);
var SignUpButton = withClerk(
  ({ clerk, children, ...props }) => {
    const {
      fallbackRedirectUrl,
      forceRedirectUrl,
      signInFallbackRedirectUrl,
      signInForceRedirectUrl,
      mode,
      unsafeMetadata,
      initialValues,
      oauthFlow,
      ...rest
    } = props;
    children = normalizeWithDefaultValue(children, "Sign up");
    const child = assertSingleChild(children)("SignUpButton");
    const clickHandler = () => {
      const opts = {
        fallbackRedirectUrl,
        forceRedirectUrl,
        signInFallbackRedirectUrl,
        signInForceRedirectUrl,
        unsafeMetadata,
        initialValues,
        oauthFlow
      };
      if (mode === "modal") {
        return clerk.openSignUp({ ...opts, appearance: props.appearance });
      }
      return clerk.redirectToSignUp({
        ...opts,
        signUpFallbackRedirectUrl: fallbackRedirectUrl,
        signUpForceRedirectUrl: forceRedirectUrl
      });
    };
    const wrappedChildClickHandler = async (e) => {
      if (child && typeof child === "object" && "props" in child) {
        await safeExecute(child.props.onClick)(e);
      }
      return clickHandler();
    };
    const childProps = { ...rest, onClick: wrappedChildClickHandler };
    return import_react38.default.cloneElement(child, childProps);
  },
  { component: "SignUpButton", renderWhileLoading: true }
);
var SignOutButton = withClerk(
  ({ clerk, children, ...props }) => {
    const { redirectUrl = "/", signOutOptions, ...rest } = props;
    children = normalizeWithDefaultValue(children, "Sign out");
    const child = assertSingleChild(children)("SignOutButton");
    const clickHandler = () => clerk.signOut({ redirectUrl, ...signOutOptions });
    const wrappedChildClickHandler = async (e) => {
      await safeExecute(child.props.onClick)(e);
      return clickHandler();
    };
    const childProps = { ...rest, onClick: wrappedChildClickHandler };
    return import_react39.default.cloneElement(child, childProps);
  },
  { component: "SignOutButton", renderWhileLoading: true }
);
var SignInWithMetamaskButton = withClerk(
  ({ clerk, children, ...props }) => {
    const { redirectUrl, ...rest } = props;
    children = normalizeWithDefaultValue(children, "Sign in with Metamask");
    const child = assertSingleChild(children)("SignInWithMetamaskButton");
    const clickHandler = async () => {
      async function authenticate() {
        await clerk.authenticateWithMetamask({ redirectUrl: redirectUrl || void 0 });
      }
      void authenticate();
    };
    const wrappedChildClickHandler = async (e) => {
      await safeExecute(child.props.onClick)(e);
      return clickHandler();
    };
    const childProps = { ...rest, onClick: wrappedChildClickHandler };
    return import_react40.default.cloneElement(child, childProps);
  },
  { component: "SignInWithMetamask", renderWhileLoading: true }
);
if (typeof globalThis.__BUILD_DISABLE_RHC__ === "undefined") {
  globalThis.__BUILD_DISABLE_RHC__ = false;
}
var SDK_METADATA = {
  name: "@clerk/clerk-react",
  version: "5.33.0",
  environment: "development"
};
var _status;
var _domain;
var _proxyUrl;
var _publishableKey;
var _eventBus;
var _instance;
var _IsomorphicClerk_instances;
var waitForClerkJS_fn;
var _IsomorphicClerk = class _IsomorphicClerk2 {
  constructor(options) {
    __privateAdd2(this, _IsomorphicClerk_instances);
    this.clerkjs = null;
    this.preopenOneTap = null;
    this.preopenUserVerification = null;
    this.preopenSignIn = null;
    this.preopenCheckout = null;
    this.preopenPlanDetails = null;
    this.preopenSignUp = null;
    this.preopenUserProfile = null;
    this.preopenOrganizationProfile = null;
    this.preopenCreateOrganization = null;
    this.preOpenWaitlist = null;
    this.premountSignInNodes = /* @__PURE__ */ new Map();
    this.premountSignUpNodes = /* @__PURE__ */ new Map();
    this.premountUserProfileNodes = /* @__PURE__ */ new Map();
    this.premountUserButtonNodes = /* @__PURE__ */ new Map();
    this.premountOrganizationProfileNodes = /* @__PURE__ */ new Map();
    this.premountCreateOrganizationNodes = /* @__PURE__ */ new Map();
    this.premountOrganizationSwitcherNodes = /* @__PURE__ */ new Map();
    this.premountOrganizationListNodes = /* @__PURE__ */ new Map();
    this.premountMethodCalls = /* @__PURE__ */ new Map();
    this.premountWaitlistNodes = /* @__PURE__ */ new Map();
    this.premountPricingTableNodes = /* @__PURE__ */ new Map();
    this.premountApiKeysNodes = /* @__PURE__ */ new Map();
    this.premountOAuthConsentNodes = /* @__PURE__ */ new Map();
    this.premountAddListenerCalls = /* @__PURE__ */ new Map();
    this.loadedListeners = [];
    __privateAdd2(this, _status, "loading");
    __privateAdd2(this, _domain);
    __privateAdd2(this, _proxyUrl);
    __privateAdd2(this, _publishableKey);
    __privateAdd2(this, _eventBus, createClerkEventBus());
    this.buildSignInUrl = (opts) => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildSignInUrl(opts)) || "";
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildSignInUrl", callback);
      }
    };
    this.buildSignUpUrl = (opts) => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildSignUpUrl(opts)) || "";
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildSignUpUrl", callback);
      }
    };
    this.buildAfterSignInUrl = (...args) => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildAfterSignInUrl(...args)) || "";
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildAfterSignInUrl", callback);
      }
    };
    this.buildAfterSignUpUrl = (...args) => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildAfterSignUpUrl(...args)) || "";
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildAfterSignUpUrl", callback);
      }
    };
    this.buildAfterSignOutUrl = () => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildAfterSignOutUrl()) || "";
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildAfterSignOutUrl", callback);
      }
    };
    this.buildNewSubscriptionRedirectUrl = () => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildNewSubscriptionRedirectUrl()) || "";
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildNewSubscriptionRedirectUrl", callback);
      }
    };
    this.buildAfterMultiSessionSingleSignOutUrl = () => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildAfterMultiSessionSingleSignOutUrl()) || "";
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildAfterMultiSessionSingleSignOutUrl", callback);
      }
    };
    this.buildUserProfileUrl = () => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildUserProfileUrl()) || "";
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildUserProfileUrl", callback);
      }
    };
    this.buildCreateOrganizationUrl = () => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildCreateOrganizationUrl()) || "";
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildCreateOrganizationUrl", callback);
      }
    };
    this.buildOrganizationProfileUrl = () => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildOrganizationProfileUrl()) || "";
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildOrganizationProfileUrl", callback);
      }
    };
    this.buildWaitlistUrl = () => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildWaitlistUrl()) || "";
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildWaitlistUrl", callback);
      }
    };
    this.buildUrlWithAuth = (to) => {
      const callback = () => {
        var _a;
        return ((_a = this.clerkjs) == null ? void 0 : _a.buildUrlWithAuth(to)) || "";
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("buildUrlWithAuth", callback);
      }
    };
    this.handleUnauthenticated = async () => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.handleUnauthenticated();
      };
      if (this.clerkjs && this.loaded) {
        void callback();
      } else {
        this.premountMethodCalls.set("handleUnauthenticated", callback);
      }
    };
    this.on = (...args) => {
      var _a;
      if ((_a = this.clerkjs) == null ? void 0 : _a.on) {
        return this.clerkjs.on(...args);
      } else {
        __privateGet2(this, _eventBus).on(...args);
      }
    };
    this.off = (...args) => {
      var _a;
      if ((_a = this.clerkjs) == null ? void 0 : _a.off) {
        return this.clerkjs.off(...args);
      } else {
        __privateGet2(this, _eventBus).off(...args);
      }
    };
    this.addOnLoaded = (cb) => {
      this.loadedListeners.push(cb);
      if (this.loaded) {
        this.emitLoaded();
      }
    };
    this.emitLoaded = () => {
      this.loadedListeners.forEach((cb) => cb());
      this.loadedListeners = [];
    };
    this.beforeLoad = (clerkjs) => {
      if (!clerkjs) {
        throw new Error("Failed to hydrate latest Clerk JS");
      }
    };
    this.hydrateClerkJS = (clerkjs) => {
      var _a;
      if (!clerkjs) {
        throw new Error("Failed to hydrate latest Clerk JS");
      }
      this.clerkjs = clerkjs;
      this.premountMethodCalls.forEach((cb) => cb());
      this.premountAddListenerCalls.forEach((listenerHandlers, listener) => {
        listenerHandlers.nativeUnsubscribe = clerkjs.addListener(listener);
      });
      (_a = __privateGet2(this, _eventBus).internal.retrieveListeners("status")) == null ? void 0 : _a.forEach((listener) => {
        this.on("status", listener, { notify: true });
      });
      if (this.preopenSignIn !== null) {
        clerkjs.openSignIn(this.preopenSignIn);
      }
      if (this.preopenCheckout !== null) {
        clerkjs.__internal_openCheckout(this.preopenCheckout);
      }
      if (this.preopenPlanDetails !== null) {
        clerkjs.__internal_openPlanDetails(this.preopenPlanDetails);
      }
      if (this.preopenSignUp !== null) {
        clerkjs.openSignUp(this.preopenSignUp);
      }
      if (this.preopenUserProfile !== null) {
        clerkjs.openUserProfile(this.preopenUserProfile);
      }
      if (this.preopenUserVerification !== null) {
        clerkjs.__internal_openReverification(this.preopenUserVerification);
      }
      if (this.preopenOneTap !== null) {
        clerkjs.openGoogleOneTap(this.preopenOneTap);
      }
      if (this.preopenOrganizationProfile !== null) {
        clerkjs.openOrganizationProfile(this.preopenOrganizationProfile);
      }
      if (this.preopenCreateOrganization !== null) {
        clerkjs.openCreateOrganization(this.preopenCreateOrganization);
      }
      if (this.preOpenWaitlist !== null) {
        clerkjs.openWaitlist(this.preOpenWaitlist);
      }
      this.premountSignInNodes.forEach((props, node) => {
        clerkjs.mountSignIn(node, props);
      });
      this.premountSignUpNodes.forEach((props, node) => {
        clerkjs.mountSignUp(node, props);
      });
      this.premountUserProfileNodes.forEach((props, node) => {
        clerkjs.mountUserProfile(node, props);
      });
      this.premountUserButtonNodes.forEach((props, node) => {
        clerkjs.mountUserButton(node, props);
      });
      this.premountOrganizationListNodes.forEach((props, node) => {
        clerkjs.mountOrganizationList(node, props);
      });
      this.premountWaitlistNodes.forEach((props, node) => {
        clerkjs.mountWaitlist(node, props);
      });
      this.premountPricingTableNodes.forEach((props, node) => {
        clerkjs.mountPricingTable(node, props);
      });
      this.premountApiKeysNodes.forEach((props, node) => {
        clerkjs.mountApiKeys(node, props);
      });
      this.premountOAuthConsentNodes.forEach((props, node) => {
        clerkjs.__internal_mountOAuthConsent(node, props);
      });
      if (typeof this.clerkjs.status === "undefined") {
        __privateGet2(this, _eventBus).emit(clerkEvents.Status, "ready");
      }
      this.emitLoaded();
      return this.clerkjs;
    };
    this.__unstable__updateProps = async (props) => {
      const clerkjs = await __privateMethod2(this, _IsomorphicClerk_instances, waitForClerkJS_fn).call(this);
      if (clerkjs && "__unstable__updateProps" in clerkjs) {
        return clerkjs.__unstable__updateProps(props);
      }
    };
    this.__experimental_navigateToTask = async (params) => {
      if (this.clerkjs) {
        return this.clerkjs.__experimental_navigateToTask(params);
      } else {
        return Promise.reject();
      }
    };
    this.setActive = (params) => {
      if (this.clerkjs) {
        return this.clerkjs.setActive(params);
      } else {
        return Promise.reject();
      }
    };
    this.openSignIn = (props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.openSignIn(props);
      } else {
        this.preopenSignIn = props;
      }
    };
    this.closeSignIn = () => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.closeSignIn();
      } else {
        this.preopenSignIn = null;
      }
    };
    this.__internal_openCheckout = (props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.__internal_openCheckout(props);
      } else {
        this.preopenCheckout = props;
      }
    };
    this.__internal_closeCheckout = () => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.__internal_closeCheckout();
      } else {
        this.preopenCheckout = null;
      }
    };
    this.__internal_openPlanDetails = (props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.__internal_openPlanDetails(props);
      } else {
        this.preopenPlanDetails = props;
      }
    };
    this.__internal_closePlanDetails = () => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.__internal_closePlanDetails();
      } else {
        this.preopenPlanDetails = null;
      }
    };
    this.__internal_openReverification = (props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.__internal_openReverification(props);
      } else {
        this.preopenUserVerification = props;
      }
    };
    this.__internal_closeReverification = () => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.__internal_closeReverification();
      } else {
        this.preopenUserVerification = null;
      }
    };
    this.openGoogleOneTap = (props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.openGoogleOneTap(props);
      } else {
        this.preopenOneTap = props;
      }
    };
    this.closeGoogleOneTap = () => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.closeGoogleOneTap();
      } else {
        this.preopenOneTap = null;
      }
    };
    this.openUserProfile = (props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.openUserProfile(props);
      } else {
        this.preopenUserProfile = props;
      }
    };
    this.closeUserProfile = () => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.closeUserProfile();
      } else {
        this.preopenUserProfile = null;
      }
    };
    this.openOrganizationProfile = (props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.openOrganizationProfile(props);
      } else {
        this.preopenOrganizationProfile = props;
      }
    };
    this.closeOrganizationProfile = () => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.closeOrganizationProfile();
      } else {
        this.preopenOrganizationProfile = null;
      }
    };
    this.openCreateOrganization = (props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.openCreateOrganization(props);
      } else {
        this.preopenCreateOrganization = props;
      }
    };
    this.closeCreateOrganization = () => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.closeCreateOrganization();
      } else {
        this.preopenCreateOrganization = null;
      }
    };
    this.openWaitlist = (props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.openWaitlist(props);
      } else {
        this.preOpenWaitlist = props;
      }
    };
    this.closeWaitlist = () => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.closeWaitlist();
      } else {
        this.preOpenWaitlist = null;
      }
    };
    this.openSignUp = (props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.openSignUp(props);
      } else {
        this.preopenSignUp = props;
      }
    };
    this.closeSignUp = () => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.closeSignUp();
      } else {
        this.preopenSignUp = null;
      }
    };
    this.mountSignIn = (node, props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.mountSignIn(node, props);
      } else {
        this.premountSignInNodes.set(node, props);
      }
    };
    this.unmountSignIn = (node) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.unmountSignIn(node);
      } else {
        this.premountSignInNodes.delete(node);
      }
    };
    this.mountSignUp = (node, props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.mountSignUp(node, props);
      } else {
        this.premountSignUpNodes.set(node, props);
      }
    };
    this.unmountSignUp = (node) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.unmountSignUp(node);
      } else {
        this.premountSignUpNodes.delete(node);
      }
    };
    this.mountUserProfile = (node, props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.mountUserProfile(node, props);
      } else {
        this.premountUserProfileNodes.set(node, props);
      }
    };
    this.unmountUserProfile = (node) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.unmountUserProfile(node);
      } else {
        this.premountUserProfileNodes.delete(node);
      }
    };
    this.mountOrganizationProfile = (node, props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.mountOrganizationProfile(node, props);
      } else {
        this.premountOrganizationProfileNodes.set(node, props);
      }
    };
    this.unmountOrganizationProfile = (node) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.unmountOrganizationProfile(node);
      } else {
        this.premountOrganizationProfileNodes.delete(node);
      }
    };
    this.mountCreateOrganization = (node, props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.mountCreateOrganization(node, props);
      } else {
        this.premountCreateOrganizationNodes.set(node, props);
      }
    };
    this.unmountCreateOrganization = (node) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.unmountCreateOrganization(node);
      } else {
        this.premountCreateOrganizationNodes.delete(node);
      }
    };
    this.mountOrganizationSwitcher = (node, props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.mountOrganizationSwitcher(node, props);
      } else {
        this.premountOrganizationSwitcherNodes.set(node, props);
      }
    };
    this.unmountOrganizationSwitcher = (node) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.unmountOrganizationSwitcher(node);
      } else {
        this.premountOrganizationSwitcherNodes.delete(node);
      }
    };
    this.__experimental_prefetchOrganizationSwitcher = () => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.__experimental_prefetchOrganizationSwitcher();
      };
      if (this.clerkjs && this.loaded) {
        void callback();
      } else {
        this.premountMethodCalls.set("__experimental_prefetchOrganizationSwitcher", callback);
      }
    };
    this.mountOrganizationList = (node, props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.mountOrganizationList(node, props);
      } else {
        this.premountOrganizationListNodes.set(node, props);
      }
    };
    this.unmountOrganizationList = (node) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.unmountOrganizationList(node);
      } else {
        this.premountOrganizationListNodes.delete(node);
      }
    };
    this.mountUserButton = (node, userButtonProps) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.mountUserButton(node, userButtonProps);
      } else {
        this.premountUserButtonNodes.set(node, userButtonProps);
      }
    };
    this.unmountUserButton = (node) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.unmountUserButton(node);
      } else {
        this.premountUserButtonNodes.delete(node);
      }
    };
    this.mountWaitlist = (node, props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.mountWaitlist(node, props);
      } else {
        this.premountWaitlistNodes.set(node, props);
      }
    };
    this.unmountWaitlist = (node) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.unmountWaitlist(node);
      } else {
        this.premountWaitlistNodes.delete(node);
      }
    };
    this.mountPricingTable = (node, props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.mountPricingTable(node, props);
      } else {
        this.premountPricingTableNodes.set(node, props);
      }
    };
    this.unmountPricingTable = (node) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.unmountPricingTable(node);
      } else {
        this.premountPricingTableNodes.delete(node);
      }
    };
    this.mountApiKeys = (node, props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.mountApiKeys(node, props);
      } else {
        this.premountApiKeysNodes.set(node, props);
      }
    };
    this.unmountApiKeys = (node) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.unmountApiKeys(node);
      } else {
        this.premountApiKeysNodes.delete(node);
      }
    };
    this.__internal_mountOAuthConsent = (node, props) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.__internal_mountOAuthConsent(node, props);
      } else {
        this.premountOAuthConsentNodes.set(node, props);
      }
    };
    this.__internal_unmountOAuthConsent = (node) => {
      if (this.clerkjs && this.loaded) {
        this.clerkjs.__internal_unmountOAuthConsent(node);
      } else {
        this.premountOAuthConsentNodes.delete(node);
      }
    };
    this.addListener = (listener) => {
      if (this.clerkjs) {
        return this.clerkjs.addListener(listener);
      } else {
        const unsubscribe = () => {
          var _a;
          const listenerHandlers = this.premountAddListenerCalls.get(listener);
          if (listenerHandlers) {
            (_a = listenerHandlers.nativeUnsubscribe) == null ? void 0 : _a.call(listenerHandlers);
            this.premountAddListenerCalls.delete(listener);
          }
        };
        this.premountAddListenerCalls.set(listener, { unsubscribe, nativeUnsubscribe: void 0 });
        return unsubscribe;
      }
    };
    this.navigate = (to) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.navigate(to);
      };
      if (this.clerkjs && this.loaded) {
        void callback();
      } else {
        this.premountMethodCalls.set("navigate", callback);
      }
    };
    this.redirectWithAuth = async (...args) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectWithAuth(...args);
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("redirectWithAuth", callback);
        return;
      }
    };
    this.redirectToSignIn = async (opts) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectToSignIn(opts);
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("redirectToSignIn", callback);
        return;
      }
    };
    this.redirectToSignUp = async (opts) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectToSignUp(opts);
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("redirectToSignUp", callback);
        return;
      }
    };
    this.redirectToUserProfile = async () => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectToUserProfile();
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("redirectToUserProfile", callback);
        return;
      }
    };
    this.redirectToAfterSignUp = () => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectToAfterSignUp();
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("redirectToAfterSignUp", callback);
      }
    };
    this.redirectToAfterSignIn = () => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectToAfterSignIn();
      };
      if (this.clerkjs && this.loaded) {
        callback();
      } else {
        this.premountMethodCalls.set("redirectToAfterSignIn", callback);
      }
    };
    this.redirectToAfterSignOut = () => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectToAfterSignOut();
      };
      if (this.clerkjs && this.loaded) {
        callback();
      } else {
        this.premountMethodCalls.set("redirectToAfterSignOut", callback);
      }
    };
    this.redirectToOrganizationProfile = async () => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectToOrganizationProfile();
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("redirectToOrganizationProfile", callback);
        return;
      }
    };
    this.redirectToCreateOrganization = async () => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectToCreateOrganization();
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("redirectToCreateOrganization", callback);
        return;
      }
    };
    this.redirectToWaitlist = async () => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.redirectToWaitlist();
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("redirectToWaitlist", callback);
        return;
      }
    };
    this.handleRedirectCallback = async (params) => {
      var _a;
      const callback = () => {
        var _a2;
        return (_a2 = this.clerkjs) == null ? void 0 : _a2.handleRedirectCallback(params);
      };
      if (this.clerkjs && this.loaded) {
        void ((_a = callback()) == null ? void 0 : _a.catch(() => {
        }));
      } else {
        this.premountMethodCalls.set("handleRedirectCallback", callback);
      }
    };
    this.handleGoogleOneTapCallback = async (signInOrUp, params) => {
      var _a;
      const callback = () => {
        var _a2;
        return (_a2 = this.clerkjs) == null ? void 0 : _a2.handleGoogleOneTapCallback(signInOrUp, params);
      };
      if (this.clerkjs && this.loaded) {
        void ((_a = callback()) == null ? void 0 : _a.catch(() => {
        }));
      } else {
        this.premountMethodCalls.set("handleGoogleOneTapCallback", callback);
      }
    };
    this.handleEmailLinkVerification = async (params) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.handleEmailLinkVerification(params);
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("handleEmailLinkVerification", callback);
      }
    };
    this.authenticateWithMetamask = async (params) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.authenticateWithMetamask(params);
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("authenticateWithMetamask", callback);
      }
    };
    this.authenticateWithCoinbaseWallet = async (params) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.authenticateWithCoinbaseWallet(params);
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("authenticateWithCoinbaseWallet", callback);
      }
    };
    this.authenticateWithOKXWallet = async (params) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.authenticateWithOKXWallet(params);
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("authenticateWithOKXWallet", callback);
      }
    };
    this.authenticateWithWeb3 = async (params) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.authenticateWithWeb3(params);
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("authenticateWithWeb3", callback);
      }
    };
    this.authenticateWithGoogleOneTap = async (params) => {
      const clerkjs = await __privateMethod2(this, _IsomorphicClerk_instances, waitForClerkJS_fn).call(this);
      return clerkjs.authenticateWithGoogleOneTap(params);
    };
    this.__internal_loadStripeJs = async () => {
      const clerkjs = await __privateMethod2(this, _IsomorphicClerk_instances, waitForClerkJS_fn).call(this);
      return clerkjs.__internal_loadStripeJs();
    };
    this.createOrganization = async (params) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.createOrganization(params);
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("createOrganization", callback);
      }
    };
    this.getOrganization = async (organizationId) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.getOrganization(organizationId);
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("getOrganization", callback);
      }
    };
    this.joinWaitlist = async (params) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.joinWaitlist(params);
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("joinWaitlist", callback);
      }
    };
    this.signOut = async (...args) => {
      const callback = () => {
        var _a;
        return (_a = this.clerkjs) == null ? void 0 : _a.signOut(...args);
      };
      if (this.clerkjs && this.loaded) {
        return callback();
      } else {
        this.premountMethodCalls.set("signOut", callback);
      }
    };
    const { Clerk = null, publishableKey } = options || {};
    __privateSet2(this, _publishableKey, publishableKey);
    __privateSet2(this, _proxyUrl, options == null ? void 0 : options.proxyUrl);
    __privateSet2(this, _domain, options == null ? void 0 : options.domain);
    this.options = options;
    this.Clerk = Clerk;
    this.mode = inBrowser() ? "browser" : "server";
    if (!this.options.sdkMetadata) {
      this.options.sdkMetadata = SDK_METADATA;
    }
    __privateGet2(this, _eventBus).emit(clerkEvents.Status, "loading");
    __privateGet2(this, _eventBus).prioritizedOn(clerkEvents.Status, (status) => __privateSet2(this, _status, status));
    if (__privateGet2(this, _publishableKey)) {
      void this.loadClerkJS();
    }
  }
  get publishableKey() {
    return __privateGet2(this, _publishableKey);
  }
  get loaded() {
    var _a;
    return ((_a = this.clerkjs) == null ? void 0 : _a.loaded) || false;
  }
  get status() {
    var _a;
    if (!this.clerkjs) {
      return __privateGet2(this, _status);
    }
    return ((_a = this.clerkjs) == null ? void 0 : _a.status) || /**
    * Support older clerk-js versions.
    * If clerk-js is available but `.status` is missing it we need to fallback to `.loaded`.
    * Since "degraded" an "error" did not exist before,
    * map "loaded" to "ready" and "not loaded" to "loading".
    */
    (this.clerkjs.loaded ? "ready" : "loading");
  }
  static getOrCreateInstance(options) {
    if (!inBrowser() || !__privateGet2(this, _instance) || options.Clerk && __privateGet2(this, _instance).Clerk !== options.Clerk || // Allow hot swapping PKs on the client
    __privateGet2(this, _instance).publishableKey !== options.publishableKey) {
      __privateSet2(this, _instance, new _IsomorphicClerk2(options));
    }
    return __privateGet2(this, _instance);
  }
  static clearInstance() {
    __privateSet2(this, _instance, null);
  }
  get domain() {
    if (typeof window !== "undefined" && window.location) {
      return handleValueOrFn(__privateGet2(this, _domain), new URL(window.location.href), "");
    }
    if (typeof __privateGet2(this, _domain) === "function") {
      return errorThrower.throw(unsupportedNonBrowserDomainOrProxyUrlFunction);
    }
    return __privateGet2(this, _domain) || "";
  }
  get proxyUrl() {
    if (typeof window !== "undefined" && window.location) {
      return handleValueOrFn(__privateGet2(this, _proxyUrl), new URL(window.location.href), "");
    }
    if (typeof __privateGet2(this, _proxyUrl) === "function") {
      return errorThrower.throw(unsupportedNonBrowserDomainOrProxyUrlFunction);
    }
    return __privateGet2(this, _proxyUrl) || "";
  }
  /**
   * Accesses private options from the `Clerk` instance and defaults to
   * `IsomorphicClerk` options when in SSR context.
   *  @internal
   */
  __internal_getOption(key) {
    var _a, _b;
    return ((_a = this.clerkjs) == null ? void 0 : _a.__internal_getOption) ? (_b = this.clerkjs) == null ? void 0 : _b.__internal_getOption(key) : this.options[key];
  }
  get sdkMetadata() {
    var _a;
    return ((_a = this.clerkjs) == null ? void 0 : _a.sdkMetadata) || this.options.sdkMetadata || void 0;
  }
  get instanceType() {
    var _a;
    return (_a = this.clerkjs) == null ? void 0 : _a.instanceType;
  }
  get frontendApi() {
    var _a;
    return ((_a = this.clerkjs) == null ? void 0 : _a.frontendApi) || "";
  }
  get isStandardBrowser() {
    var _a;
    return ((_a = this.clerkjs) == null ? void 0 : _a.isStandardBrowser) || this.options.standardBrowser || false;
  }
  get isSatellite() {
    if (typeof window !== "undefined" && window.location) {
      return handleValueOrFn(this.options.isSatellite, new URL(window.location.href), false);
    }
    if (typeof this.options.isSatellite === "function") {
      return errorThrower.throw(unsupportedNonBrowserDomainOrProxyUrlFunction);
    }
    return false;
  }
  async loadClerkJS() {
    var _a;
    if (this.mode !== "browser" || this.loaded) {
      return;
    }
    if (typeof window !== "undefined") {
      window.__clerk_publishable_key = __privateGet2(this, _publishableKey);
      window.__clerk_proxy_url = this.proxyUrl;
      window.__clerk_domain = this.domain;
    }
    try {
      if (this.Clerk) {
        let c;
        if (isConstructor(this.Clerk)) {
          c = new this.Clerk(__privateGet2(this, _publishableKey), {
            proxyUrl: this.proxyUrl,
            domain: this.domain
          });
          this.beforeLoad(c);
          await c.load(this.options);
        } else {
          c = this.Clerk;
          if (!c.loaded) {
            this.beforeLoad(c);
            await c.load(this.options);
          }
        }
        global.Clerk = c;
      } else if (!__BUILD_DISABLE_RHC__) {
        if (!global.Clerk) {
          await loadClerkJsScript({
            ...this.options,
            publishableKey: __privateGet2(this, _publishableKey),
            proxyUrl: this.proxyUrl,
            domain: this.domain,
            nonce: this.options.nonce
          });
        }
        if (!global.Clerk) {
          throw new Error("Failed to download latest ClerkJS. Contact support@clerk.com.");
        }
        this.beforeLoad(global.Clerk);
        await global.Clerk.load(this.options);
      }
      if ((_a = global.Clerk) == null ? void 0 : _a.loaded) {
        return this.hydrateClerkJS(global.Clerk);
      }
      return;
    } catch (err) {
      const error = err;
      __privateGet2(this, _eventBus).emit(clerkEvents.Status, "error");
      console.error(error.stack || error.message || error);
      return;
    }
  }
  get version() {
    var _a;
    return (_a = this.clerkjs) == null ? void 0 : _a.version;
  }
  get client() {
    if (this.clerkjs) {
      return this.clerkjs.client;
    } else {
      return void 0;
    }
  }
  get session() {
    if (this.clerkjs) {
      return this.clerkjs.session;
    } else {
      return void 0;
    }
  }
  get user() {
    if (this.clerkjs) {
      return this.clerkjs.user;
    } else {
      return void 0;
    }
  }
  get organization() {
    if (this.clerkjs) {
      return this.clerkjs.organization;
    } else {
      return void 0;
    }
  }
  get telemetry() {
    if (this.clerkjs) {
      return this.clerkjs.telemetry;
    } else {
      return void 0;
    }
  }
  get __unstable__environment() {
    if (this.clerkjs) {
      return this.clerkjs.__unstable__environment;
    } else {
      return void 0;
    }
  }
  get isSignedIn() {
    if (this.clerkjs) {
      return this.clerkjs.isSignedIn;
    } else {
      return false;
    }
  }
  get billing() {
    var _a;
    return (_a = this.clerkjs) == null ? void 0 : _a.billing;
  }
  get apiKeys() {
    var _a;
    return (_a = this.clerkjs) == null ? void 0 : _a.apiKeys;
  }
  __unstable__setEnvironment(...args) {
    if (this.clerkjs && "__unstable__setEnvironment" in this.clerkjs) {
      this.clerkjs.__unstable__setEnvironment(args);
    } else {
      return void 0;
    }
  }
};
_status = /* @__PURE__ */ new WeakMap();
_domain = /* @__PURE__ */ new WeakMap();
_proxyUrl = /* @__PURE__ */ new WeakMap();
_publishableKey = /* @__PURE__ */ new WeakMap();
_eventBus = /* @__PURE__ */ new WeakMap();
_instance = /* @__PURE__ */ new WeakMap();
_IsomorphicClerk_instances = /* @__PURE__ */ new WeakSet();
waitForClerkJS_fn = function() {
  return new Promise((resolve) => {
    this.addOnLoaded(() => resolve(this.clerkjs));
  });
};
__privateAdd2(_IsomorphicClerk, _instance);
var IsomorphicClerk = _IsomorphicClerk;
function ClerkContextProvider(props) {
  const { isomorphicClerkOptions, initialState, children } = props;
  const { isomorphicClerk: clerk, clerkStatus } = useLoadedIsomorphicClerk(isomorphicClerkOptions);
  const [state, setState] = import_react43.default.useState({
    client: clerk.client,
    session: clerk.session,
    user: clerk.user,
    organization: clerk.organization
  });
  import_react43.default.useEffect(() => {
    return clerk.addListener((e) => setState({ ...e }));
  }, []);
  const derivedState = deriveState(clerk.loaded, state, initialState);
  const clerkCtx = import_react43.default.useMemo(
    () => ({ value: clerk }),
    [
      // Only update the clerk reference on status change
      clerkStatus
    ]
  );
  const clientCtx = import_react43.default.useMemo(() => ({ value: state.client }), [state.client]);
  const {
    sessionId,
    sessionStatus,
    sessionClaims,
    session,
    userId,
    user,
    orgId,
    actor,
    organization,
    orgRole,
    orgSlug,
    orgPermissions,
    factorVerificationAge
  } = derivedState;
  const authCtx = import_react43.default.useMemo(() => {
    const value = {
      sessionId,
      sessionStatus,
      sessionClaims,
      userId,
      actor,
      orgId,
      orgRole,
      orgSlug,
      orgPermissions,
      factorVerificationAge
    };
    return { value };
  }, [sessionId, sessionStatus, userId, actor, orgId, orgRole, orgSlug, factorVerificationAge, sessionClaims == null ? void 0 : sessionClaims.__raw]);
  const sessionCtx = import_react43.default.useMemo(() => ({ value: session }), [sessionId, session]);
  const userCtx = import_react43.default.useMemo(() => ({ value: user }), [userId, user]);
  const organizationCtx = import_react43.default.useMemo(() => {
    const value = {
      organization
    };
    return { value };
  }, [orgId, organization]);
  return (
    // @ts-expect-error value passed is of type IsomorphicClerk where the context expects LoadedClerk
    import_react43.default.createElement(IsomorphicClerkContext.Provider, { value: clerkCtx }, import_react43.default.createElement(ClientContext.Provider, { value: clientCtx }, import_react43.default.createElement(SessionContext.Provider, { value: sessionCtx }, import_react43.default.createElement(OrganizationProvider, { ...organizationCtx.value }, import_react43.default.createElement(AuthContext.Provider, { value: authCtx }, import_react43.default.createElement(UserContext.Provider, { value: userCtx }, children))))))
  );
}
var useLoadedIsomorphicClerk = (options) => {
  const isomorphicClerkRef = import_react43.default.useRef(IsomorphicClerk.getOrCreateInstance(options));
  const [clerkStatus, setClerkStatus] = import_react43.default.useState(isomorphicClerkRef.current.status);
  import_react43.default.useEffect(() => {
    void isomorphicClerkRef.current.__unstable__updateProps({ appearance: options.appearance });
  }, [options.appearance]);
  import_react43.default.useEffect(() => {
    void isomorphicClerkRef.current.__unstable__updateProps({ options });
  }, [options.localization]);
  import_react43.default.useEffect(() => {
    isomorphicClerkRef.current.on("status", setClerkStatus);
    return () => {
      if (isomorphicClerkRef.current) {
        isomorphicClerkRef.current.off("status", setClerkStatus);
      }
      IsomorphicClerk.clearInstance();
    };
  }, []);
  return { isomorphicClerk: isomorphicClerkRef.current, clerkStatus };
};
function ClerkProviderBase(props) {
  const { initialState, children, __internal_bypassMissingPublishableKey, ...restIsomorphicClerkOptions } = props;
  const { publishableKey = "", Clerk: userInitialisedClerk } = restIsomorphicClerkOptions;
  if (!userInitialisedClerk && !__internal_bypassMissingPublishableKey) {
    if (!publishableKey) {
      errorThrower.throwMissingPublishableKeyError();
    } else if (publishableKey && !isPublishableKey(publishableKey)) {
      errorThrower.throwInvalidPublishableKeyError({ key: publishableKey });
    }
  }
  return import_react41.default.createElement(
    ClerkContextProvider,
    {
      initialState,
      isomorphicClerkOptions: restIsomorphicClerkOptions
    },
    children
  );
}
var ClerkProvider = withMaxAllowedInstancesGuard(ClerkProviderBase, "ClerkProvider", multipleClerkProvidersError);
ClerkProvider.displayName = "ClerkProvider";
setErrorThrowerOptions({ packageName: "@clerk/clerk-react" });
setClerkJsLoadingErrorPackageName("@clerk/clerk-react");
export {
  APIKeys,
  AuthenticateWithRedirectCallback,
  ClerkDegraded,
  ClerkFailed,
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  CreateOrganization,
  GoogleOneTap,
  OrganizationList,
  OrganizationProfile,
  OrganizationSwitcher,
  PricingTable,
  Protect,
  RedirectToCreateOrganization,
  RedirectToOrganizationProfile,
  RedirectToSignIn,
  RedirectToSignUp,
  RedirectToUserProfile,
  SignIn,
  SignInButton,
  SignInWithMetamaskButton,
  SignOutButton,
  SignUp,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
  Waitlist,
  PaymentElement2 as __experimental_PaymentElement,
  PaymentElementProvider as __experimental_PaymentElementProvider,
  usePaymentElement as __experimental_usePaymentElement,
  useAuth,
  useClerk,
  useEmailLink,
  useOrganization,
  useOrganizationList,
  useReverification,
  useSession,
  useSessionList,
  useSignIn,
  useSignUp,
  useUser
};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=@clerk_clerk-react.js.map
