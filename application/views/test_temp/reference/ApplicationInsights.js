/*!
 * Application Insights JavaScript SDK - Web Analytics, 2.5.2
 * Copyright (c) Microsoft and contributors. All rights reserved.
 */
/**
 * ApplicationInsights.ts
 * @copyright Microsoft 2018
 */
import * as tslib_1 from "tslib";
import { Util, PageViewPerformance, PageView, RemoteDependencyData, Event as EventTelemetry, TelemetryItemCreator, Metric, Exception, SeverityLevel, Trace, DateTimeUtils, PropertiesPluginIdentifier, AnalyticsPluginIdentifier } from "@microsoft/applicationinsights-common";
import { BaseTelemetryPlugin, CoreUtils, LoggingSeverity, _InternalMessageId, getWindow, getDocument, getHistory, getLocation } from "@microsoft/applicationinsights-core-js";
import { PageViewManager } from "./Telemetry/PageViewManager";
import { PageVisitTimeManager } from "./Telemetry/PageVisitTimeManager";
import { PageViewPerformanceManager } from './Telemetry/PageViewPerformanceManager';
"use strict";
var durationProperty = "duration";
function _dispatchEvent(target, evnt) {
    if (target && target.dispatchEvent && evnt) {
        target.dispatchEvent(evnt);
    }
}
var ApplicationInsights = /** @class */ (function (_super) {
    tslib_1.__extends(ApplicationInsights, _super);
    function ApplicationInsights() {
        var _this = _super.call(this) || this;
        _this.identifier = AnalyticsPluginIdentifier; // do not change name or priority
        _this.priority = 180; // take from reserved priority range 100- 200
        _this.autoRoutePVDelay = 500; // ms; Time to wait after a route change before triggering a pageview to allow DOM changes to take place
        // Counts number of trackAjax invokations.
        // By default we only monitor X ajax call per view to avoid too much load.
        // Default value is set in config.
        // This counter keeps increasing even after the limit is reached.
        _this._trackAjaxAttempts = 0;
        var location = getLocation();
        _this._prevUri = location && location.href || "";
        return _this;
    }
    ApplicationInsights.getDefaultConfig = function (config) {
        if (!config) {
            config = {};
        }
        // set default values
        config.sessionRenewalMs = 30 * 60 * 1000;
        config.sessionExpirationMs = 24 * 60 * 60 * 1000;
        config.disableExceptionTracking = Util.stringToBoolOrDefault(config.disableExceptionTracking);
        config.autoTrackPageVisitTime = Util.stringToBoolOrDefault(config.autoTrackPageVisitTime);
        config.overridePageViewDuration = Util.stringToBoolOrDefault(config.overridePageViewDuration);
        config.enableUnhandledPromiseRejectionTracking = Util.stringToBoolOrDefault(config.enableUnhandledPromiseRejectionTracking);
        if (isNaN(config.samplingPercentage) || config.samplingPercentage <= 0 || config.samplingPercentage >= 100) {
            config.samplingPercentage = 100;
        }
        config.isCookieUseDisabled = Util.stringToBoolOrDefault(config.isCookieUseDisabled);
        config.isStorageUseDisabled = Util.stringToBoolOrDefault(config.isStorageUseDisabled);
        config.isBrowserLinkTrackingEnabled = Util.stringToBoolOrDefault(config.isBrowserLinkTrackingEnabled);
        config.enableAutoRouteTracking = Util.stringToBoolOrDefault(config.enableAutoRouteTracking);
        config.namePrefix = config.namePrefix || "";
        return config;
    };
    ApplicationInsights.prototype.processTelemetry = function (env, itemCtx) {
        var doNotSendItem = false;
        var telemetryInitializersCount = this._telemetryInitializers.length;
        itemCtx = this._getTelCtx(itemCtx);
        for (var i = 0; i < telemetryInitializersCount; ++i) {
            var telemetryInitializer = this._telemetryInitializers[i];
            if (telemetryInitializer) {
                try {
                    if (telemetryInitializer.apply(null, [env]) === false) {
                        doNotSendItem = true;
                        break;
                    }
                }
                catch (e) {
                    // log error but dont stop executing rest of the telemetry initializers
                    // doNotSendItem = true;
                    itemCtx.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TelemetryInitializerFailed, "One of telemetry initializers failed, telemetry item will not be sent: " + Util.getExceptionName(e), { exception: Util.dump(e) }, true);
                }
            }
        }
        if (!doNotSendItem) {
            this.processNext(env, itemCtx);
        }
    };
    ApplicationInsights.prototype.trackEvent = function (event, customProperties) {
        try {
            var telemetryItem = TelemetryItemCreator.create(event, EventTelemetry.dataType, EventTelemetry.envelopeType, this.diagLog(), customProperties);
            this.core.track(telemetryItem);
        }
        catch (e) {
            this.diagLog().throwInternal(LoggingSeverity.WARNING, _InternalMessageId.TrackTraceFailed, "trackTrace failed, trace will not be collected: " + Util.getExceptionName(e), { exception: Util.dump(e) });
        }
    };
    /**
     * Start timing an extended event. Call `stopTrackEvent` to log the event when it ends.
     * @param   name    A string that identifies this event uniquely within the document.
     */
    ApplicationInsights.prototype.startTrackEvent = function (name) {
        try {
            this._eventTracking.start(name);
        }
        catch (e) {
            this.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.StartTrackEventFailed, "startTrackEvent failed, event will not be collected: " + Util.getExceptionName(e), { exception: Util.dump(e) });
        }
    };
    /**
     * Log an extended event that you started timing with `startTrackEvent`.
     * @param   name    The string you used to identify this event in `startTrackEvent`.
     * @param   properties  map[string, string] - additional data used to filter events and metrics in the portal. Defaults to empty.
     * @param   measurements    map[string, number] - metrics associated with this event, displayed in Metrics Explorer on the portal. Defaults to empty.
     */
    ApplicationInsights.prototype.stopTrackEvent = function (name, properties, measurements) {
        try {
            this._eventTracking.stop(name, undefined, properties); // Todo: Fix to pass measurements once type is updated
        }
        catch (e) {
            this.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.StopTrackEventFailed, "stopTrackEvent failed, event will not be collected: " + Util.getExceptionName(e), { exception: Util.dump(e) });
        }
    };
    /**
     * @description Log a diagnostic message
     * @param {ITraceTelemetry} trace
     * @param ICustomProperties.
     * @memberof ApplicationInsights
     */
    ApplicationInsights.prototype.trackTrace = function (trace, customProperties) {
        try {
            var telemetryItem = TelemetryItemCreator.create(trace, Trace.dataType, Trace.envelopeType, this.diagLog(), customProperties);
            this.core.track(telemetryItem);
        }
        catch (e) {
            this.diagLog().throwInternal(LoggingSeverity.WARNING, _InternalMessageId.TrackTraceFailed, "trackTrace failed, trace will not be collected: " + Util.getExceptionName(e), { exception: Util.dump(e) });
        }
    };
    /**
     * @description Log a numeric value that is not associated with a specific event. Typically
     * used to send regular reports of performance indicators. To send single measurement, just
     * use the name and average fields of {@link IMetricTelemetry}. If you take measurements
     * frequently, you can reduce the telemetry bandwidth by aggregating multiple measurements
     * and sending the resulting average at intervals
     * @param {IMetricTelemetry} metric input object argument. Only name and average are mandatory.
     * @param {{[key: string]: any}} customProperties additional data used to filter metrics in the
     * portal. Defaults to empty.
     * @memberof ApplicationInsights
     */
    ApplicationInsights.prototype.trackMetric = function (metric, customProperties) {
        try {
            var telemetryItem = TelemetryItemCreator.create(metric, Metric.dataType, Metric.envelopeType, this.diagLog(), customProperties);
            this.core.track(telemetryItem);
        }
        catch (e) {
            this.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TrackMetricFailed, "trackMetric failed, metric will not be collected: " + Util.getExceptionName(e), { exception: Util.dump(e) });
        }
    };
    /**
     * Logs that a page or other item was viewed.
     * @param IPageViewTelemetry The string you used as the name in startTrackPage. Defaults to the document title.
     * @param customProperties Additional data used to filter events and metrics. Defaults to empty.
     * If a user wants to provide duration for pageLoad, it'll have to be in pageView.properties.duration
     */
    ApplicationInsights.prototype.trackPageView = function (pageView, customProperties) {
        try {
            var inPv = pageView || {};
            this._pageViewManager.trackPageView(inPv, tslib_1.__assign({}, inPv.properties, inPv.measurements, customProperties));
            if (this.config.autoTrackPageVisitTime) {
                this._pageVisitTimeManager.trackPreviousPageVisit(inPv.name, inPv.uri);
            }
        }
        catch (e) {
            this.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TrackPVFailed, "trackPageView failed, page view will not be collected: " + Util.getExceptionName(e), { exception: Util.dump(e) });
        }
    };
    /**
     * Create a page view telemetry item and send it to the SDK pipeline through the core.track API
     * @param pageView Page view item to be sent
     * @param properties Custom properties (Part C) that a user can add to the telemetry item
     * @param systemProperties System level properties (Part A) that a user can add to the telemetry item
     */
    ApplicationInsights.prototype.sendPageViewInternal = function (pageView, properties, systemProperties) {
        var doc = getDocument();
        if (doc) {
            pageView.refUri = pageView.refUri === undefined ? doc.referrer : pageView.refUri;
        }
        var telemetryItem = TelemetryItemCreator.create(pageView, PageView.dataType, PageView.envelopeType, this.diagLog(), properties, systemProperties);
        this.core.track(telemetryItem);
        // reset ajaxes counter
        this._trackAjaxAttempts = 0;
    };
    /**
     * @ignore INTERNAL ONLY
     * @param pageViewPerformance
     * @param properties
     */
    ApplicationInsights.prototype.sendPageViewPerformanceInternal = function (pageViewPerformance, properties, systemProperties) {
        var telemetryItem = TelemetryItemCreator.create(pageViewPerformance, PageViewPerformance.dataType, PageViewPerformance.envelopeType, this.diagLog(), properties, systemProperties);
        this.core.track(telemetryItem);
    };
    /**
     * Send browser performance metrics.
     * @param pageViewPerformance
     * @param customProperties
     */
    ApplicationInsights.prototype.trackPageViewPerformance = function (pageViewPerformance, customProperties) {
        try {
            this._pageViewPerformanceManager.populatePageViewPerformanceEvent(pageViewPerformance);
            this.sendPageViewPerformanceInternal(pageViewPerformance, customProperties);
        }
        catch (e) {
            this.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TrackPVFailed, "trackPageViewPerformance failed, page view will not be collected: " + Util.getExceptionName(e), { exception: Util.dump(e) });
        }
    };
    /**
     * Starts the timer for tracking a page load time. Use this instead of `trackPageView` if you want to control when the page view timer starts and stops,
     * but don't want to calculate the duration yourself. This method doesn't send any telemetry. Call `stopTrackPage` to log the end of the page view
     * and send the event.
     * @param name A string that idenfities this item, unique within this HTML document. Defaults to the document title.
     */
    ApplicationInsights.prototype.startTrackPage = function (name) {
        try {
            if (typeof name !== "string") {
                var doc = getDocument();
                name = doc && doc.title || "";
            }
            this._pageTracking.start(name);
        }
        catch (e) {
            this.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.StartTrackFailed, "startTrackPage failed, page view may not be collected: " + Util.getExceptionName(e), { exception: Util.dump(e) });
        }
    };
    /**
     * Stops the timer that was started by calling `startTrackPage` and sends the pageview load time telemetry with the specified properties and measurements.
     * The duration of the page view will be the time between calling `startTrackPage` and `stopTrackPage`.
     * @param   name  The string you used as the name in startTrackPage. Defaults to the document title.
     * @param   url   String - a relative or absolute URL that identifies the page or other item. Defaults to the window location.
     * @param   properties  map[string, string] - additional data used to filter pages and metrics in the portal. Defaults to empty.
     * @param   measurements    map[string, number] - metrics associated with this page, displayed in Metrics Explorer on the portal. Defaults to empty.
     */
    ApplicationInsights.prototype.stopTrackPage = function (name, url, properties, measurement) {
        try {
            if (typeof name !== "string") {
                var doc = getDocument();
                name = doc && doc.title || "";
            }
            if (typeof url !== "string") {
                var loc = getLocation();
                url = loc && loc.href || "";
            }
            this._pageTracking.stop(name, url, properties, measurement);
            if (this.config.autoTrackPageVisitTime) {
                this._pageVisitTimeManager.trackPreviousPageVisit(name, url);
            }
        }
        catch (e) {
            this.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.StopTrackFailed, "stopTrackPage failed, page view will not be collected: " + Util.getExceptionName(e), { exception: Util.dump(e) });
        }
    };
    /**
     * @ignore INTERNAL ONLY
     * @param exception
     * @param properties
     * @param systemProperties
     */
    ApplicationInsights.prototype.sendExceptionInternal = function (exception, customProperties, systemProperties) {
        var exceptionPartB = new Exception(this.diagLog(), exception.exception || new Error(Util.NotSpecified), exception.properties, exception.measurements, exception.severityLevel, exception.id).toInterface();
        var telemetryItem = TelemetryItemCreator.create(exceptionPartB, Exception.dataType, Exception.envelopeType, this.diagLog(), customProperties, systemProperties);
        this.core.track(telemetryItem);
    };
    /**
     * Log an exception you have caught.
     *
     * @param {IExceptionTelemetry} exception   Object which contains exception to be sent
     * @param {{[key: string]: any}} customProperties   Additional data used to filter pages and metrics in the portal. Defaults to empty.
     *
     * Any property of type double will be considered a measurement, and will be treated by Application Insights as a metric.
     * @memberof ApplicationInsights
     */
    ApplicationInsights.prototype.trackException = function (exception, customProperties) {
        try {
            this.sendExceptionInternal(exception, customProperties);
        }
        catch (e) {
            this.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TrackExceptionFailed, "trackException failed, exception will not be collected: " + Util.getExceptionName(e), { exception: Util.dump(e) });
        }
    };
    /**
     * @description Custom error handler for Application Insights Analytics
     * @param {IAutoExceptionTelemetry} exception
     * @memberof ApplicationInsights
     */
    ApplicationInsights.prototype._onerror = function (exception) {
        try {
            var properties_1 = {
                url: (exception && exception.url) || (getDocument() || {}).URL,
                lineNumber: exception.lineNumber,
                columnNumber: exception.columnNumber,
                message: exception.message
            };
            if (Util.isCrossOriginError(exception.message, exception.url, exception.lineNumber, exception.columnNumber, exception.error)) {
                this._sendCORSException(properties_1.url);
            }
            else {
                if (!Util.isError(exception.error)) {
                    var stack = "window.onerror@" + properties_1.url + ":" + exception.lineNumber + ":" + (exception.columnNumber || 0);
                    exception.error = new Error(exception.message);
                    exception.error.stack = stack;
                }
                this.trackException({ exception: exception.error, severityLevel: SeverityLevel.Error }, properties_1);
            }
        }
        catch (e) {
            var errorString = exception.error ?
                (exception.error.name + ", " + exception.error.message)
                : "null";
            this.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.ExceptionWhileLoggingError, "_onError threw exception while logging error, error will not be collected: "
                + Util.getExceptionName(e), { exception: Util.dump(e), errorString: errorString });
        }
    };
    ApplicationInsights.prototype.addTelemetryInitializer = function (telemetryInitializer) {
        this._telemetryInitializers.push(telemetryInitializer);
    };
    ApplicationInsights.prototype.initialize = function (config, core, extensions, pluginChain) {
        var _this = this;
        if (this.isInitialized()) {
            return;
        }
        if (CoreUtils.isNullOrUndefined(core)) {
            throw Error("Error initializing");
        }
        _super.prototype.initialize.call(this, config, core, extensions, pluginChain);
        this.setInitialized(false); // resetting the initialized state, just in case the following fails
        var ctx = this._getTelCtx();
        var identifier = this.identifier;
        this._globalconfig = {
            instrumentationKey: config.instrumentationKey,
            endpointUrl: config.endpointUrl || "https://dc.services.visualstudio.com/v2/track"
        };
        this.config = ctx.getExtCfg(identifier);
        // load default values if specified
        var defaults = ApplicationInsights.getDefaultConfig();
        if (defaults !== undefined) {
            for (var field in defaults) {
                // for each unspecified field, set the default value
                this.config[field] = ctx.getConfig(identifier, field, defaults[field]);
            }
            if (this._globalconfig) {
                for (var field in defaults) {
                    if (this._globalconfig[field] === undefined) {
                        this._globalconfig[field] = defaults[field];
                    }
                }
            }
        }
        // Todo: move this out of static state
        if (this.config.isCookieUseDisabled) {
            Util.disableCookies();
        }
        // Todo: move this out of static state
        if (this.config.isStorageUseDisabled) {
            Util.disableStorage();
        }
        var configGetters = {
            instrumentationKey: function () { return config.instrumentationKey; },
            accountId: function () { return _this.config.accountId || config.accountId; },
            sessionRenewalMs: function () { return _this.config.sessionRenewalMs || config.sessionRenewalMs; },
            sessionExpirationMs: function () { return _this.config.sessionExpirationMs || config.sessionExpirationMs; },
            sampleRate: function () { return _this.config.samplingPercentage || config.samplingPercentage; },
            cookieDomain: function () { return _this.config.cookieDomain || config.cookieDomain; },
            sdkExtension: function () { return _this.config.sdkExtension || config.sdkExtension; },
            isBrowserLinkTrackingEnabled: function () { return _this.config.isBrowserLinkTrackingEnabled || config.isBrowserLinkTrackingEnabled; },
            appId: function () { return _this.config.appId || config.appId; }
        };
        this._pageViewPerformanceManager = new PageViewPerformanceManager(this.core);
        this._pageViewManager = new PageViewManager(this, this.config.overridePageViewDuration, this.core, this._pageViewPerformanceManager);
        this._pageVisitTimeManager = new PageVisitTimeManager(this.diagLog(), function (pageName, pageUrl, pageVisitTime) { return _this.trackPageVisitTime(pageName, pageUrl, pageVisitTime); });
        this._telemetryInitializers = this._telemetryInitializers || [];
        this._addDefaultTelemetryInitializers(configGetters);
        this._eventTracking = new Timing(this.diagLog(), "trackEvent");
        this._eventTracking.action =
            function (name, url, duration, properties) {
                if (!properties) {
                    properties = {};
                }
                properties[durationProperty] = duration.toString();
                _this.trackEvent({ name: name, properties: properties });
            };
        // initialize page view timing
        this._pageTracking = new Timing(this.diagLog(), "trackPageView");
        this._pageTracking.action = function (name, url, duration, properties, measurements) {
            // duration must be a custom property in order for the collector to extract it
            if (CoreUtils.isNullOrUndefined(properties)) {
                properties = {};
            }
            properties[durationProperty] = duration.toString();
            var pageViewItem = {
                name: name,
                uri: url,
                properties: properties,
                measurements: measurements
            };
            _this.sendPageViewInternal(pageViewItem, properties);
        };
        var _window = getWindow();
        var _history = getHistory();
        var _location = getLocation();
        var instance = this;
        if (this.config.disableExceptionTracking === false &&
            !this.config.autoExceptionInstrumented && _window) {
            // We want to enable exception auto collection and it has not been done so yet
            var onerror_1 = "onerror";
            var originalOnError_1 = _window[onerror_1];
            _window.onerror = function (message, url, lineNumber, columnNumber, error) {
                var handled = originalOnError_1 && originalOnError_1(message, url, lineNumber, columnNumber, error);
                if (handled !== true) {
                    instance._onerror({
                        message: message,
                        url: url,
                        lineNumber: lineNumber,
                        columnNumber: columnNumber,
                        error: error
                    });
                }
                return handled;
            };
            this.config.autoExceptionInstrumented = true;
        }
        if (this.config.disableExceptionTracking === false &&
            this.config.enableUnhandledPromiseRejectionTracking === true &&
            !this.config.autoUnhandledPromiseInstrumented && _window) {
            // We want to enable exception auto collection and it has not been done so yet
            var onunhandledrejection = "onunhandledrejection";
            var originalOnUnhandledRejection_1 = _window[onunhandledrejection];
            _window[onunhandledrejection] = function (error) {
                var handled = originalOnUnhandledRejection_1 && originalOnUnhandledRejection_1.call(_window, error);
                if (handled !== true) {
                    instance._onerror({
                        message: error.reason.toString(),
                        error: error.reason instanceof Error ? error.reason : new Error(error.reason.toString()),
                        url: _location ? _location.href : "",
                        lineNumber: 0,
                        columnNumber: 0
                    });
                }
                return handled;
            };
            this.config.autoUnhandledPromiseInstrumented = true;
        }
        /**
         * Create a custom "locationchange" event which is triggered each time the history object is changed
         */
        if (this.config.enableAutoRouteTracking === true
            && _history && CoreUtils.isFunction(_history.pushState) && CoreUtils.isFunction(_history.replaceState)
            && _window
            && typeof Event !== "undefined") {
            var _self_1 = this;
            // Find the properties plugin
            CoreUtils.arrForEach(extensions, function (extension) {
                if (extension.identifier === PropertiesPluginIdentifier) {
                    _this._properties = extension;
                }
            });
            _history.pushState = (function (f) { return function pushState() {
                var ret = f.apply(this, arguments);
                _dispatchEvent(_window, Util.createDomEvent(_self_1.config.namePrefix + "pushState"));
                _dispatchEvent(_window, Util.createDomEvent(_self_1.config.namePrefix + "locationchange"));
                return ret;
            }; })(_history.pushState);
            _history.replaceState = (function (f) { return function replaceState() {
                var ret = f.apply(this, arguments);
                _dispatchEvent(_window, Util.createDomEvent(_self_1.config.namePrefix + "replaceState"));
                _dispatchEvent(_window, Util.createDomEvent(_self_1.config.namePrefix + "locationchange"));
                return ret;
            }; })(_history.replaceState);
            if (_window.addEventListener) {
                _window.addEventListener(_self_1.config.namePrefix + "popstate", function () {
                    _dispatchEvent(_window, Util.createDomEvent(_self_1.config.namePrefix + "locationchange"));
                });
                _window.addEventListener(_self_1.config.namePrefix + "locationchange", function () {
                    if (_self_1._properties && _self_1._properties.context && _self_1._properties.context.telemetryTrace) {
                        _self_1._properties.context.telemetryTrace.traceID = Util.generateW3CId();
                        _self_1._properties.context.telemetryTrace.name = _location && _location.pathname || "_unknown_";
                    }
                    if (_this._currUri) {
                        _this._prevUri = _this._currUri;
                        _this._currUri = _location && _location.href || "";
                    }
                    else {
                        _this._currUri = _location && _location.href || "";
                    }
                    setTimeout((function (uri) {
                        // todo: override start time so that it is not affected by autoRoutePVDelay
                        _self_1.trackPageView({ refUri: uri, properties: { duration: 0 } }); // SPA route change loading durations are undefined, so send 0
                    }).bind(_this, _this._prevUri), _self_1.autoRoutePVDelay);
                });
            }
        }
        this.setInitialized(true);
    };
    /**
     * Log a page visit time
     * @param    pageName    Name of page
     * @param    pageVisitDuration Duration of visit to the page in milleseconds
     */
    ApplicationInsights.prototype.trackPageVisitTime = function (pageName, pageUrl, pageVisitTime) {
        var properties = { PageName: pageName, PageUrl: pageUrl };
        this.trackMetric({
            name: "PageVisitTime",
            average: pageVisitTime,
            max: pageVisitTime,
            min: pageVisitTime,
            sampleCount: 1
        }, properties);
    };
    ApplicationInsights.prototype._addDefaultTelemetryInitializers = function (configGetters) {
        if (!configGetters.isBrowserLinkTrackingEnabled()) {
            var browserLinkPaths_1 = ['/browserLinkSignalR/', '/__browserLink/'];
            var dropBrowserLinkRequests = function (envelope) {
                if (envelope.baseType === RemoteDependencyData.dataType) {
                    var remoteData = envelope.baseData;
                    if (remoteData) {
                        for (var i = 0; i < browserLinkPaths_1.length; i++) {
                            if (remoteData.target && remoteData.target.indexOf(browserLinkPaths_1[i]) >= 0) {
                                return false;
                            }
                        }
                    }
                }
                return true;
            };
            this._addTelemetryInitializer(dropBrowserLinkRequests);
        }
    };
    ApplicationInsights.prototype._addTelemetryInitializer = function (telemetryInitializer) {
        this._telemetryInitializers.push(telemetryInitializer);
    };
    ApplicationInsights.prototype._sendCORSException = function (url) {
        var exception = {
            message: "Script error: The browser's same-origin policy prevents us from getting the details of this exception. Consider using the 'crossorigin' attribute.",
            url: url,
            lineNumber: 0,
            columnNumber: 0,
            error: undefined
        };
        var telemetryItem = TelemetryItemCreator.create(exception, Exception.dataType, Exception.envelopeType, this.diagLog(), { url: url });
        this.core.track(telemetryItem);
    };
    ApplicationInsights.Version = "2.5.2"; // Not currently used anywhere
    return ApplicationInsights;
}(BaseTelemetryPlugin));
export { ApplicationInsights };
/**
 * Used to record timed events and page views.
 */
var Timing = /** @class */ (function () {
    function Timing(logger, name) {
        this._name = name;
        this._events = {};
        this._logger = logger;
    }
    Timing.prototype.start = function (name) {
        if (typeof this._events[name] !== "undefined") {
            this._logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.StartCalledMoreThanOnce, "start was called more than once for this event without calling stop.", { name: this._name, key: name }, true);
        }
        this._events[name] = +new Date;
    };
    Timing.prototype.stop = function (name, url, properties, measurements) {
        var start = this._events[name];
        if (isNaN(start)) {
            this._logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.StopCalledWithoutStart, "stop was called without a corresponding start.", { name: this._name, key: name }, true);
        }
        else {
            var end = +new Date;
            var duration = DateTimeUtils.GetDuration(start, end);
            this.action(name, url, duration, properties, measurements);
        }
        delete this._events[name];
        this._events[name] = undefined;
    };
    return Timing;
}());
//# sourceMappingURL=ApplicationInsights.js.map