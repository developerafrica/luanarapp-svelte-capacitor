
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        select.selectedIndex = -1; // no option should be selected
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.50.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /**
     * @typedef {Object} WrappedComponent Object returned by the `wrap` method
     * @property {SvelteComponent} component - Component to load (this is always asynchronous)
     * @property {RoutePrecondition[]} [conditions] - Route pre-conditions to validate
     * @property {Object} [props] - Optional dictionary of static props
     * @property {Object} [userData] - Optional user data dictionary
     * @property {bool} _sveltesparouter - Internal flag; always set to true
     */

    /**
     * @callback AsyncSvelteComponent
     * @returns {Promise<SvelteComponent>} Returns a Promise that resolves with a Svelte component
     */

    /**
     * @callback RoutePrecondition
     * @param {RouteDetail} detail - Route detail object
     * @returns {boolean|Promise<boolean>} If the callback returns a false-y value, it's interpreted as the precondition failed, so it aborts loading the component (and won't process other pre-condition callbacks)
     */

    /**
     * @typedef {Object} WrapOptions Options object for the call to `wrap`
     * @property {SvelteComponent} [component] - Svelte component to load (this is incompatible with `asyncComponent`)
     * @property {AsyncSvelteComponent} [asyncComponent] - Function that returns a Promise that fulfills with a Svelte component (e.g. `{asyncComponent: () => import('Foo.svelte')}`)
     * @property {SvelteComponent} [loadingComponent] - Svelte component to be displayed while the async route is loading (as a placeholder); when unset or false-y, no component is shown while component
     * @property {object} [loadingParams] - Optional dictionary passed to the `loadingComponent` component as params (for an exported prop called `params`)
     * @property {object} [userData] - Optional object that will be passed to events such as `routeLoading`, `routeLoaded`, `conditionsFailed`
     * @property {object} [props] - Optional key-value dictionary of static props that will be passed to the component. The props are expanded with {...props}, so the key in the dictionary becomes the name of the prop.
     * @property {RoutePrecondition[]|RoutePrecondition} [conditions] - Route pre-conditions to add, which will be executed in order
     */

    /**
     * Wraps a component to enable multiple capabilities:
     * 1. Using dynamically-imported component, with (e.g. `{asyncComponent: () => import('Foo.svelte')}`), which also allows bundlers to do code-splitting.
     * 2. Adding route pre-conditions (e.g. `{conditions: [...]}`)
     * 3. Adding static props that are passed to the component
     * 4. Adding custom userData, which is passed to route events (e.g. route loaded events) or to route pre-conditions (e.g. `{userData: {foo: 'bar}}`)
     * 
     * @param {WrapOptions} args - Arguments object
     * @returns {WrappedComponent} Wrapped component
     */
    function wrap$1(args) {
        if (!args) {
            throw Error('Parameter args is required')
        }

        // We need to have one and only one of component and asyncComponent
        // This does a "XNOR"
        if (!args.component == !args.asyncComponent) {
            throw Error('One and only one of component and asyncComponent is required')
        }

        // If the component is not async, wrap it into a function returning a Promise
        if (args.component) {
            args.asyncComponent = () => Promise.resolve(args.component);
        }

        // Parameter asyncComponent and each item of conditions must be functions
        if (typeof args.asyncComponent != 'function') {
            throw Error('Parameter asyncComponent must be a function')
        }
        if (args.conditions) {
            // Ensure it's an array
            if (!Array.isArray(args.conditions)) {
                args.conditions = [args.conditions];
            }
            for (let i = 0; i < args.conditions.length; i++) {
                if (!args.conditions[i] || typeof args.conditions[i] != 'function') {
                    throw Error('Invalid parameter conditions[' + i + ']')
                }
            }
        }

        // Check if we have a placeholder component
        if (args.loadingComponent) {
            args.asyncComponent.loading = args.loadingComponent;
            args.asyncComponent.loadingParams = args.loadingParams || undefined;
        }

        // Returns an object that contains all the functions to execute too
        // The _sveltesparouter flag is to confirm the object was created by this router
        const obj = {
            component: args.asyncComponent,
            userData: args.userData,
            conditions: (args.conditions && args.conditions.length) ? args.conditions : undefined,
            props: (args.props && Object.keys(args.props).length) ? args.props : {},
            _sveltesparouter: true
        };

        return obj
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function parse(str, loose) {
    	if (str instanceof RegExp) return { keys:false, pattern:str };
    	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
    	arr[0] || arr.shift();

    	while (tmp = arr.shift()) {
    		c = tmp[0];
    		if (c === '*') {
    			keys.push('wild');
    			pattern += '/(.*)';
    		} else if (c === ':') {
    			o = tmp.indexOf('?', 1);
    			ext = tmp.indexOf('.', 1);
    			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
    			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
    			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
    		} else {
    			pattern += '/' + tmp;
    		}
    	}

    	return {
    		keys: keys,
    		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    	};
    }

    /* node_modules\svelte-spa-router\Router.svelte generated by Svelte v3.50.1 */

    const { Error: Error_1$1, Object: Object_1, console: console_1$2 } = globals;

    // (251:0) {:else}
    function create_else_block(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*props*/ 4)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*props*/ ctx[2])])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(251:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (244:0) {#if componentParams}
    function create_if_block$5(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ params: /*componentParams*/ ctx[1] }, /*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*componentParams, props*/ 6)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*componentParams*/ 2 && { params: /*componentParams*/ ctx[1] },
    					dirty & /*props*/ 4 && get_spread_object(/*props*/ ctx[2])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(244:0) {#if componentParams}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$5, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*componentParams*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1$1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function wrap(component, userData, ...conditions) {
    	// Use the new wrap method and show a deprecation warning
    	// eslint-disable-next-line no-console
    	console.warn('Method `wrap` from `svelte-spa-router` is deprecated and will be removed in a future version. Please use `svelte-spa-router/wrap` instead. See http://bit.ly/svelte-spa-router-upgrading');

    	return wrap$1({ component, userData, conditions });
    }

    /**
     * @typedef {Object} Location
     * @property {string} location - Location (page/view), for example `/book`
     * @property {string} [querystring] - Querystring from the hash, as a string not parsed
     */
    /**
     * Returns the current location from the hash.
     *
     * @returns {Location} Location object
     * @private
     */
    function getLocation() {
    	const hashPosition = window.location.href.indexOf('#/');

    	let location = hashPosition > -1
    	? window.location.href.substr(hashPosition + 1)
    	: '/';

    	// Check if there's a querystring
    	const qsPosition = location.indexOf('?');

    	let querystring = '';

    	if (qsPosition > -1) {
    		querystring = location.substr(qsPosition + 1);
    		location = location.substr(0, qsPosition);
    	}

    	return { location, querystring };
    }

    const loc = readable(null, // eslint-disable-next-line prefer-arrow-callback
    function start(set) {
    	set(getLocation());

    	const update = () => {
    		set(getLocation());
    	};

    	window.addEventListener('hashchange', update, false);

    	return function stop() {
    		window.removeEventListener('hashchange', update, false);
    	};
    });

    const location = derived(loc, $loc => $loc.location);
    const querystring = derived(loc, $loc => $loc.querystring);
    const params = writable(undefined);

    async function push(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	// Note: this will include scroll state in history even when restoreScrollState is false
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined,
    		undefined
    	);

    	window.location.hash = (location.charAt(0) == '#' ? '' : '#') + location;
    }

    async function pop() {
    	// Execute this code when the current call stack is complete
    	await tick();

    	window.history.back();
    }

    async function replace(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	const dest = (location.charAt(0) == '#' ? '' : '#') + location;

    	try {
    		const newState = { ...history.state };
    		delete newState['__svelte_spa_router_scrollX'];
    		delete newState['__svelte_spa_router_scrollY'];
    		window.history.replaceState(newState, undefined, dest);
    	} catch(e) {
    		// eslint-disable-next-line no-console
    		console.warn('Caught exception while replacing the current page. If you\'re running this in the Svelte REPL, please note that the `replace` method might not work in this environment.');
    	}

    	// The method above doesn't trigger the hashchange event, so let's do that manually
    	window.dispatchEvent(new Event('hashchange'));
    }

    function link(node, opts) {
    	opts = linkOpts(opts);

    	// Only apply to <a> tags
    	if (!node || !node.tagName || node.tagName.toLowerCase() != 'a') {
    		throw Error('Action "link" can only be used with <a> tags');
    	}

    	updateLink(node, opts);

    	return {
    		update(updated) {
    			updated = linkOpts(updated);
    			updateLink(node, updated);
    		}
    	};
    }

    // Internal function used by the link function
    function updateLink(node, opts) {
    	let href = opts.href || node.getAttribute('href');

    	// Destination must start with '/' or '#/'
    	if (href && href.charAt(0) == '/') {
    		// Add # to the href attribute
    		href = '#' + href;
    	} else if (!href || href.length < 2 || href.slice(0, 2) != '#/') {
    		throw Error('Invalid value for "href" attribute: ' + href);
    	}

    	node.setAttribute('href', href);

    	node.addEventListener('click', event => {
    		// Prevent default anchor onclick behaviour
    		event.preventDefault();

    		if (!opts.disabled) {
    			scrollstateHistoryHandler(event.currentTarget.getAttribute('href'));
    		}
    	});
    }

    // Internal function that ensures the argument of the link action is always an object
    function linkOpts(val) {
    	if (val && typeof val == 'string') {
    		return { href: val };
    	} else {
    		return val || {};
    	}
    }

    /**
     * The handler attached to an anchor tag responsible for updating the
     * current history state with the current scroll state
     *
     * @param {string} href - Destination
     */
    function scrollstateHistoryHandler(href) {
    	// Setting the url (3rd arg) to href will break clicking for reasons, so don't try to do that
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined,
    		undefined
    	);

    	// This will force an update as desired, but this time our scroll state will be attached
    	window.location.hash = href;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, []);
    	let { routes = {} } = $$props;
    	let { prefix = '' } = $$props;
    	let { restoreScrollState = false } = $$props;

    	/**
     * Container for a route: path, component
     */
    	class RouteItem {
    		/**
     * Initializes the object and creates a regular expression from the path, using regexparam.
     *
     * @param {string} path - Path to the route (must start with '/' or '*')
     * @param {SvelteComponent|WrappedComponent} component - Svelte component for the route, optionally wrapped
     */
    		constructor(path, component) {
    			if (!component || typeof component != 'function' && (typeof component != 'object' || component._sveltesparouter !== true)) {
    				throw Error('Invalid component object');
    			}

    			// Path must be a regular or expression, or a string starting with '/' or '*'
    			if (!path || typeof path == 'string' && (path.length < 1 || path.charAt(0) != '/' && path.charAt(0) != '*') || typeof path == 'object' && !(path instanceof RegExp)) {
    				throw Error('Invalid value for "path" argument - strings must start with / or *');
    			}

    			const { pattern, keys } = parse(path);
    			this.path = path;

    			// Check if the component is wrapped and we have conditions
    			if (typeof component == 'object' && component._sveltesparouter === true) {
    				this.component = component.component;
    				this.conditions = component.conditions || [];
    				this.userData = component.userData;
    				this.props = component.props || {};
    			} else {
    				// Convert the component to a function that returns a Promise, to normalize it
    				this.component = () => Promise.resolve(component);

    				this.conditions = [];
    				this.props = {};
    			}

    			this._pattern = pattern;
    			this._keys = keys;
    		}

    		/**
     * Checks if `path` matches the current route.
     * If there's a match, will return the list of parameters from the URL (if any).
     * In case of no match, the method will return `null`.
     *
     * @param {string} path - Path to test
     * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
     */
    		match(path) {
    			// If there's a prefix, check if it matches the start of the path.
    			// If not, bail early, else remove it before we run the matching.
    			if (prefix) {
    				if (typeof prefix == 'string') {
    					if (path.startsWith(prefix)) {
    						path = path.substr(prefix.length) || '/';
    					} else {
    						return null;
    					}
    				} else if (prefix instanceof RegExp) {
    					const match = path.match(prefix);

    					if (match && match[0]) {
    						path = path.substr(match[0].length) || '/';
    					} else {
    						return null;
    					}
    				}
    			}

    			// Check if the pattern matches
    			const matches = this._pattern.exec(path);

    			if (matches === null) {
    				return null;
    			}

    			// If the input was a regular expression, this._keys would be false, so return matches as is
    			if (this._keys === false) {
    				return matches;
    			}

    			const out = {};
    			let i = 0;

    			while (i < this._keys.length) {
    				// In the match parameters, URL-decode all values
    				try {
    					out[this._keys[i]] = decodeURIComponent(matches[i + 1] || '') || null;
    				} catch(e) {
    					out[this._keys[i]] = null;
    				}

    				i++;
    			}

    			return out;
    		}

    		/**
     * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoading`, `routeLoaded` and `conditionsFailed` events
     * @typedef {Object} RouteDetail
     * @property {string|RegExp} route - Route matched as defined in the route definition (could be a string or a reguar expression object)
     * @property {string} location - Location path
     * @property {string} querystring - Querystring from the hash
     * @property {object} [userData] - Custom data passed by the user
     * @property {SvelteComponent} [component] - Svelte component (only in `routeLoaded` events)
     * @property {string} [name] - Name of the Svelte component (only in `routeLoaded` events)
     */
    		/**
     * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
     * 
     * @param {RouteDetail} detail - Route detail
     * @returns {boolean} Returns true if all the conditions succeeded
     */
    		async checkConditions(detail) {
    			for (let i = 0; i < this.conditions.length; i++) {
    				if (!await this.conditions[i](detail)) {
    					return false;
    				}
    			}

    			return true;
    		}
    	}

    	// Set up all routes
    	const routesList = [];

    	if (routes instanceof Map) {
    		// If it's a map, iterate on it right away
    		routes.forEach((route, path) => {
    			routesList.push(new RouteItem(path, route));
    		});
    	} else {
    		// We have an object, so iterate on its own properties
    		Object.keys(routes).forEach(path => {
    			routesList.push(new RouteItem(path, routes[path]));
    		});
    	}

    	// Props for the component to render
    	let component = null;

    	let componentParams = null;
    	let props = {};

    	// Event dispatcher from Svelte
    	const dispatch = createEventDispatcher();

    	// Just like dispatch, but executes on the next iteration of the event loop
    	async function dispatchNextTick(name, detail) {
    		// Execute this code when the current call stack is complete
    		await tick();

    		dispatch(name, detail);
    	}

    	// If this is set, then that means we have popped into this var the state of our last scroll position
    	let previousScrollState = null;

    	let popStateChanged = null;

    	if (restoreScrollState) {
    		popStateChanged = event => {
    			// If this event was from our history.replaceState, event.state will contain
    			// our scroll history. Otherwise, event.state will be null (like on forward
    			// navigation)
    			if (event.state && event.state.__svelte_spa_router_scrollY) {
    				previousScrollState = event.state;
    			} else {
    				previousScrollState = null;
    			}
    		};

    		// This is removed in the destroy() invocation below
    		window.addEventListener('popstate', popStateChanged);

    		afterUpdate(() => {
    			// If this exists, then this is a back navigation: restore the scroll position
    			if (previousScrollState) {
    				window.scrollTo(previousScrollState.__svelte_spa_router_scrollX, previousScrollState.__svelte_spa_router_scrollY);
    			} else {
    				// Otherwise this is a forward navigation: scroll to top
    				window.scrollTo(0, 0);
    			}
    		});
    	}

    	// Always have the latest value of loc
    	let lastLoc = null;

    	// Current object of the component loaded
    	let componentObj = null;

    	// Handle hash change events
    	// Listen to changes in the $loc store and update the page
    	// Do not use the $: syntax because it gets triggered by too many things
    	const unsubscribeLoc = loc.subscribe(async newLoc => {
    		lastLoc = newLoc;

    		// Find a route matching the location
    		let i = 0;

    		while (i < routesList.length) {
    			const match = routesList[i].match(newLoc.location);

    			if (!match) {
    				i++;
    				continue;
    			}

    			const detail = {
    				route: routesList[i].path,
    				location: newLoc.location,
    				querystring: newLoc.querystring,
    				userData: routesList[i].userData,
    				params: match && typeof match == 'object' && Object.keys(match).length
    				? match
    				: null
    			};

    			// Check if the route can be loaded - if all conditions succeed
    			if (!await routesList[i].checkConditions(detail)) {
    				// Don't display anything
    				$$invalidate(0, component = null);

    				componentObj = null;

    				// Trigger an event to notify the user, then exit
    				dispatchNextTick('conditionsFailed', detail);

    				return;
    			}

    			// Trigger an event to alert that we're loading the route
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoading', Object.assign({}, detail));

    			// If there's a component to show while we're loading the route, display it
    			const obj = routesList[i].component;

    			// Do not replace the component if we're loading the same one as before, to avoid the route being unmounted and re-mounted
    			if (componentObj != obj) {
    				if (obj.loading) {
    					$$invalidate(0, component = obj.loading);
    					componentObj = obj;
    					$$invalidate(1, componentParams = obj.loadingParams);
    					$$invalidate(2, props = {});

    					// Trigger the routeLoaded event for the loading component
    					// Create a copy of detail so we don't modify the object for the dynamic route (and the dynamic route doesn't modify our object too)
    					dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    						component,
    						name: component.name,
    						params: componentParams
    					}));
    				} else {
    					$$invalidate(0, component = null);
    					componentObj = null;
    				}

    				// Invoke the Promise
    				const loaded = await obj();

    				// Now that we're here, after the promise resolved, check if we still want this component, as the user might have navigated to another page in the meanwhile
    				if (newLoc != lastLoc) {
    					// Don't update the component, just exit
    					return;
    				}

    				// If there is a "default" property, which is used by async routes, then pick that
    				$$invalidate(0, component = loaded && loaded.default || loaded);

    				componentObj = obj;
    			}

    			// Set componentParams only if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
    			// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
    			if (match && typeof match == 'object' && Object.keys(match).length) {
    				$$invalidate(1, componentParams = match);
    			} else {
    				$$invalidate(1, componentParams = null);
    			}

    			// Set static props, if any
    			$$invalidate(2, props = routesList[i].props);

    			// Dispatch the routeLoaded event then exit
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    				component,
    				name: component.name,
    				params: componentParams
    			})).then(() => {
    				params.set(componentParams);
    			});

    			return;
    		}

    		// If we're still here, there was no match, so show the empty component
    		$$invalidate(0, component = null);

    		componentObj = null;
    		params.set(undefined);
    	});

    	onDestroy(() => {
    		unsubscribeLoc();
    		popStateChanged && window.removeEventListener('popstate', popStateChanged);
    	});

    	const writable_props = ['routes', 'prefix', 'restoreScrollState'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$2.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	function routeEvent_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function routeEvent_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    	};

    	$$self.$capture_state = () => ({
    		readable,
    		writable,
    		derived,
    		tick,
    		_wrap: wrap$1,
    		wrap,
    		getLocation,
    		loc,
    		location,
    		querystring,
    		params,
    		push,
    		pop,
    		replace,
    		link,
    		updateLink,
    		linkOpts,
    		scrollstateHistoryHandler,
    		onDestroy,
    		createEventDispatcher,
    		afterUpdate,
    		parse,
    		routes,
    		prefix,
    		restoreScrollState,
    		RouteItem,
    		routesList,
    		component,
    		componentParams,
    		props,
    		dispatch,
    		dispatchNextTick,
    		previousScrollState,
    		popStateChanged,
    		lastLoc,
    		componentObj,
    		unsubscribeLoc
    	});

    	$$self.$inject_state = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    		if ('component' in $$props) $$invalidate(0, component = $$props.component);
    		if ('componentParams' in $$props) $$invalidate(1, componentParams = $$props.componentParams);
    		if ('props' in $$props) $$invalidate(2, props = $$props.props);
    		if ('previousScrollState' in $$props) previousScrollState = $$props.previousScrollState;
    		if ('popStateChanged' in $$props) popStateChanged = $$props.popStateChanged;
    		if ('lastLoc' in $$props) lastLoc = $$props.lastLoc;
    		if ('componentObj' in $$props) componentObj = $$props.componentObj;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*restoreScrollState*/ 32) {
    			// Update history.scrollRestoration depending on restoreScrollState
    			history.scrollRestoration = restoreScrollState ? 'manual' : 'auto';
    		}
    	};

    	return [
    		component,
    		componentParams,
    		props,
    		routes,
    		prefix,
    		restoreScrollState,
    		routeEvent_handler,
    		routeEvent_handler_1
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {
    			routes: 3,
    			prefix: 4,
    			restoreScrollState: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get routes() {
    		throw new Error_1$1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routes(value) {
    		throw new Error_1$1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prefix() {
    		throw new Error_1$1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prefix(value) {
    		throw new Error_1$1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get restoreScrollState() {
    		throw new Error_1$1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set restoreScrollState(value) {
    		throw new Error_1$1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    class UuidObj {

        static idOne() {

            const str = 'abcdefghijklm';
            const num = Math.floor(Math.random() * 13);
            const strNum = num - 1;

            const subStr = str.substring(strNum, num);
            const idNum = Math.floor(Math.random() * 9);

            return `${subStr}${idNum}`

        };
        static idTwo() {

            const str = 'nopqrstuvwxyz';
            const num = Math.floor(Math.random() * 13);
            const strNum = num - 1;

            const subStr = str.substring(strNum, num);
            const idNum = Math.floor(Math.random() * 9);

            return `${subStr}${idNum}`

        };
        static uuid() {
            const idOne = this.idOne();
            const idTwo = this.idTwo();

            const id = `${idOne}${idTwo}`;



            if (id.length == 3) {

                const num = `${Math.floor(Math.random() * 9)}`;

                const idMod = id + num;

                return idMod;

            } else if (id.length == 2) {

                const numM1 = `${Math.floor(Math.random() * 9)}`;
                const numM2 = `${Math.floor(Math.random() * 9)}`;

                const idMod2 = id + numM1 + numM2;

                return idMod2;


            } else {
                return id;
            }    };
    }

    let ads = [], message$1 = [], reads =[];




    //parameters
    let programmeName = "BAGR";
    let yearNumber = 4;
    let semesterNumber = 1;
    let versionNumber = "1.1.1";
    let siteName = "https://butaopeter.netlify.app";
    let mailName = "peterethanbutao:gmail.com";



    class CommonObj {
        constructor(prog, sy, sem, ver, aut, air, tnm, site, mail) {
            this.programme = prog;
            this.studyYear = sy;
            this.semester = sem;
            this.version = ver;
            this.authour = aut;
            this.phone = {
                airtel: air,
                tnm: tnm
            },
                this.website = site;
            this.gmail = mail;
        }
    }

    const common = [new CommonObj(programmeName, yearNumber, semesterNumber, versionNumber, "peter butao", "0991894703", "0880164455", siteName, mailName)];


    class WeekdayObj {
        constructor(wd, dy, intm, fntm, loc, typ) {
            this.weekday = wd;
                this.day = dy;
            this.initialTime = `${intm}:00`;
                this.finalTime = `${fntm}:00`;
                this.location = loc.toUpperCase();
                this.type = typ;
                this.hours = fntm - intm;
        }
    }



    class CourseObj {
        constructor(crs, cd, typ, gpa, wd) {
            this.id = UuidObj.uuid();
            this.date = CourseObj.date();
            this.course = crs.toUpperCase();
            this.type = typ;
            this.gpa = gpa;
            this.code = cd;
            this.weekdays = wd;
        }
        static date() {
            return new Date().getDate()
        }

    }



    const courses = [
        //monday
        new CourseObj("HYDROLOGY AND AGRO-METEOROLOGY","IRE311","NON CORE",3.0,
            [
                new WeekdayObj("Monday",1, "07", "08", "ROOM 2", "LECTURE"),
                new WeekdayObj("Monday",1, "10", "12", "LT 2", "LECTURE"),
                
                
            ] 
        ),
        new CourseObj("AGRONOMY OF INDUSTRIAL CROPS","AGN413","CORE",3.0,
            [
                new WeekdayObj("Monday",1, "14", "16", "LT 2", "LECTURE"),
                new WeekdayObj("Tuesday",2, "10", "12", "LAB / FIELD", "PRACTICAL")
               
                
            ] 
            ),
        //TUESDAY//
        new CourseObj("MUSHROOM PRODUCTION TECHNOLOGY","HOR313","NON CORE",3.0,
            [

                new WeekdayObj("Tuesday",2, "09", "10", "LT 5", "LECTURE"),
                new WeekdayObj("Wednesday", 3, "13", "15", "PLANT LAB ", "PRACTICAL"),
                new WeekdayObj("Thursday",4, "09", "10", "LT 6", "LECTURE")
                
            ] 
        ),

        new CourseObj("RUMINANT PRODUCTION","ANS418","NON CORE",3.5,
            [
                new WeekdayObj("Tuesday",2, "13", "14", "LT 6", "LECTURE"),
                new WeekdayObj("Wednesday", 3, "12", "13", "LT 6", "LECTURE"),
                new WeekdayObj("Friday",5, "13", "15", "ANS LAB", "PRACTICAL")
                
            ] 
        ),
        //WEDNESDAY
        new CourseObj("ENTREPRENEURSHIP 1","ABM213","CORE",2.5,
            [

                new WeekdayObj("Wednesday", 3, "18", "20", "MPH ", "LECTURE"),
                new WeekdayObj("Thursday",4, "19", "20", "MPH", "LECTURE")
                
            ] 
        ),
        //
        //thursday
        new CourseObj("AGRICULTURAL ENTOMOLOGY","AGN416","CORE",2.5,
            [
                new WeekdayObj("Wednesday", 3, "11", "12", "LT 3", "TUTORIAL"),
                new WeekdayObj("Thursday", 4, "10", "12", "LT 2", "LECTURE")
                
            ] 
        )

    ];




    const data = writable({ courses, common, reads, message: message$1, ads });

    const message = [
        {
            messages : "uninstall previous versions to install newwer versions"
            
        },
        {
            messages : `<strong> LUANAR app</strong> may not work on older modile devices`
            
        },
        {       
             messages:   'the app is only valid for one semester, for subsequent semesters , request updates from the <a href="tel://0880164455">development team </a>'
        },
        {       
             messages:   'whatsapp the development <a href="tel://0880164455">@ 0880164455 </a>, to request personal features and report app problems '
        },
        {       
             messages:   'the app is open source, </ DEV > contact the <a href="tel://0880164455">development team </a> for contribitions  '
        },
        {       
            messages:  `<strong>LUANAR app</strong> uses local storage to store your reminders`
        },
        {       
             messages:   '<p style="color: red; text-align: center;font-weight:600;">⚠ MAKE SURE YOUR JAVASCRIPT <strong> IS NOT </strong> DISABLED, IN YOUR BROWSER SETTINGS ! </p>'
        },
       
        {       
             messages:  `<p style="text-align:center" >© COPYRIGHT | 2021 BUTAO PETER UX / UI DEV </p>`
        }
    ];

    /* src\routes\about.svelte generated by Svelte v3.50.1 */
    const file$e = "src\\routes\\about.svelte";

    function get_each_context$7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (56:40) {#each message as dt}
    function create_each_block$7(ctx) {
    	let p;
    	let raw_value = /*dt*/ ctx[1].messages + "";

    	const block = {
    		c: function create() {
    			p = element("p");
    			attr_dev(p, "class", "instruct svelte-a8lcsj");
    			add_location(p, file$e, 56, 40, 4014);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			p.innerHTML = raw_value;
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$7.name,
    		type: "each",
    		source: "(56:40) {#each message as dt}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let article1;
    	let article0;
    	let main1;
    	let div5;
    	let div0;
    	let h10;
    	let t1;
    	let div1;
    	let a0;
    	let img;
    	let img_src_value;
    	let t2;
    	let div2;
    	let p0;
    	let t3_value = /*$data*/ ctx[0].common[0].programme + "";
    	let t3;
    	let t4;
    	let div3;
    	let p1;
    	let t6;
    	let div4;
    	let p2;
    	let t7;
    	let t8_value = /*$data*/ ctx[0].common[0].version + "";
    	let t8;
    	let t9;
    	let div9;
    	let div8;
    	let main0;
    	let div7;
    	let ul0;
    	let br;
    	let t10;
    	let p3;
    	let t12;
    	let div6;
    	let li0;
    	let a1;
    	let t14;
    	let li1;
    	let a2;
    	let t16;
    	let li2;
    	let a3;
    	let t18;
    	let ul1;
    	let li3;
    	let h11;
    	let t20;
    	let li4;
    	let svg;
    	let defs;
    	let clipPath;
    	let rect0;
    	let linearGradient;
    	let stop0;
    	let stop1;
    	let stop2;
    	let g5;
    	let g0;
    	let path0;
    	let rect1;
    	let g1;
    	let path1;
    	let rect2;
    	let g2;
    	let path2;
    	let rect3;
    	let g3;
    	let path3;
    	let rect4;
    	let g4;
    	let path4;
    	let rect5;
    	let t21;
    	let ul2;
    	let li5;
    	let h12;
    	let t23;
    	let li6;
    	let t24;
    	let ul3;
    	let li7;
    	let h13;
    	let t26;
    	let li8;
    	let a4;
    	let t28;
    	let footer;
    	let div11;
    	let p4;
    	let t30;
    	let div10;
    	let h14;
    	let t32;
    	let p5;
    	let t34;
    	let h15;
    	let each_value = message;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			article1 = element("article");
    			article0 = element("article");
    			main1 = element("main");
    			div5 = element("div");
    			div0 = element("div");
    			h10 = element("h1");
    			h10.textContent = "LUANAR APP";
    			t1 = space();
    			div1 = element("div");
    			a0 = element("a");
    			img = element("img");
    			t2 = space();
    			div2 = element("div");
    			p0 = element("p");
    			t3 = text(t3_value);
    			t4 = space();
    			div3 = element("div");
    			p1 = element("p");
    			p1.textContent = "© COPYRIGHT | 2022 BUTAO PETER UX / UI DEV";
    			t6 = space();
    			div4 = element("div");
    			p2 = element("p");
    			t7 = text("version ");
    			t8 = text(t8_value);
    			t9 = space();
    			div9 = element("div");
    			div8 = element("div");
    			main0 = element("main");
    			div7 = element("div");
    			ul0 = element("ul");
    			br = element("br");
    			t10 = space();
    			p3 = element("p");
    			p3.textContent = "get in touch with the development team ↪";
    			t12 = space();
    			div6 = element("div");
    			li0 = element("li");
    			a1 = element("a");
    			a1.textContent = "peterethanbutao@gmail.com";
    			t14 = space();
    			li1 = element("li");
    			a2 = element("a");
    			a2.textContent = "peterbutao.netlify.app";
    			t16 = space();
    			li2 = element("li");
    			a3 = element("a");
    			a3.textContent = "0880164455";
    			t18 = space();
    			ul1 = element("ul");
    			li3 = element("li");
    			h11 = element("h1");
    			h11.textContent = "RATING";
    			t20 = space();
    			li4 = element("li");
    			svg = svg_element("svg");
    			defs = svg_element("defs");
    			clipPath = svg_element("clipPath");
    			rect0 = svg_element("rect");
    			linearGradient = svg_element("linearGradient");
    			stop0 = svg_element("stop");
    			stop1 = svg_element("stop");
    			stop2 = svg_element("stop");
    			g5 = svg_element("g");
    			g0 = svg_element("g");
    			path0 = svg_element("path");
    			rect1 = svg_element("rect");
    			g1 = svg_element("g");
    			path1 = svg_element("path");
    			rect2 = svg_element("rect");
    			g2 = svg_element("g");
    			path2 = svg_element("path");
    			rect3 = svg_element("rect");
    			g3 = svg_element("g");
    			path3 = svg_element("path");
    			rect4 = svg_element("rect");
    			g4 = svg_element("g");
    			path4 = svg_element("path");
    			rect5 = svg_element("rect");
    			t21 = space();
    			ul2 = element("ul");
    			li5 = element("li");
    			h12 = element("h1");
    			h12.textContent = "READ ME";
    			t23 = space();
    			li6 = element("li");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t24 = space();
    			ul3 = element("ul");
    			li7 = element("li");
    			h13 = element("h1");
    			h13.textContent = "APP INFO";
    			t26 = space();
    			li8 = element("li");
    			a4 = element("a");
    			a4.textContent = "Licence ↪";
    			t28 = space();
    			footer = element("footer");
    			div11 = element("div");
    			p4 = element("p");
    			p4.textContent = "in association with";
    			t30 = space();
    			div10 = element("div");
    			h14 = element("h1");
    			h14.textContent = "developerafrica | 2022";
    			t32 = space();
    			p5 = element("p");
    			p5.textContent = "&";
    			t34 = space();
    			h15 = element("h1");
    			h15.textContent = "makahouse";
    			attr_dev(h10, "class", "svelte-a8lcsj");
    			add_location(h10, file$e, 11, 24, 315);
    			attr_dev(div0, "class", "upper-txt");
    			add_location(div0, file$e, 10, 20, 266);
    			if (!src_url_equal(img.src, img_src_value = "/logo.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "luanar logo");
    			attr_dev(img, "class", "svelte-a8lcsj");
    			add_location(img, file$e, 15, 28, 495);
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "svelte-a8lcsj");
    			add_location(a0, file$e, 14, 24, 429);
    			attr_dev(div1, "class", "logo svelte-a8lcsj");
    			add_location(div1, file$e, 13, 20, 385);
    			attr_dev(p0, "class", "svelte-a8lcsj");
    			add_location(p0, file$e, 19, 24, 664);
    			attr_dev(div2, "class", "bottom-txt");
    			add_location(div2, file$e, 18, 20, 614);
    			attr_dev(p1, "class", "svelte-a8lcsj");
    			add_location(p1, file$e, 22, 28, 804);
    			attr_dev(div3, "class", "foot-txt");
    			add_location(div3, file$e, 21, 24, 752);
    			attr_dev(p2, "class", "svelte-a8lcsj");
    			add_location(p2, file$e, 26, 24, 959);
    			attr_dev(div4, "class", "bottom-txt");
    			add_location(div4, file$e, 25, 20, 909);
    			attr_dev(div5, "class", "mn-one svelte-a8lcsj");
    			add_location(div5, file$e, 9, 16, 224);
    			add_location(br, file$e, 37, 36, 1324);
    			attr_dev(p3, "class", "notfy svelte-a8lcsj");
    			add_location(p3, file$e, 39, 36, 1404);
    			attr_dev(a1, "href", "mailto://peterethanbutao@gmail.com");
    			attr_dev(a1, "class", "svelte-a8lcsj");
    			add_location(a1, file$e, 42, 44, 1583);
    			attr_dev(li0, "class", "svelte-a8lcsj");
    			add_location(li0, file$e, 42, 40, 1579);
    			attr_dev(a2, "href", "https://www.butaopeter.netlify.app");
    			attr_dev(a2, "class", "svelte-a8lcsj");
    			add_location(a2, file$e, 43, 44, 1708);
    			attr_dev(li1, "class", "svelte-a8lcsj");
    			add_location(li1, file$e, 43, 40, 1704);
    			attr_dev(a3, "href", "tel://0880164455");
    			attr_dev(a3, "class", "svelte-a8lcsj");
    			add_location(a3, file$e, 44, 44, 1830);
    			attr_dev(li2, "class", "svelte-a8lcsj");
    			add_location(li2, file$e, 44, 40, 1826);
    			attr_dev(div6, "class", "cd svelte-a8lcsj");
    			add_location(div6, file$e, 40, 36, 1519);
    			attr_dev(ul0, "class", "svelte-a8lcsj");
    			add_location(ul0, file$e, 36, 32, 1282);
    			attr_dev(h11, "class", "svelte-a8lcsj");
    			add_location(h11, file$e, 48, 40, 2039);
    			attr_dev(li3, "class", "svelte-a8lcsj");
    			add_location(li3, file$e, 48, 36, 2035);
    			attr_dev(rect0, "width", "16");
    			attr_dev(rect0, "height", "16");
    			attr_dev(rect0, "fill", "none");
    			add_location(rect0, file$e, 49, 191, 2252);
    			attr_dev(clipPath, "id", "a");
    			add_location(clipPath, file$e, 49, 174, 2235);
    			attr_dev(stop0, "offset", "0");
    			attr_dev(stop0, "stop-color", "#2699fb");
    			add_location(stop0, file$e, 49, 344, 2405);
    			attr_dev(stop1, "offset", "0.498");
    			attr_dev(stop1, "stop-color", "#175b95");
    			add_location(stop1, file$e, 49, 383, 2444);
    			attr_dev(stop2, "offset", "1");
    			add_location(stop2, file$e, 49, 426, 2487);
    			attr_dev(linearGradient, "id", "e");
    			attr_dev(linearGradient, "x1", "0.124");
    			attr_dev(linearGradient, "y1", "0.42");
    			attr_dev(linearGradient, "x2", "0.544");
    			attr_dev(linearGradient, "y2", "0.454");
    			attr_dev(linearGradient, "gradientUnits", "objectBoundingBox");
    			add_location(linearGradient, file$e, 49, 244, 2305);
    			add_location(defs, file$e, 49, 168, 2229);
    			attr_dev(path0, "d", "M8,0l2.5,5,5.5.8L12,9.7l.9,5.5L8,12.6,3.1,15.2,4,9.7,0,5.8,5.5,5Z");
    			attr_dev(path0, "fill", "#2699fb");
    			add_location(path0, file$e, 49, 571, 2632);
    			attr_dev(rect1, "width", "16");
    			attr_dev(rect1, "height", "16");
    			attr_dev(rect1, "transform", "translate(0 0)");
    			attr_dev(rect1, "fill", "none");
    			add_location(rect1, file$e, 49, 663, 2724);
    			attr_dev(g0, "transform", "translate(54 618)");
    			attr_dev(g0, "clip-path", "url(#a)");
    			add_location(g0, file$e, 49, 518, 2579);
    			attr_dev(path1, "d", "M8,0l2.5,5,5.5.8L12,9.7l.9,5.5L8,12.6,3.1,15.2,4,9.7,0,5.8,5.5,5Z");
    			attr_dev(path1, "fill", "#2699fb");
    			add_location(path1, file$e, 49, 789, 2850);
    			attr_dev(rect2, "width", "16");
    			attr_dev(rect2, "height", "16");
    			attr_dev(rect2, "transform", "translate(0 0)");
    			attr_dev(rect2, "fill", "none");
    			add_location(rect2, file$e, 49, 881, 2942);
    			attr_dev(g1, "transform", "translate(78 618)");
    			attr_dev(g1, "clip-path", "url(#a)");
    			add_location(g1, file$e, 49, 736, 2797);
    			attr_dev(path2, "d", "M8,0l2.5,5,5.5.8L12,9.7l.9,5.5L8,12.6,3.1,15.2,4,9.7,0,5.8,5.5,5Z");
    			attr_dev(path2, "fill", "#2699fb");
    			add_location(path2, file$e, 49, 1008, 3069);
    			attr_dev(rect3, "width", "16");
    			attr_dev(rect3, "height", "16");
    			attr_dev(rect3, "transform", "translate(0 0)");
    			attr_dev(rect3, "fill", "none");
    			add_location(rect3, file$e, 49, 1100, 3161);
    			attr_dev(g2, "transform", "translate(102 618)");
    			attr_dev(g2, "clip-path", "url(#a)");
    			add_location(g2, file$e, 49, 954, 3015);
    			attr_dev(path3, "d", "M8,0l2.5,5,5.5.8L12,9.7l.9,5.5L8,12.6,3.1,15.2,4,9.7,0,5.8,5.5,5Z");
    			attr_dev(path3, "fill", "url(#e)");
    			add_location(path3, file$e, 49, 1227, 3288);
    			attr_dev(rect4, "width", "16");
    			attr_dev(rect4, "height", "16");
    			attr_dev(rect4, "transform", "translate(0 0)");
    			attr_dev(rect4, "fill", "none");
    			add_location(rect4, file$e, 49, 1319, 3380);
    			attr_dev(g3, "transform", "translate(126 618)");
    			attr_dev(g3, "clip-path", "url(#a)");
    			add_location(g3, file$e, 49, 1173, 3234);
    			attr_dev(path4, "d", "M8,0l2.5,5,5.5.8L12,9.7l.9,5.5L8,12.6,3.1,15.2,4,9.7,0,5.8,5.5,5Z");
    			add_location(path4, file$e, 49, 1446, 3507);
    			attr_dev(rect5, "width", "16");
    			attr_dev(rect5, "height", "16");
    			attr_dev(rect5, "transform", "translate(0 0)");
    			attr_dev(rect5, "fill", "none");
    			add_location(rect5, file$e, 49, 1523, 3584);
    			attr_dev(g4, "transform", "translate(150 618)");
    			attr_dev(g4, "clip-path", "url(#a)");
    			add_location(g4, file$e, 49, 1392, 3453);
    			attr_dev(g5, "transform", "translate(-54 -618)");
    			attr_dev(g5, "opacity", "0.52");
    			add_location(g5, file$e, 49, 468, 2529);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "width", "112");
    			attr_dev(svg, "height", "16");
    			attr_dev(svg, "viewBox", "0 0 112 16");
    			add_location(svg, file$e, 49, 40, 2101);
    			attr_dev(li4, "class", "svelte-a8lcsj");
    			add_location(li4, file$e, 49, 36, 2097);
    			attr_dev(ul1, "class", "svelte-a8lcsj");
    			add_location(ul1, file$e, 47, 32, 1993);
    			attr_dev(h12, "class", "svelte-a8lcsj");
    			add_location(h12, file$e, 52, 40, 3791);
    			attr_dev(li5, "class", "svelte-a8lcsj");
    			add_location(li5, file$e, 52, 36, 3787);
    			attr_dev(li6, "class", "inst-msg svelte-a8lcsj");
    			add_location(li6, file$e, 54, 36, 3888);
    			attr_dev(ul2, "class", "svelte-a8lcsj");
    			add_location(ul2, file$e, 51, 32, 3745);
    			attr_dev(h13, "class", "svelte-a8lcsj");
    			add_location(h13, file$e, 61, 40, 4268);
    			attr_dev(li7, "class", "svelte-a8lcsj");
    			add_location(li7, file$e, 61, 36, 4264);
    			attr_dev(a4, "class", "tos svelte-a8lcsj");
    			attr_dev(a4, "href", "/TOS.html");
    			add_location(a4, file$e, 63, 40, 4366);
    			attr_dev(li8, "class", "svelte-a8lcsj");
    			add_location(li8, file$e, 63, 36, 4362);
    			attr_dev(ul3, "class", "svelte-a8lcsj");
    			add_location(ul3, file$e, 60, 32, 4222);
    			attr_dev(div7, "class", "main");
    			add_location(div7, file$e, 34, 28, 1212);
    			attr_dev(main0, "class", "svelte-a8lcsj");
    			add_location(main0, file$e, 33, 24, 1176);
    			attr_dev(div8, "class", "paragraphs");
    			add_location(div8, file$e, 32, 20, 1126);
    			attr_dev(div9, "class", "mn-two svelte-a8lcsj");
    			add_location(div9, file$e, 31, 16, 1084);
    			attr_dev(main1, "class", "svelte-a8lcsj");
    			add_location(main1, file$e, 7, 8, 198);
    			attr_dev(p4, "class", "svelte-a8lcsj");
    			add_location(p4, file$e, 75, 16, 4731);
    			attr_dev(h14, "class", "svelte-a8lcsj");
    			add_location(h14, file$e, 77, 20, 4814);
    			attr_dev(p5, "class", "svelte-a8lcsj");
    			add_location(p5, file$e, 78, 20, 4867);
    			attr_dev(h15, "class", "svelte-a8lcsj");
    			add_location(h15, file$e, 79, 20, 4897);
    			attr_dev(div10, "class", "txt");
    			add_location(div10, file$e, 76, 16, 4775);
    			attr_dev(div11, "class", "ft svelte-a8lcsj");
    			add_location(div11, file$e, 74, 12, 4697);
    			add_location(footer, file$e, 73, 8, 4675);
    			attr_dev(article0, "class", "ints svelte-a8lcsj");
    			add_location(article0, file$e, 6, 4, 166);
    			attr_dev(article1, "class", "intro-section svelte-a8lcsj");
    			add_location(article1, file$e, 5, 0, 129);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article1, anchor);
    			append_dev(article1, article0);
    			append_dev(article0, main1);
    			append_dev(main1, div5);
    			append_dev(div5, div0);
    			append_dev(div0, h10);
    			append_dev(div5, t1);
    			append_dev(div5, div1);
    			append_dev(div1, a0);
    			append_dev(a0, img);
    			append_dev(div5, t2);
    			append_dev(div5, div2);
    			append_dev(div2, p0);
    			append_dev(p0, t3);
    			append_dev(div5, t4);
    			append_dev(div5, div3);
    			append_dev(div3, p1);
    			append_dev(div5, t6);
    			append_dev(div5, div4);
    			append_dev(div4, p2);
    			append_dev(p2, t7);
    			append_dev(p2, t8);
    			append_dev(main1, t9);
    			append_dev(main1, div9);
    			append_dev(div9, div8);
    			append_dev(div8, main0);
    			append_dev(main0, div7);
    			append_dev(div7, ul0);
    			append_dev(ul0, br);
    			append_dev(ul0, t10);
    			append_dev(ul0, p3);
    			append_dev(ul0, t12);
    			append_dev(ul0, div6);
    			append_dev(div6, li0);
    			append_dev(li0, a1);
    			append_dev(div6, t14);
    			append_dev(div6, li1);
    			append_dev(li1, a2);
    			append_dev(div6, t16);
    			append_dev(div6, li2);
    			append_dev(li2, a3);
    			append_dev(div7, t18);
    			append_dev(div7, ul1);
    			append_dev(ul1, li3);
    			append_dev(li3, h11);
    			append_dev(ul1, t20);
    			append_dev(ul1, li4);
    			append_dev(li4, svg);
    			append_dev(svg, defs);
    			append_dev(defs, clipPath);
    			append_dev(clipPath, rect0);
    			append_dev(defs, linearGradient);
    			append_dev(linearGradient, stop0);
    			append_dev(linearGradient, stop1);
    			append_dev(linearGradient, stop2);
    			append_dev(svg, g5);
    			append_dev(g5, g0);
    			append_dev(g0, path0);
    			append_dev(g0, rect1);
    			append_dev(g5, g1);
    			append_dev(g1, path1);
    			append_dev(g1, rect2);
    			append_dev(g5, g2);
    			append_dev(g2, path2);
    			append_dev(g2, rect3);
    			append_dev(g5, g3);
    			append_dev(g3, path3);
    			append_dev(g3, rect4);
    			append_dev(g5, g4);
    			append_dev(g4, path4);
    			append_dev(g4, rect5);
    			append_dev(div7, t21);
    			append_dev(div7, ul2);
    			append_dev(ul2, li5);
    			append_dev(li5, h12);
    			append_dev(ul2, t23);
    			append_dev(ul2, li6);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(li6, null);
    			}

    			append_dev(div7, t24);
    			append_dev(div7, ul3);
    			append_dev(ul3, li7);
    			append_dev(li7, h13);
    			append_dev(ul3, t26);
    			append_dev(ul3, li8);
    			append_dev(li8, a4);
    			append_dev(article0, t28);
    			append_dev(article0, footer);
    			append_dev(footer, div11);
    			append_dev(div11, p4);
    			append_dev(div11, t30);
    			append_dev(div11, div10);
    			append_dev(div10, h14);
    			append_dev(div10, t32);
    			append_dev(div10, p5);
    			append_dev(div10, t34);
    			append_dev(div10, h15);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$data*/ 1 && t3_value !== (t3_value = /*$data*/ ctx[0].common[0].programme + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*$data*/ 1 && t8_value !== (t8_value = /*$data*/ ctx[0].common[0].version + "")) set_data_dev(t8, t8_value);

    			if (dirty & /*message*/ 0) {
    				each_value = message;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$7(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$7(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(li6, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let $data;
    	validate_store(data, 'data');
    	component_subscribe($$self, data, $$value => $$invalidate(0, $data = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('About', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ data, message, $data });
    	return [$data];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src\routes\analytics.svelte generated by Svelte v3.50.1 */
    const file$d = "src\\routes\\analytics.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    function get_each_context_2$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    // (16:16) {#each $data.common as cmn}
    function create_each_block_2$1(ctx) {
    	let div0;
    	let table;
    	let tr0;
    	let td0;
    	let h10;
    	let t0_value = /*cmn*/ ctx[9].programme + "";
    	let t0;
    	let t1;
    	let tr1;
    	let td1;
    	let h11;
    	let t3;
    	let td2;
    	let h12;
    	let t4;
    	let t5_value = /*cmn*/ ctx[9].studyYear + "";
    	let t5;
    	let t6;
    	let tr2;
    	let td3;
    	let h13;
    	let t8;
    	let td4;
    	let h14;
    	let t9;
    	let t10_value = /*cmn*/ ctx[9].semester + "";
    	let t10;
    	let t11;
    	let div1;
    	let p;
    	let t13;
    	let ul;
    	let li0;
    	let t14_value = /*$data*/ ctx[0].courses.length + "";
    	let t14;
    	let t15;
    	let t16;
    	let li1;
    	let t19;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			table = element("table");
    			tr0 = element("tr");
    			td0 = element("td");
    			h10 = element("h1");
    			t0 = text(t0_value);
    			t1 = space();
    			tr1 = element("tr");
    			td1 = element("td");
    			h11 = element("h1");
    			h11.textContent = "year";
    			t3 = space();
    			td2 = element("td");
    			h12 = element("h1");
    			t4 = text(": ");
    			t5 = text(t5_value);
    			t6 = space();
    			tr2 = element("tr");
    			td3 = element("td");
    			h13 = element("h1");
    			h13.textContent = "semester";
    			t8 = space();
    			td4 = element("td");
    			h14 = element("h1");
    			t9 = text(": ");
    			t10 = text(t10_value);
    			t11 = space();
    			div1 = element("div");
    			p = element("p");
    			p.textContent = "programme summary";
    			t13 = space();
    			ul = element("ul");
    			li0 = element("li");
    			t14 = text(t14_value);
    			t15 = text(" COURSES");
    			t16 = space();
    			li1 = element("li");
    			li1.textContent = `${/*len*/ ctx[1]} CORES`;
    			t19 = space();
    			attr_dev(h10, "class", "svelte-1y72ivl");
    			add_location(h10, file$d, 21, 32, 587);
    			add_location(td0, file$d, 20, 28, 549);
    			add_location(tr0, file$d, 18, 24, 486);
    			attr_dev(h11, "class", "svelte-1y72ivl");
    			add_location(h11, file$d, 26, 32, 776);
    			add_location(td1, file$d, 25, 28, 738);
    			attr_dev(h12, "class", "svelte-1y72ivl");
    			add_location(h12, file$d, 29, 32, 893);
    			add_location(td2, file$d, 28, 28, 855);
    			add_location(tr1, file$d, 24, 24, 704);
    			attr_dev(h13, "class", "svelte-1y72ivl");
    			add_location(h13, file$d, 34, 32, 1084);
    			add_location(td3, file$d, 33, 28, 1046);
    			attr_dev(h14, "class", "svelte-1y72ivl");
    			add_location(h14, file$d, 37, 32, 1205);
    			add_location(td4, file$d, 36, 28, 1167);
    			add_location(tr2, file$d, 32, 24, 1012);
    			add_location(table, file$d, 17, 20, 453);
    			attr_dev(div0, "class", "up-hd-txt");
    			add_location(div0, file$d, 16, 16, 408);
    			attr_dev(p, "class", "svelte-1y72ivl");
    			add_location(p, file$d, 43, 20, 1416);
    			attr_dev(li0, "class", "svelte-1y72ivl");
    			add_location(li0, file$d, 45, 24, 1492);
    			attr_dev(li1, "class", "svelte-1y72ivl");
    			add_location(li1, file$d, 46, 24, 1557);
    			attr_dev(ul, "class", "svelte-1y72ivl");
    			add_location(ul, file$d, 44, 20, 1462);
    			attr_dev(div1, "class", "lw-hd-txt svelte-1y72ivl");
    			add_location(div1, file$d, 42, 16, 1371);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, table);
    			append_dev(table, tr0);
    			append_dev(tr0, td0);
    			append_dev(td0, h10);
    			append_dev(h10, t0);
    			append_dev(table, t1);
    			append_dev(table, tr1);
    			append_dev(tr1, td1);
    			append_dev(td1, h11);
    			append_dev(tr1, t3);
    			append_dev(tr1, td2);
    			append_dev(td2, h12);
    			append_dev(h12, t4);
    			append_dev(h12, t5);
    			append_dev(table, t6);
    			append_dev(table, tr2);
    			append_dev(tr2, td3);
    			append_dev(td3, h13);
    			append_dev(tr2, t8);
    			append_dev(tr2, td4);
    			append_dev(td4, h14);
    			append_dev(h14, t9);
    			append_dev(h14, t10);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, p);
    			append_dev(div1, t13);
    			append_dev(div1, ul);
    			append_dev(ul, li0);
    			append_dev(li0, t14);
    			append_dev(li0, t15);
    			append_dev(ul, t16);
    			append_dev(ul, li1);
    			append_dev(div1, t19);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$data*/ 1 && t0_value !== (t0_value = /*cmn*/ ctx[9].programme + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*$data*/ 1 && t5_value !== (t5_value = /*cmn*/ ctx[9].studyYear + "")) set_data_dev(t5, t5_value);
    			if (dirty & /*$data*/ 1 && t10_value !== (t10_value = /*cmn*/ ctx[9].semester + "")) set_data_dev(t10, t10_value);
    			if (dirty & /*$data*/ 1 && t14_value !== (t14_value = /*$data*/ ctx[0].courses.length + "")) set_data_dev(t14, t14_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$1.name,
    		type: "each",
    		source: "(16:16) {#each $data.common as cmn}",
    		ctx
    	});

    	return block;
    }

    // (71:36) {#each crs.weekdays as cr}
    function create_each_block_1$3(ctx) {
    	let div;
    	let p0;
    	let t0_value = /*cr*/ ctx[6].weekday + "";
    	let t0;
    	let t1;
    	let p1;
    	let t2_value = /*cr*/ ctx[6].location + "";
    	let t2;
    	let t3;
    	let p2;
    	let t4_value = /*cr*/ ctx[6].initialTime + "";
    	let t4;
    	let t5;
    	let t6_value = /*cr*/ ctx[6].finalTime + "";
    	let t6;
    	let t7;
    	let p3;
    	let t8_value = /*cr*/ ctx[6].type + "";
    	let t8;
    	let t9;
    	let p4;
    	let t10_value = /*cr*/ ctx[6].hours + "";
    	let t10;
    	let t11;
    	let t12;
    	let br;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			p1 = element("p");
    			t2 = text(t2_value);
    			t3 = space();
    			p2 = element("p");
    			t4 = text(t4_value);
    			t5 = text(" : ");
    			t6 = text(t6_value);
    			t7 = space();
    			p3 = element("p");
    			t8 = text(t8_value);
    			t9 = space();
    			p4 = element("p");
    			t10 = text(t10_value);
    			t11 = text("HRS");
    			t12 = space();
    			br = element("br");
    			attr_dev(p0, "class", "svelte-1y72ivl");
    			add_location(p0, file$d, 74, 44, 2745);
    			attr_dev(p1, "class", "svelte-1y72ivl");
    			add_location(p1, file$d, 75, 44, 2810);
    			attr_dev(p2, "class", "svelte-1y72ivl");
    			add_location(p2, file$d, 76, 44, 2876);
    			attr_dev(p3, "class", "svelte-1y72ivl");
    			add_location(p3, file$d, 77, 44, 2962);
    			attr_dev(p4, "class", "svelte-1y72ivl");
    			add_location(p4, file$d, 78, 44, 3024);
    			attr_dev(div, "class", "details svelte-1y72ivl");
    			add_location(div, file$d, 72, 40, 2676);
    			add_location(br, file$d, 81, 40, 3182);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p0);
    			append_dev(p0, t0);
    			append_dev(div, t1);
    			append_dev(div, p1);
    			append_dev(p1, t2);
    			append_dev(div, t3);
    			append_dev(div, p2);
    			append_dev(p2, t4);
    			append_dev(p2, t5);
    			append_dev(p2, t6);
    			append_dev(div, t7);
    			append_dev(div, p3);
    			append_dev(p3, t8);
    			append_dev(div, t9);
    			append_dev(div, p4);
    			append_dev(p4, t10);
    			append_dev(p4, t11);
    			insert_dev(target, t12, anchor);
    			insert_dev(target, br, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$data*/ 1 && t0_value !== (t0_value = /*cr*/ ctx[6].weekday + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*$data*/ 1 && t2_value !== (t2_value = /*cr*/ ctx[6].location + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*$data*/ 1 && t4_value !== (t4_value = /*cr*/ ctx[6].initialTime + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*$data*/ 1 && t6_value !== (t6_value = /*cr*/ ctx[6].finalTime + "")) set_data_dev(t6, t6_value);
    			if (dirty & /*$data*/ 1 && t8_value !== (t8_value = /*cr*/ ctx[6].type + "")) set_data_dev(t8, t8_value);
    			if (dirty & /*$data*/ 1 && t10_value !== (t10_value = /*cr*/ ctx[6].hours + "")) set_data_dev(t10, t10_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t12);
    			if (detaching) detach_dev(br);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$3.name,
    		type: "each",
    		source: "(71:36) {#each crs.weekdays as cr}",
    		ctx
    	});

    	return block;
    }

    // (56:20) {#each $data.courses as crs}
    function create_each_block$6(ctx) {
    	let div4;
    	let div3;
    	let header;
    	let div1;
    	let h1;
    	let t0_value = /*crs*/ ctx[3].course + "";
    	let t0;
    	let t1;
    	let div0;
    	let h2;
    	let t2_value = /*crs*/ ctx[3].type + "";
    	let t2;
    	let t3;
    	let p0;
    	let t4_value = /*crs*/ ctx[3].gpa + "";
    	let t4;
    	let t5;
    	let t6;
    	let p1;
    	let t7_value = /*crs*/ ctx[3].code + "";
    	let t7;
    	let t8;
    	let main;
    	let div2;
    	let t9;
    	let each_value_1 = /*crs*/ ctx[3].weekdays;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			header = element("header");
    			div1 = element("div");
    			h1 = element("h1");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");
    			h2 = element("h2");
    			t2 = text(t2_value);
    			t3 = space();
    			p0 = element("p");
    			t4 = text(t4_value);
    			t5 = text(" GPA");
    			t6 = space();
    			p1 = element("p");
    			t7 = text(t7_value);
    			t8 = space();
    			main = element("main");
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t9 = space();
    			attr_dev(h1, "class", "svelte-1y72ivl");
    			add_location(h1, file$d, 60, 36, 2051);
    			attr_dev(h2, "class", "svelte-1y72ivl");
    			add_location(h2, file$d, 62, 40, 2173);
    			attr_dev(p0, "class", "svelte-1y72ivl");
    			add_location(p0, file$d, 63, 40, 2234);
    			attr_dev(p1, "class", "svelte-1y72ivl");
    			add_location(p1, file$d, 64, 40, 2296);
    			attr_dev(div0, "class", "details svelte-1y72ivl");
    			add_location(div0, file$d, 61, 36, 2110);
    			attr_dev(div1, "class", "hd svelte-1y72ivl");
    			add_location(div1, file$d, 59, 32, 1997);
    			add_location(header, file$d, 58, 28, 1955);
    			attr_dev(div2, "class", "mn-cd");
    			add_location(div2, file$d, 69, 32, 2506);
    			add_location(main, file$d, 68, 28, 2466);
    			attr_dev(div3, "class", "cd svelte-1y72ivl");
    			add_location(div3, file$d, 57, 24, 1909);
    			attr_dev(div4, "class", "card svelte-1y72ivl");
    			add_location(div4, file$d, 56, 20, 1865);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, header);
    			append_dev(header, div1);
    			append_dev(div1, h1);
    			append_dev(h1, t0);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(h2, t2);
    			append_dev(div0, t3);
    			append_dev(div0, p0);
    			append_dev(p0, t4);
    			append_dev(p0, t5);
    			append_dev(div0, t6);
    			append_dev(div0, p1);
    			append_dev(p1, t7);
    			append_dev(div3, t8);
    			append_dev(div3, main);
    			append_dev(main, div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}

    			append_dev(div4, t9);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$data*/ 1 && t0_value !== (t0_value = /*crs*/ ctx[3].course + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*$data*/ 1 && t2_value !== (t2_value = /*crs*/ ctx[3].type + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*$data*/ 1 && t4_value !== (t4_value = /*crs*/ ctx[3].gpa + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*$data*/ 1 && t7_value !== (t7_value = /*crs*/ ctx[3].code + "")) set_data_dev(t7, t7_value);

    			if (dirty & /*$data*/ 1) {
    				each_value_1 = /*crs*/ ctx[3].weekdays;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$3(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div2, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(56:20) {#each $data.courses as crs}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let article;
    	let div3;
    	let header;
    	let div0;
    	let t;
    	let main;
    	let div2;
    	let div1;
    	let each_value_2 = /*$data*/ ctx[0].common;
    	validate_each_argument(each_value_2);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
    	}

    	let each_value = /*$data*/ ctx[0].courses;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			article = element("article");
    			div3 = element("div");
    			header = element("header");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t = space();
    			main = element("main");
    			div2 = element("div");
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "hd svelte-1y72ivl");
    			add_location(div0, file$d, 14, 12, 329);
    			attr_dev(header, "class", "head-top svelte-1y72ivl");
    			add_location(header, file$d, 13, 8, 290);
    			attr_dev(div1, "class", "cards-view");
    			add_location(div1, file$d, 54, 16, 1769);
    			attr_dev(div2, "class", "mn");
    			add_location(div2, file$d, 53, 12, 1735);
    			add_location(main, file$d, 52, 8, 1715);
    			attr_dev(div3, "class", "an-sct");
    			add_location(div3, file$d, 11, 4, 258);
    			attr_dev(article, "class", "analytics-section svelte-1y72ivl");
    			add_location(article, file$d, 10, 0, 217);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, div3);
    			append_dev(div3, header);
    			append_dev(header, div0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div0, null);
    			}

    			append_dev(div3, t);
    			append_dev(div3, main);
    			append_dev(main, div2);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*len, $data*/ 3) {
    				each_value_2 = /*$data*/ ctx[0].common;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$1(ctx, each_value_2, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_2$1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_2.length;
    			}

    			if (dirty & /*$data*/ 1) {
    				each_value = /*$data*/ ctx[0].courses;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$6(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$6(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let $data;
    	validate_store(data, 'data');
    	component_subscribe($$self, data, $$value => $$invalidate(0, $data = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Analytics', slots, []);

    	let core = $data.courses.filter(items => {
    		return items.type == "CORE";
    	});

    	let len = core.length;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Analytics> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ data, core, len, $data });

    	$$self.$inject_state = $$props => {
    		if ('core' in $$props) core = $$props.core;
    		if ('len' in $$props) $$invalidate(1, len = $$props.len);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$data, len];
    }

    class Analytics extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Analytics",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src\routes\index.svelte generated by Svelte v3.50.1 */
    const file$c = "src\\routes\\index.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (66:40) {#if todaycrs.length === 0}
    function create_if_block$4(ctx) {
    	let div2;
    	let div0;
    	let h1;
    	let t0;
    	let strong;
    	let t2;
    	let svg;
    	let defs;
    	let clipPath;
    	let rect;
    	let g;
    	let path;
    	let t3;
    	let div1;
    	let p;
    	let t5;
    	let each_value_2 = /*monday*/ ctx[1];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			t0 = text("No Course Avalable For ");
    			strong = element("strong");
    			strong.textContent = `${/*date*/ ctx[0].toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()}`;
    			t2 = space();
    			svg = svg_element("svg");
    			defs = svg_element("defs");
    			clipPath = svg_element("clipPath");
    			rect = svg_element("rect");
    			g = svg_element("g");
    			path = svg_element("path");
    			t3 = space();
    			div1 = element("div");
    			p = element("p");
    			p.textContent = "prepare for MONDAY COURSES";
    			t5 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(strong, file$c, 68, 75, 2077);
    			attr_dev(h1, "class", "svelte-142v7gx");
    			add_location(h1, file$c, 68, 48, 2050);
    			attr_dev(rect, "width", "16");
    			attr_dev(rect, "height", "16");
    			attr_dev(rect, "fill", "none");
    			add_location(rect, file$c, 70, 197, 2413);
    			attr_dev(clipPath, "id", "a");
    			add_location(clipPath, file$c, 70, 180, 2396);
    			add_location(defs, file$c, 70, 174, 2390);
    			attr_dev(path, "d", "M8,0a8,8,0,1,0,8,8A8.024,8.024,0,0,0,8,0ZM9.1,12.2H6.9V10.3H9.2v1.9Zm.1-7.4L8.6,9.2H7.4L6.8,4.8v-1H9.3v1Z");
    			attr_dev(path, "fill", "#707070");
    			add_location(path, file$c, 70, 280, 2496);
    			attr_dev(g, "clip-path", "url(#a)");
    			add_location(g, file$c, 70, 257, 2473);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "width", "16");
    			attr_dev(svg, "height", "16");
    			attr_dev(svg, "viewBox", "0 0 16 16");
    			add_location(svg, file$c, 70, 48, 2264);
    			attr_dev(div0, "class", "title svelte-142v7gx");
    			add_location(div0, file$c, 67, 44, 1982);
    			attr_dev(p, "class", "svelte-142v7gx");
    			add_location(p, file$c, 73, 48, 2800);
    			attr_dev(div1, "class", "txt");
    			add_location(div1, file$c, 72, 44, 2734);
    			attr_dev(div2, "class", "card svelte-142v7gx");
    			add_location(div2, file$c, 66, 40, 1919);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h1);
    			append_dev(h1, t0);
    			append_dev(h1, strong);
    			append_dev(div0, t2);
    			append_dev(div0, svg);
    			append_dev(svg, defs);
    			append_dev(defs, clipPath);
    			append_dev(clipPath, rect);
    			append_dev(svg, g);
    			append_dev(g, path);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div1, p);
    			append_dev(div2, t5);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*monday*/ 2) {
    				each_value_2 = /*monday*/ ctx[1];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div2, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(66:40) {#if todaycrs.length === 0}",
    		ctx
    	});

    	return block;
    }

    // (76:44) {#each monday as crs}
    function create_each_block_2(ctx) {
    	let article;
    	let div1;
    	let div0;
    	let h1;
    	let span0;
    	let t1;
    	let span1;
    	let t2_value = /*crs*/ ctx[7].course + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			article = element("article");
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			span0 = element("span");
    			span0.textContent = "monday ↪";
    			t1 = space();
    			span1 = element("span");
    			t2 = text(t2_value);
    			t3 = space();
    			add_location(span0, file$c, 81, 60, 3344);
    			add_location(span1, file$c, 82, 60, 3441);
    			attr_dev(h1, "class", "svelte-142v7gx");
    			add_location(h1, file$c, 80, 56, 3279);
    			attr_dev(div0, "class", "cd-up-txt");
    			add_location(div0, file$c, 79, 52, 3199);
    			attr_dev(div1, "class", "cd svelte-142v7gx");
    			add_location(div1, file$c, 78, 48, 3130);
    			attr_dev(article, "class", "card svelte-142v7gx");
    			add_location(article, file$c, 77, 44, 3059);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(h1, span0);
    			append_dev(h1, t1);
    			append_dev(h1, span1);
    			append_dev(span1, t2);
    			append_dev(article, t3);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(76:44) {#each monday as crs}",
    		ctx
    	});

    	return block;
    }

    // (120:52) {#each crs.weekdays as rc}
    function create_each_block_1$2(ctx) {
    	let div;
    	let p;
    	let t0_value = /*rc*/ ctx[10].type + "";
    	let t0;
    	let t1;
    	let table;
    	let tbody;
    	let tr0;
    	let td0;
    	let t2_value = /*rc*/ ctx[10].initialTime + "";
    	let t2;
    	let t3;
    	let td1;
    	let t5;
    	let tr1;
    	let td2;
    	let t6_value = /*rc*/ ctx[10].finalTime + "";
    	let t6;
    	let t7;
    	let td3;
    	let t9;
    	let tr2;
    	let td4;
    	let t10_value = /*rc*/ ctx[10].hours + "";
    	let t10;
    	let t11;
    	let td5;
    	let t13;
    	let tr3;
    	let td6;
    	let t14_value = /*rc*/ ctx[10].location + "";
    	let t14;
    	let t15;
    	let td7;
    	let t17;
    	let t18;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			table = element("table");
    			tbody = element("tbody");
    			tr0 = element("tr");
    			td0 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td1 = element("td");
    			td1.textContent = "from";
    			t5 = space();
    			tr1 = element("tr");
    			td2 = element("td");
    			t6 = text(t6_value);
    			t7 = space();
    			td3 = element("td");
    			td3.textContent = "to";
    			t9 = space();
    			tr2 = element("tr");
    			td4 = element("td");
    			t10 = text(t10_value);
    			t11 = space();
    			td5 = element("td");
    			td5.textContent = "duration";
    			t13 = space();
    			tr3 = element("tr");
    			td6 = element("td");
    			t14 = text(t14_value);
    			t15 = space();
    			td7 = element("td");
    			td7.textContent = "location";
    			t17 = text("\n                                                            ...");
    			t18 = space();
    			attr_dev(p, "class", "svelte-142v7gx");
    			add_location(p, file$c, 121, 56, 5970);
    			attr_dev(div, "class", "flair svelte-142v7gx");
    			add_location(div, file$c, 120, 52, 5894);
    			attr_dev(td0, "class", "svelte-142v7gx");
    			add_location(td0, file$c, 126, 64, 6299);
    			attr_dev(td1, "class", "svelte-142v7gx");
    			add_location(td1, file$c, 127, 64, 6389);
    			add_location(tr0, file$c, 125, 60, 6230);
    			attr_dev(td2, "class", "svelte-142v7gx");
    			add_location(td2, file$c, 130, 64, 6598);
    			attr_dev(td3, "class", "svelte-142v7gx");
    			add_location(td3, file$c, 131, 64, 6686);
    			add_location(tr1, file$c, 129, 60, 6529);
    			attr_dev(td4, "class", "svelte-142v7gx");
    			add_location(td4, file$c, 134, 64, 6893);
    			attr_dev(td5, "class", "svelte-142v7gx");
    			add_location(td5, file$c, 135, 64, 6977);
    			add_location(tr2, file$c, 133, 60, 6824);
    			attr_dev(td6, "class", "svelte-142v7gx");
    			add_location(td6, file$c, 138, 64, 7190);
    			attr_dev(td7, "class", "svelte-142v7gx");
    			add_location(td7, file$c, 139, 64, 7277);
    			add_location(tr3, file$c, 137, 60, 7121);
    			add_location(tbody, file$c, 124, 56, 6162);
    			attr_dev(table, "class", "svelte-142v7gx");
    			add_location(table, file$c, 123, 52, 6098);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, table, anchor);
    			append_dev(table, tbody);
    			append_dev(tbody, tr0);
    			append_dev(tr0, td0);
    			append_dev(td0, t2);
    			append_dev(tr0, t3);
    			append_dev(tr0, td1);
    			append_dev(tbody, t5);
    			append_dev(tbody, tr1);
    			append_dev(tr1, td2);
    			append_dev(td2, t6);
    			append_dev(tr1, t7);
    			append_dev(tr1, td3);
    			append_dev(tbody, t9);
    			append_dev(tbody, tr2);
    			append_dev(tr2, td4);
    			append_dev(td4, t10);
    			append_dev(tr2, t11);
    			append_dev(tr2, td5);
    			append_dev(tbody, t13);
    			append_dev(tbody, tr3);
    			append_dev(tr3, td6);
    			append_dev(td6, t14);
    			append_dev(tr3, t15);
    			append_dev(tr3, td7);
    			append_dev(tbody, t17);
    			append_dev(table, t18);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(table);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$2.name,
    		type: "each",
    		source: "(120:52) {#each crs.weekdays as rc}",
    		ctx
    	});

    	return block;
    }

    // (112:40) {#each todaycrs as crs}
    function create_each_block$5(ctx) {
    	let a;
    	let div2;
    	let div0;
    	let h1;
    	let t0_value = /*crs*/ ctx[7].course + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*crs*/ ctx[7].weekdays;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			div2 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			attr_dev(h1, "class", "svelte-142v7gx");
    			add_location(h1, file$c, 116, 52, 5614);
    			attr_dev(div0, "class", "cd-up-txt");
    			add_location(div0, file$c, 115, 48, 5538);
    			attr_dev(div1, "class", "cd-lw-txt");
    			add_location(div1, file$c, 118, 48, 5739);
    			attr_dev(div2, "class", "cd svelte-142v7gx");
    			add_location(div2, file$c, 114, 44, 5473);
    			attr_dev(a, "href", "/slug/" + /*crs*/ ctx[7].code);
    			attr_dev(a, "class", "card svelte-142v7gx");
    			add_location(a, file$c, 113, 40, 5378);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, div2);
    			append_dev(div2, div0);
    			append_dev(div0, h1);
    			append_dev(h1, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(a, t2);

    			if (!mounted) {
    				dispose = action_destroyer(link.call(null, a));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*todaycrs*/ 4) {
    				each_value_1 = /*crs*/ ctx[7].weekdays;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(112:40) {#each todaycrs as crs}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let article1;
    	let div8;
    	let div7;
    	let div6;
    	let section;
    	let article0;
    	let div5;
    	let div1;
    	let div0;
    	let h1;
    	let t1;
    	let p;
    	let t3;
    	let div4;
    	let div3;
    	let div2;
    	let t4;
    	let if_block = /*todaycrs*/ ctx[2].length === 0 && create_if_block$4(ctx);
    	let each_value = /*todaycrs*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			article1 = element("article");
    			div8 = element("div");
    			div7 = element("div");
    			div6 = element("div");
    			section = element("section");
    			article0 = element("article");
    			div5 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "TODAYS CLASSES";
    			t1 = space();
    			p = element("p");
    			p.textContent = "___";
    			t3 = space();
    			div4 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			if (if_block) if_block.c();
    			t4 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h1, "class", "svelte-142v7gx");
    			add_location(h1, file$c, 57, 36, 1472);
    			attr_dev(p, "class", "svelte-142v7gx");
    			add_location(p, file$c, 58, 36, 1532);
    			attr_dev(div0, "class", "up-sct");
    			add_location(div0, file$c, 56, 32, 1415);
    			attr_dev(div1, "class", "upper-sect svelte-142v7gx");
    			add_location(div1, file$c, 55, 28, 1358);
    			attr_dev(div2, "class", "cards-container");
    			add_location(div2, file$c, 64, 36, 1781);
    			attr_dev(div3, "class", "bt-sct");
    			add_location(div3, file$c, 62, 32, 1703);
    			attr_dev(div4, "class", "bottom-sect");
    			add_location(div4, file$c, 61, 28, 1645);
    			attr_dev(div5, "class", "art-sectone");
    			add_location(div5, file$c, 54, 24, 1304);
    			attr_dev(article0, "class", "sectone");
    			add_location(article0, file$c, 53, 20, 1254);
    			attr_dev(section, "class", "section-one svelte-142v7gx");
    			add_location(section, file$c, 52, 16, 1204);
    			attr_dev(div6, "class", "idx-sects");
    			add_location(div6, file$c, 51, 12, 1164);
    			attr_dev(div7, "class", "index-sections");
    			add_location(div7, file$c, 50, 8, 1123);
    			attr_dev(div8, "class", "art-is");
    			add_location(div8, file$c, 48, 4, 1089);
    			attr_dev(article1, "class", "index-section svelte-142v7gx");
    			add_location(article1, file$c, 47, 0, 1053);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article1, anchor);
    			append_dev(article1, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div6);
    			append_dev(div6, section);
    			append_dev(section, article0);
    			append_dev(article0, div5);
    			append_dev(div5, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(div5, t3);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			if (if_block) if_block.m(div2, null);
    			append_dev(div2, t4);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*todaycrs*/ ctx[2].length === 0) if_block.p(ctx, dirty);

    			if (dirty & /*todaycrs*/ 4) {
    				each_value = /*todaycrs*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div2, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article1);
    			if (if_block) if_block.d();
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let $data;
    	validate_store(data, 'data');
    	component_subscribe($$self, data, $$value => $$invalidate(3, $data = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Routes', slots, []);
    	let introKeyValue = "BUTAO-LASC-V1.1.1-introkeyvalue";
    	let date = new Date();
    	let day = date.getDay();

    	const arr = $data.courses.map(element => {
    		return {
    			...element,
    			weekdays: element.weekdays.filter(weekdays => weekdays.day === day)
    		};
    	}).filter(item => {
    		return item.weekdays.length !== 0;
    	});

    	const monday = $data.courses.map(monElement => {
    		return {
    			...monElement,
    			monday: monElement.weekdays.filter(wkdElement => {
    				return wkdElement.day === 1;
    			})
    		};
    	}).filter(emptyElement => {
    		return emptyElement.monday.length !== 0;
    	});

    	const todaycrs = arr.map(element => {
    		let time = "";
    		element.weekdays.forEach(weekdays => time = weekdays.initialTime.substring(0, 2));
    		return { ...element, time };
    	}).sort((a, b) => {
    		return a.time.localeCompare(b.time);
    	}).map(item => {
    		return item;
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Routes> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		data,
    		link,
    		introKeyValue,
    		date,
    		day,
    		arr,
    		monday,
    		todaycrs,
    		$data
    	});

    	$$self.$inject_state = $$props => {
    		if ('introKeyValue' in $$props) introKeyValue = $$props.introKeyValue;
    		if ('date' in $$props) $$invalidate(0, date = $$props.date);
    		if ('day' in $$props) day = $$props.day;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [date, monday, todaycrs];
    }

    class Routes extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Routes",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src\routes\reminder.svelte generated by Svelte v3.50.1 */

    const { console: console_1$1 } = globals;
    const file$b = "src\\routes\\reminder.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[27] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[30] = list[i];
    	return child_ctx;
    }

    // (106:16) {#if listData.length == 0}
    function create_if_block_7(ctx) {
    	let div2;
    	let div1;
    	let header;
    	let div0;
    	let h1;
    	let t1;
    	let p0;
    	let t3;
    	let p1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			header = element("header");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "SUCH EMPTITNESS";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "PLEASE ADD SOMETHING";
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "😪😪😪";
    			attr_dev(h1, "class", "svelte-1jd2ex6");
    			add_location(h1, file$b, 110, 32, 3249);
    			attr_dev(p0, "class", "svelte-1jd2ex6");
    			add_location(p0, file$b, 112, 32, 3341);
    			attr_dev(p1, "class", "svelte-1jd2ex6");
    			add_location(p1, file$b, 114, 32, 3436);
    			set_style(div0, "text-align", "center");
    			attr_dev(div0, "class", "hd");
    			add_location(div0, file$b, 109, 28, 3173);
    			add_location(header, file$b, 108, 24, 3135);
    			attr_dev(div1, "class", "cd svelte-1jd2ex6");
    			add_location(div1, file$b, 107, 20, 3093);
    			attr_dev(div2, "class", "card-empt svelte-1jd2ex6");
    			add_location(div2, file$b, 106, 16, 3014);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, header);
    			append_dev(header, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, p0);
    			append_dev(div0, t3);
    			append_dev(div0, p1);

    			if (!mounted) {
    				dispose = listen_dev(div2, "click", /*click_handler*/ ctx[14], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(106:16) {#if listData.length == 0}",
    		ctx
    	});

    	return block;
    }

    // (136:24) {#if !collapse}
    function create_if_block_6(ctx) {
    	let main;
    	let div6;
    	let div3;
    	let div0;
    	let p0;
    	let t0;
    	let t1_value = /*dt*/ ctx[30].date + "";
    	let t1;
    	let t2;
    	let div1;
    	let p1;
    	let t3_value = /*dt*/ ctx[30].location + "";
    	let t3;
    	let t4;
    	let div2;
    	let p2;
    	let t5_value = /*dt*/ ctx[30].startTime + "";
    	let t5;
    	let t6;
    	let div5;
    	let div4;
    	let p3;
    	let t7_value = /*dt*/ ctx[30].notes + "";
    	let t7;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div6 = element("div");
    			div3 = element("div");
    			div0 = element("div");
    			p0 = element("p");
    			t0 = text("created : ");
    			t1 = text(t1_value);
    			t2 = space();
    			div1 = element("div");
    			p1 = element("p");
    			t3 = text(t3_value);
    			t4 = space();
    			div2 = element("div");
    			p2 = element("p");
    			t5 = text(t5_value);
    			t6 = space();
    			div5 = element("div");
    			div4 = element("div");
    			p3 = element("p");
    			t7 = text(t7_value);
    			attr_dev(p0, "class", "svelte-1jd2ex6");
    			add_location(p0, file$b, 140, 36, 4580);
    			attr_dev(div0, "class", "date svelte-1jd2ex6");
    			add_location(div0, file$b, 139, 32, 4524);
    			attr_dev(p1, "class", "svelte-1jd2ex6");
    			add_location(p1, file$b, 143, 36, 4740);
    			attr_dev(div1, "class", "location svelte-1jd2ex6");
    			add_location(div1, file$b, 142, 32, 4680);
    			attr_dev(p2, "class", "svelte-1jd2ex6");
    			add_location(p2, file$b, 146, 36, 4890);
    			attr_dev(div2, "class", "time svelte-1jd2ex6");
    			add_location(div2, file$b, 145, 32, 4834);
    			attr_dev(div3, "class", "flex svelte-1jd2ex6");
    			add_location(div3, file$b, 138, 32, 4472);
    			attr_dev(p3, "class", "svelte-1jd2ex6");
    			add_location(p3, file$b, 151, 40, 5140);
    			attr_dev(div4, "class", "nts");
    			add_location(div4, file$b, 150, 36, 5081);
    			attr_dev(div5, "class", "note");
    			add_location(div5, file$b, 149, 32, 5025);
    			attr_dev(div6, "class", "mn");
    			add_location(div6, file$b, 137, 28, 4422);
    			add_location(main, file$b, 136, 24, 4386);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div6);
    			append_dev(div6, div3);
    			append_dev(div3, div0);
    			append_dev(div0, p0);
    			append_dev(p0, t0);
    			append_dev(p0, t1);
    			append_dev(div3, t2);
    			append_dev(div3, div1);
    			append_dev(div1, p1);
    			append_dev(p1, t3);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div2, p2);
    			append_dev(p2, t5);
    			append_dev(div6, t6);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div4, p3);
    			append_dev(p3, t7);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*listData*/ 32 && t1_value !== (t1_value = /*dt*/ ctx[30].date + "")) set_data_dev(t1, t1_value);
    			if (dirty[0] & /*listData*/ 32 && t3_value !== (t3_value = /*dt*/ ctx[30].location + "")) set_data_dev(t3, t3_value);
    			if (dirty[0] & /*listData*/ 32 && t5_value !== (t5_value = /*dt*/ ctx[30].startTime + "")) set_data_dev(t5, t5_value);
    			if (dirty[0] & /*listData*/ 32 && t7_value !== (t7_value = /*dt*/ ctx[30].notes + "")) set_data_dev(t7, t7_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(136:24) {#if !collapse}",
    		ctx
    	});

    	return block;
    }

    // (121:16) {#each listData as dt}
    function create_each_block_1$1(ctx) {
    	let div4;
    	let div3;
    	let header;
    	let div1;
    	let h1;
    	let t0_value = /*dt*/ ctx[30].title + "";
    	let t0;
    	let t1;
    	let div0;
    	let p;
    	let t2_value = /*dt*/ ctx[30].flair + "";
    	let t2;
    	let t3;
    	let t4;
    	let footer;
    	let div2;
    	let button;
    	let i;
    	let svg;
    	let g1;
    	let g0;
    	let rect;
    	let path;
    	let t5;
    	let mounted;
    	let dispose;
    	let if_block = !/*collapse*/ ctx[9] && create_if_block_6(ctx);

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			header = element("header");
    			div1 = element("div");
    			h1 = element("h1");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");
    			p = element("p");
    			t2 = text(t2_value);
    			t3 = space();
    			if (if_block) if_block.c();
    			t4 = space();
    			footer = element("footer");
    			div2 = element("div");
    			button = element("button");
    			i = element("i");
    			svg = svg_element("svg");
    			g1 = svg_element("g");
    			g0 = svg_element("g");
    			rect = svg_element("rect");
    			path = svg_element("path");
    			t5 = space();
    			attr_dev(h1, "class", "svelte-1jd2ex6");
    			add_location(h1, file$b, 125, 32, 3866);
    			set_style(p, "border", "solid 1.2px " + /*dt*/ ctx[30].color);
    			attr_dev(p, "class", "svelte-1jd2ex6");
    			add_location(p, file$b, 129, 36, 4071);
    			attr_dev(div0, "class", "flair svelte-1jd2ex6");
    			toggle_class(div0, "shift", /*collapse*/ ctx[9]);
    			add_location(div0, file$b, 128, 32, 3991);
    			attr_dev(div1, "class", "hd");
    			add_location(div1, file$b, 124, 28, 3816);
    			add_location(header, file$b, 123, 24, 3778);
    			attr_dev(rect, "width", "24");
    			attr_dev(rect, "height", "24");
    			attr_dev(rect, "opacity", "0");
    			add_location(rect, file$b, 165, 52, 5874);
    			attr_dev(path, "d", "M21 6h-5V4.33A2.42 2.42 0 0 0 13.5 2h-3A2.42 2.42 0 0 0 8 4.33V6H3a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2zM10 16a1 1 0 0 1-2 0v-4a1 1 0 0 1 2 0zm0-11.67c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4zM16 16a1 1 0 0 1-2 0v-4a1 1 0 0 1 2 0z");
    			add_location(path, file$b, 166, 52, 5970);
    			attr_dev(g0, "data-name", "trash-2");
    			add_location(g0, file$b, 164, 48, 5797);
    			attr_dev(g1, "data-name", "Layer 2");
    			add_location(g1, file$b, 163, 44, 5724);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "class", "svelte-1jd2ex6");
    			add_location(svg, file$b, 162, 40, 5618);
    			add_location(i, file$b, 161, 36, 5573);
    			attr_dev(button, "class", "svelte-1jd2ex6");
    			add_location(button, file$b, 160, 32, 5497);
    			attr_dev(div2, "class", "ft svelte-1jd2ex6");
    			add_location(div2, file$b, 159, 28, 5447);
    			add_location(footer, file$b, 158, 24, 5409);
    			attr_dev(div3, "class", "cd svelte-1jd2ex6");
    			add_location(div3, file$b, 122, 20, 3736);
    			attr_dev(div4, "class", "card svelte-1jd2ex6");
    			set_style(div4, "border-left", "solid 1px " + /*dt*/ ctx[30].color);
    			add_location(div4, file$b, 121, 16, 3653);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, header);
    			append_dev(header, div1);
    			append_dev(div1, h1);
    			append_dev(h1, t0);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, p);
    			append_dev(p, t2);
    			append_dev(div3, t3);
    			if (if_block) if_block.m(div3, null);
    			append_dev(div3, t4);
    			append_dev(div3, footer);
    			append_dev(footer, div2);
    			append_dev(div2, button);
    			append_dev(button, i);
    			append_dev(i, svg);
    			append_dev(svg, g1);
    			append_dev(g1, g0);
    			append_dev(g0, rect);
    			append_dev(g0, path);
    			append_dev(div4, t5);

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*dispatchdel*/ ctx[12](/*dt*/ ctx[30].id))) /*dispatchdel*/ ctx[12](/*dt*/ ctx[30].id).apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty[0] & /*listData*/ 32 && t0_value !== (t0_value = /*dt*/ ctx[30].title + "")) set_data_dev(t0, t0_value);
    			if (dirty[0] & /*listData*/ 32 && t2_value !== (t2_value = /*dt*/ ctx[30].flair + "")) set_data_dev(t2, t2_value);

    			if (dirty[0] & /*listData*/ 32) {
    				set_style(p, "border", "solid 1.2px " + /*dt*/ ctx[30].color);
    			}

    			if (dirty[0] & /*collapse*/ 512) {
    				toggle_class(div0, "shift", /*collapse*/ ctx[9]);
    			}

    			if (!/*collapse*/ ctx[9]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_6(ctx);
    					if_block.c();
    					if_block.m(div3, t4);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty[0] & /*listData*/ 32) {
    				set_style(div4, "border-left", "solid 1px " + /*dt*/ ctx[30].color);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(121:16) {#each listData as dt}",
    		ctx
    	});

    	return block;
    }

    // (186:24) {#if listData.length > 0}
    function create_if_block_5(ctx) {
    	let button;
    	let svg;
    	let rect;
    	let path;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			svg = svg_element("svg");
    			rect = svg_element("rect");
    			path = svg_element("path");
    			attr_dev(rect, "width", "45");
    			attr_dev(rect, "height", "45");
    			attr_dev(rect, "rx", "15");
    			attr_dev(rect, "fill", "#2EB035");
    			add_location(rect, file$b, 188, 32, 7139);
    			attr_dev(path, "d", "M17 14H23C23.5439 14 24 13.5439 24 13C24 12.4561 23.5439 12 23 12H17C16.4561 12 16 12.4561 16 13C16 13.5439 16.4561 14 17 14ZM18 13V7C18 6.45614 17.5439 6 17 6C16.4561 6 16 6.45614 16 7V13C16 13.5439 16.4561 14 17 14C17.5439 14 18 13.5439 18 13ZM17.7018 13.7018L23.7018 7.70175C23.8947 7.52632 24 7.2807 24 7C24 6.45614 23.5439 6 23 6C22.7193 6 22.4737 6.10526 22.2982 6.29825L16.2982 12.2982C16.1053 12.4737 16 12.7193 16 13C16 13.5439 16.4561 14 17 14C17.2807 14 17.5263 13.8947 17.7018 13.7018ZM7 18H13C13.5439 18 14 17.5439 14 17C14 16.4561 13.5439 16 13 16H7C6.45614 16 6 16.4561 6 17C6 17.5439 6.45614 18 7 18ZM12 17V23C12 23.5439 12.4561 24 13 24C13.5439 24 14 23.5439 14 23V17C14 16.4561 13.5439 16 13 16C12.4561 16 12 16.4561 12 17ZM12.2982 16.2982L6.29825 22.2982C6.10526 22.4737 6 22.7193 6 23C6 23.5439 6.45614 24 7 24C7.2807 24 7.52632 23.8947 7.70175 23.7018L13.7018 17.7018C13.8947 17.5263 14 17.2807 14 17C14 16.4561 13.5439 16 13 16C12.7193 16 12.4737 16.1053 12.2982 16.2982Z");
    			attr_dev(path, "fill", "#F2F2F2");
    			add_location(path, file$b, 189, 32, 7226);
    			attr_dev(svg, "width", "45");
    			attr_dev(svg, "height", "45");
    			attr_dev(svg, "viewBox", "0 0 45 45");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "class", "svelte-1jd2ex6");
    			add_location(svg, file$b, 187, 28, 7010);
    			attr_dev(button, "class", "svelte-1jd2ex6");
    			add_location(button, file$b, 186, 24, 6918);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, svg);
    			append_dev(svg, rect);
    			append_dev(svg, path);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", prevent_default(/*click_handler_1*/ ctx[15]), false, true, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(186:24) {#if listData.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (210:28) {#if error == false && sucess == false}
    function create_if_block_4(ctx) {
    	let div;
    	let button;
    	let svg;
    	let rect;
    	let path;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button = element("button");
    			svg = svg_element("svg");
    			rect = svg_element("rect");
    			path = svg_element("path");
    			attr_dev(rect, "x", "0.5");
    			attr_dev(rect, "y", "0.5");
    			attr_dev(rect, "width", "59");
    			attr_dev(rect, "height", "59");
    			attr_dev(rect, "rx", "29.5");
    			attr_dev(rect, "stroke", "#B02E2E");
    			add_location(rect, file$b, 213, 40, 9778);
    			attr_dev(path, "d", "M34.9203 23.636L29.9706 28.5858L25.0208 23.636C24.6362 23.2515 23.9912 23.2515 23.6066 23.636C23.222 24.0206 23.222 24.6657 23.6066 25.0503L29.9706 31.4142L36.3345 25.0503C36.7191 24.6657 36.7191 24.0206 36.3345 23.636C35.95 23.2515 35.3049 23.2515 34.9203 23.636ZM25.0208 36.364L29.9706 31.4142L34.9203 36.364C35.3049 36.7485 35.95 36.7485 36.3345 36.364C36.7191 35.9794 36.7191 35.3343 36.3345 34.9497L29.9706 28.5858L23.6066 34.9497C23.222 35.3343 23.222 35.9794 23.6066 36.364C23.9912 36.7485 24.6362 36.7485 25.0208 36.364Z");
    			attr_dev(path, "fill", "#792020");
    			add_location(path, file$b, 214, 40, 9893);
    			attr_dev(svg, "width", "60");
    			attr_dev(svg, "height", "60");
    			attr_dev(svg, "viewBox", "0 0 60 60");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "class", "svelte-1jd2ex6");
    			add_location(svg, file$b, 212, 36, 9641);
    			attr_dev(button, "class", "svelte-1jd2ex6");
    			add_location(button, file$b, 211, 32, 9546);
    			attr_dev(div, "class", "hd-cancel svelte-1jd2ex6");
    			add_location(div, file$b, 210, 28, 9489);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button);
    			append_dev(button, svg);
    			append_dev(svg, rect);
    			append_dev(svg, path);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", prevent_default(/*click_handler_3*/ ctx[17]), false, true, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(210:28) {#if error == false && sucess == false}",
    		ctx
    	});

    	return block;
    }

    // (220:28) {#if error == true}
    function create_if_block_3$1(ctx) {
    	let div;
    	let h1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "title field cannot be empty";
    			attr_dev(h1, "class", "svelte-1jd2ex6");
    			add_location(h1, file$b, 221, 32, 10781);
    			attr_dev(div, "class", "hd-error svelte-1jd2ex6");
    			add_location(div, file$b, 220, 28, 10725);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(220:28) {#if error == true}",
    		ctx
    	});

    	return block;
    }

    // (227:28) {#if sucess}
    function create_if_block_2$1(ctx) {
    	let div;
    	let h1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "title submitted";
    			attr_dev(h1, "class", "svelte-1jd2ex6");
    			add_location(h1, file$b, 228, 32, 11089);
    			attr_dev(div, "class", "hd-sucess svelte-1jd2ex6");
    			add_location(div, file$b, 227, 28, 11032);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(227:28) {#if sucess}",
    		ctx
    	});

    	return block;
    }

    // (255:36) {#if customeFlair}
    function create_if_block_1$3(ctx) {
    	let select_1;
    	let t0;
    	let label;
    	let mounted;
    	let dispose;
    	let each_value = /*select*/ ctx[13];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			select_1 = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			label = element("label");
    			label.textContent = "flairs are tags to better group your reminders";
    			attr_dev(select_1, "name", "flair");
    			attr_dev(select_1, "class", "svelte-1jd2ex6");
    			if (/*fl*/ ctx[3] === void 0) add_render_callback(() => /*select_1_change_handler*/ ctx[22].call(select_1));
    			add_location(select_1, file$b, 255, 36, 12744);
    			attr_dev(label, "for", "flair");
    			attr_dev(label, "class", "svelte-1jd2ex6");
    			add_location(label, file$b, 260, 36, 13057);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, select_1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select_1, null);
    			}

    			select_option(select_1, /*fl*/ ctx[3]);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, label, anchor);

    			if (!mounted) {
    				dispose = listen_dev(select_1, "change", /*select_1_change_handler*/ ctx[22]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*select*/ 8192) {
    				each_value = /*select*/ ctx[13];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select_1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty[0] & /*fl, select*/ 8200) {
    				select_option(select_1, /*fl*/ ctx[3]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(select_1);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(label);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(255:36) {#if customeFlair}",
    		ctx
    	});

    	return block;
    }

    // (257:40) {#each select as sl}
    function create_each_block$4(ctx) {
    	let option;
    	let t_value = /*sl*/ ctx[27] + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*sl*/ ctx[27];
    			option.value = option.__value;
    			attr_dev(option, "class", "svelte-1jd2ex6");
    			add_location(option, file$b, 257, 44, 12889);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(257:40) {#each select as sl}",
    		ctx
    	});

    	return block;
    }

    // (263:36) {#if !customeFlair}
    function create_if_block$3(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "name", "flair");
    			attr_dev(input, "placeholder", "enter custome flair");
    			attr_dev(input, "class", "svelte-1jd2ex6");
    			add_location(input, file$b, 263, 36, 13268);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*fl*/ ctx[3]);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[23]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*fl, select*/ 8200 && input.value !== /*fl*/ ctx[3]) {
    				set_input_value(input, /*fl*/ ctx[3]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(263:36) {#if !customeFlair}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let article;
    	let div12;
    	let section0;
    	let div0;
    	let t0;
    	let t1;
    	let section1;
    	let div11;
    	let div2;
    	let div1;
    	let t2;
    	let button0;
    	let svg;
    	let rect;
    	let path;
    	let t3;
    	let form;
    	let div10;
    	let header;
    	let t4;
    	let t5;
    	let t6;
    	let main;
    	let div8;
    	let div3;
    	let label0;
    	let t8;
    	let input0;
    	let t9;
    	let div4;
    	let label1;
    	let t11;
    	let input1;
    	let t12;
    	let div5;
    	let label2;
    	let t14;
    	let input2;
    	let t15;
    	let div6;
    	let label3;
    	let t17;
    	let input3;
    	let t18;
    	let div7;
    	let label4;
    	let t20;
    	let t21;
    	let t22;
    	let button1;
    	let t24;
    	let footer;
    	let div9;
    	let button2;
    	let mounted;
    	let dispose;
    	let if_block0 = /*listData*/ ctx[5].length == 0 && create_if_block_7(ctx);
    	let each_value_1 = /*listData*/ ctx[5];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	let if_block1 = /*listData*/ ctx[5].length > 0 && create_if_block_5(ctx);
    	let if_block2 = /*error*/ ctx[8] == false && /*sucess*/ ctx[7] == false && create_if_block_4(ctx);
    	let if_block3 = /*error*/ ctx[8] == true && create_if_block_3$1(ctx);
    	let if_block4 = /*sucess*/ ctx[7] && create_if_block_2$1(ctx);
    	let if_block5 = /*customeFlair*/ ctx[10] && create_if_block_1$3(ctx);
    	let if_block6 = !/*customeFlair*/ ctx[10] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			article = element("article");
    			div12 = element("div");
    			section0 = element("section");
    			div0 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			section1 = element("section");
    			div11 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			if (if_block1) if_block1.c();
    			t2 = space();
    			button0 = element("button");
    			svg = svg_element("svg");
    			rect = svg_element("rect");
    			path = svg_element("path");
    			t3 = space();
    			form = element("form");
    			div10 = element("div");
    			header = element("header");
    			if (if_block2) if_block2.c();
    			t4 = space();
    			if (if_block3) if_block3.c();
    			t5 = space();
    			if (if_block4) if_block4.c();
    			t6 = space();
    			main = element("main");
    			div8 = element("div");
    			div3 = element("div");
    			label0 = element("label");
    			label0.textContent = "TITLE";
    			t8 = space();
    			input0 = element("input");
    			t9 = space();
    			div4 = element("div");
    			label1 = element("label");
    			label1.textContent = "START TIME";
    			t11 = space();
    			input1 = element("input");
    			t12 = space();
    			div5 = element("div");
    			label2 = element("label");
    			label2.textContent = "LOCATION";
    			t14 = space();
    			input2 = element("input");
    			t15 = space();
    			div6 = element("div");
    			label3 = element("label");
    			label3.textContent = "SIMPLE NOTE";
    			t17 = space();
    			input3 = element("input");
    			t18 = space();
    			div7 = element("div");
    			label4 = element("label");
    			label4.textContent = "FLAIR";
    			t20 = space();
    			if (if_block5) if_block5.c();
    			t21 = space();
    			if (if_block6) if_block6.c();
    			t22 = space();
    			button1 = element("button");
    			button1.textContent = "edit flair";
    			t24 = space();
    			footer = element("footer");
    			div9 = element("div");
    			button2 = element("button");
    			button2.textContent = "SUBMIT";
    			attr_dev(div0, "class", "cd-vws");
    			add_location(div0, file$b, 104, 12, 2932);
    			attr_dev(section0, "class", "cards-view svelte-1jd2ex6");
    			add_location(section0, file$b, 103, 8, 2890);
    			attr_dev(rect, "width", "60");
    			attr_dev(rect, "height", "60");
    			attr_dev(rect, "rx", "30");
    			attr_dev(rect, "fill", "#9BD99E");
    			add_location(rect, file$b, 198, 32, 8697);
    			attr_dev(path, "d", "M38 29H31V22C31 21.4561 30.5439 21 30 21C29.4561 21 29 21.4561 29 22V31H38C38.5439 31 39 30.5439 39 30C39 29.4561 38.5439 29 38 29ZM22 31H29V38C29 38.5439 29.4561 39 30 39C30.5439 39 31 38.5439 31 38V29H22C21.4561 29 21 29.4561 21 30C21 30.5439 21.4561 31 22 31Z");
    			attr_dev(path, "fill", "white");
    			add_location(path, file$b, 199, 32, 8784);
    			attr_dev(svg, "width", "60");
    			attr_dev(svg, "height", "60");
    			attr_dev(svg, "viewBox", "0 0 60 60");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "class", "svelte-1jd2ex6");
    			add_location(svg, file$b, 197, 28, 8568);
    			attr_dev(button0, "class", "svelte-1jd2ex6");
    			add_location(button0, file$b, 196, 24, 8480);
    			attr_dev(div1, "class", "add svelte-1jd2ex6");
    			add_location(div1, file$b, 184, 20, 6824);
    			attr_dev(div2, "class", "add-btn svelte-1jd2ex6");
    			add_location(div2, file$b, 183, 16, 6781);
    			add_location(header, file$b, 208, 24, 9382);
    			attr_dev(label0, "for", "title");
    			attr_dev(label0, "class", "svelte-1jd2ex6");
    			add_location(label0, file$b, 237, 36, 11467);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "title");
    			attr_dev(input0, "placeholder", "enter title");
    			attr_dev(input0, "class", "svelte-1jd2ex6");
    			toggle_class(input0, "redin", /*error*/ ctx[8]);
    			add_location(input0, file$b, 238, 36, 11537);
    			attr_dev(div3, "class", "fm-grp svelte-1jd2ex6");
    			add_location(div3, file$b, 236, 32, 11409);
    			attr_dev(label1, "for", "starttime");
    			attr_dev(label1, "class", "svelte-1jd2ex6");
    			add_location(label1, file$b, 241, 36, 11763);
    			attr_dev(input1, "type", "time");
    			attr_dev(input1, "name", "start time");
    			attr_dev(input1, "class", "svelte-1jd2ex6");
    			add_location(input1, file$b, 242, 36, 11842);
    			attr_dev(div4, "class", "fm-grp svelte-1jd2ex6");
    			add_location(div4, file$b, 240, 32, 11705);
    			attr_dev(label2, "for", "laction");
    			attr_dev(label2, "class", "svelte-1jd2ex6");
    			add_location(label2, file$b, 245, 36, 12029);
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "name", "location");
    			attr_dev(input2, "placeholder", "enter location");
    			attr_dev(input2, "class", "svelte-1jd2ex6");
    			add_location(input2, file$b, 246, 36, 12104);
    			attr_dev(div5, "class", "fm-grp svelte-1jd2ex6");
    			add_location(div5, file$b, 244, 32, 11971);
    			attr_dev(label3, "for", "notes");
    			attr_dev(label3, "class", "svelte-1jd2ex6");
    			add_location(label3, file$b, 249, 36, 12316);
    			attr_dev(input3, "type", "text");
    			attr_dev(input3, "name", "notes");
    			attr_dev(input3, "placeholder", "enter a simple note about title");
    			attr_dev(input3, "class", "svelte-1jd2ex6");
    			add_location(input3, file$b, 250, 36, 12392);
    			attr_dev(div6, "class", "fm-grp svelte-1jd2ex6");
    			add_location(div6, file$b, 248, 32, 12258);
    			attr_dev(label4, "for", "flair");
    			attr_dev(label4, "class", "svelte-1jd2ex6");
    			add_location(label4, file$b, 253, 36, 12618);
    			attr_dev(button1, "class", "svelte-1jd2ex6");
    			add_location(button1, file$b, 265, 36, 13431);
    			attr_dev(div7, "class", "fm-grp svelte-1jd2ex6");
    			add_location(div7, file$b, 252, 32, 12560);
    			attr_dev(div8, "class", "mn-formg svelte-1jd2ex6");
    			add_location(div8, file$b, 235, 28, 11353);
    			add_location(main, file$b, 234, 24, 11317);
    			attr_dev(button2, "class", "svelte-1jd2ex6");
    			add_location(button2, file$b, 272, 32, 13776);
    			attr_dev(div9, "class", "ft svelte-1jd2ex6");
    			add_location(div9, file$b, 271, 28, 13726);
    			add_location(footer, file$b, 270, 24, 13688);
    			attr_dev(div10, "class", "fm svelte-1jd2ex6");
    			add_location(div10, file$b, 207, 20, 9340);
    			attr_dev(form, "class", "svelte-1jd2ex6");
    			toggle_class(form, "form-clip", /*toggle*/ ctx[6]);
    			add_location(form, file$b, 206, 16, 9286);
    			attr_dev(div11, "class", "rmd-forms");
    			add_location(div11, file$b, 181, 12, 6738);
    			attr_dev(section1, "class", "reminder-forms");
    			add_location(section1, file$b, 180, 8, 6692);
    			attr_dev(div12, "class", "art-rmdsect");
    			add_location(div12, file$b, 102, 4, 2855);
    			attr_dev(article, "class", "reminder-section svelte-1jd2ex6");
    			add_location(article, file$b, 101, 0, 2815);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, div12);
    			append_dev(div12, section0);
    			append_dev(section0, div0);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(div0, t0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div12, t1);
    			append_dev(div12, section1);
    			append_dev(section1, div11);
    			append_dev(div11, div2);
    			append_dev(div2, div1);
    			if (if_block1) if_block1.m(div1, null);
    			append_dev(div1, t2);
    			append_dev(div1, button0);
    			append_dev(button0, svg);
    			append_dev(svg, rect);
    			append_dev(svg, path);
    			append_dev(div11, t3);
    			append_dev(div11, form);
    			append_dev(form, div10);
    			append_dev(div10, header);
    			if (if_block2) if_block2.m(header, null);
    			append_dev(header, t4);
    			if (if_block3) if_block3.m(header, null);
    			append_dev(header, t5);
    			if (if_block4) if_block4.m(header, null);
    			append_dev(div10, t6);
    			append_dev(div10, main);
    			append_dev(main, div8);
    			append_dev(div8, div3);
    			append_dev(div3, label0);
    			append_dev(div3, t8);
    			append_dev(div3, input0);
    			set_input_value(input0, /*ti*/ ctx[0]);
    			append_dev(div8, t9);
    			append_dev(div8, div4);
    			append_dev(div4, label1);
    			append_dev(div4, t11);
    			append_dev(div4, input1);
    			set_input_value(input1, /*st*/ ctx[1]);
    			append_dev(div8, t12);
    			append_dev(div8, div5);
    			append_dev(div5, label2);
    			append_dev(div5, t14);
    			append_dev(div5, input2);
    			set_input_value(input2, /*lc*/ ctx[2]);
    			append_dev(div8, t15);
    			append_dev(div8, div6);
    			append_dev(div6, label3);
    			append_dev(div6, t17);
    			append_dev(div6, input3);
    			set_input_value(input3, /*nt*/ ctx[4]);
    			append_dev(div8, t18);
    			append_dev(div8, div7);
    			append_dev(div7, label4);
    			append_dev(div7, t20);
    			if (if_block5) if_block5.m(div7, null);
    			append_dev(div7, t21);
    			if (if_block6) if_block6.m(div7, null);
    			append_dev(div7, t22);
    			append_dev(div7, button1);
    			append_dev(div10, t24);
    			append_dev(div10, footer);
    			append_dev(footer, div9);
    			append_dev(div9, button2);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", prevent_default(/*click_handler_2*/ ctx[16]), false, true, false),
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[18]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[19]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[20]),
    					listen_dev(input3, "input", /*input3_input_handler*/ ctx[21]),
    					listen_dev(button1, "click", prevent_default(/*click_handler_4*/ ctx[24]), false, true, false),
    					listen_dev(button2, "click", prevent_default(/*submit*/ ctx[11]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*listData*/ ctx[5].length == 0) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_7(ctx);
    					if_block0.c();
    					if_block0.m(div0, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty[0] & /*listData, dispatchdel, collapse*/ 4640) {
    				each_value_1 = /*listData*/ ctx[5];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (/*listData*/ ctx[5].length > 0) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_5(ctx);
    					if_block1.c();
    					if_block1.m(div1, t2);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*error*/ ctx[8] == false && /*sucess*/ ctx[7] == false) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_4(ctx);
    					if_block2.c();
    					if_block2.m(header, t4);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (/*error*/ ctx[8] == true) {
    				if (if_block3) ; else {
    					if_block3 = create_if_block_3$1(ctx);
    					if_block3.c();
    					if_block3.m(header, t5);
    				}
    			} else if (if_block3) {
    				if_block3.d(1);
    				if_block3 = null;
    			}

    			if (/*sucess*/ ctx[7]) {
    				if (if_block4) ; else {
    					if_block4 = create_if_block_2$1(ctx);
    					if_block4.c();
    					if_block4.m(header, null);
    				}
    			} else if (if_block4) {
    				if_block4.d(1);
    				if_block4 = null;
    			}

    			if (dirty[0] & /*ti*/ 1 && input0.value !== /*ti*/ ctx[0]) {
    				set_input_value(input0, /*ti*/ ctx[0]);
    			}

    			if (dirty[0] & /*error*/ 256) {
    				toggle_class(input0, "redin", /*error*/ ctx[8]);
    			}

    			if (dirty[0] & /*st*/ 2) {
    				set_input_value(input1, /*st*/ ctx[1]);
    			}

    			if (dirty[0] & /*lc*/ 4 && input2.value !== /*lc*/ ctx[2]) {
    				set_input_value(input2, /*lc*/ ctx[2]);
    			}

    			if (dirty[0] & /*nt*/ 16 && input3.value !== /*nt*/ ctx[4]) {
    				set_input_value(input3, /*nt*/ ctx[4]);
    			}

    			if (/*customeFlair*/ ctx[10]) {
    				if (if_block5) {
    					if_block5.p(ctx, dirty);
    				} else {
    					if_block5 = create_if_block_1$3(ctx);
    					if_block5.c();
    					if_block5.m(div7, t21);
    				}
    			} else if (if_block5) {
    				if_block5.d(1);
    				if_block5 = null;
    			}

    			if (!/*customeFlair*/ ctx[10]) {
    				if (if_block6) {
    					if_block6.p(ctx, dirty);
    				} else {
    					if_block6 = create_if_block$3(ctx);
    					if_block6.c();
    					if_block6.m(div7, t22);
    				}
    			} else if (if_block6) {
    				if_block6.d(1);
    				if_block6 = null;
    			}

    			if (dirty[0] & /*toggle*/ 64) {
    				toggle_class(form, "form-clip", /*toggle*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    			if (if_block0) if_block0.d();
    			destroy_each(each_blocks, detaching);
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			if (if_block4) if_block4.d();
    			if (if_block5) if_block5.d();
    			if (if_block6) if_block6.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let customeFlair;
    	let toggle;
    	let error;
    	let sucess;
    	let collapse;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Reminder', slots, []);
    	let ti = '', st = '', lc = '', fl = '', nt = '', listData = [];

    	class ReminderObj {
    		constructor(tiP, stP, lcP, ntP, flP, cl) {
    			this.id = `${UuidObj.uuid()}-${UuidObj.uuid()}`;
    			this.date = this.date();
    			this.title = tiP;
    			this.startTime = stP;
    			this.location = lcP;
    			this.notes = ntP;
    			this.flair = flP;
    			this.color = cl;
    		}

    		date() {
    			const dateIn = new Date();
    			return dateIn.toLocaleDateString();
    		}
    	}

    	let reminderKeyValue = "BUTAO-LASC-V1.1.1-reminderkeyvalue";

    	if (localStorage.getItem(reminderKeyValue) !== null) {
    		const localdata = localStorage.getItem(reminderKeyValue);
    		const newdata = JSON.parse(localdata);
    		listData = [...newdata];
    	}

    	function submit(e) {
    		$$invalidate(1, st = st == "" ? "00:00 unset" : st);
    		$$invalidate(2, lc = lc == "" ? "_ unset" : lc);
    		$$invalidate(3, fl = fl == "" ? "other" : fl);
    		let color = `hsl(${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}, 100%, 65%)`;
    		const data = new ReminderObj(ti, st, lc, nt, fl, color);
    		console.log(data);

    		if (ti == "") {
    			$$invalidate(8, error = true);

    			setTimeout(
    				() => {
    					$$invalidate(8, error = false);
    				},
    				5000
    			);
    		}

    		if (ti !== "") {
    			if (localStorage.getItem(reminderKeyValue) === null) {
    				$$invalidate(5, listData = [...listData, data]);
    				localStorage.setItem(reminderKeyValue, JSON.stringify(listData));
    			} else {
    				$$invalidate(5, listData = JSON.parse(localStorage.getItem(reminderKeyValue)));
    				$$invalidate(5, listData = [...listData, data]);
    				localStorage.setItem(reminderKeyValue, JSON.stringify(listData));
    			}

    			$$invalidate(0, ti = "");
    			$$invalidate(7, sucess = true);

    			setTimeout(
    				() => {
    					$$invalidate(7, sucess = false);
    					$$invalidate(6, toggle = !toggle);
    				},
    				2500
    			);
    		}
    	}

    	function dispatchdel(e) {
    		$$invalidate(5, listData = JSON.parse(localStorage.getItem(reminderKeyValue)));

    		const newListData = listData.filter(item => {
    			return item.id !== e;
    		});

    		localStorage.setItem(reminderKeyValue, JSON.stringify(newListData));
    		$$invalidate(5, listData = [...newListData]);
    	}

    	let select = ["discussion", "assessment", "assignment", "classes", "exams", "other"];
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Reminder> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(6, toggle = !toggle);
    	};

    	const click_handler_1 = () => {
    		$$invalidate(9, collapse = !collapse);
    	};

    	const click_handler_2 = () => {
    		$$invalidate(6, toggle = !toggle);
    	};

    	const click_handler_3 = () => {
    		$$invalidate(6, toggle = !toggle);
    	};

    	function input0_input_handler() {
    		ti = this.value;
    		$$invalidate(0, ti);
    	}

    	function input1_input_handler() {
    		st = this.value;
    		$$invalidate(1, st);
    	}

    	function input2_input_handler() {
    		lc = this.value;
    		$$invalidate(2, lc);
    	}

    	function input3_input_handler() {
    		nt = this.value;
    		$$invalidate(4, nt);
    	}

    	function select_1_change_handler() {
    		fl = select_value(this);
    		$$invalidate(3, fl);
    		$$invalidate(13, select);
    	}

    	function input_input_handler() {
    		fl = this.value;
    		$$invalidate(3, fl);
    		$$invalidate(13, select);
    	}

    	const click_handler_4 = () => {
    		$$invalidate(10, customeFlair = !customeFlair);
    	};

    	$$self.$capture_state = () => ({
    		UuidObj,
    		ti,
    		st,
    		lc,
    		fl,
    		nt,
    		listData,
    		ReminderObj,
    		reminderKeyValue,
    		submit,
    		dispatchdel,
    		select,
    		toggle,
    		sucess,
    		error,
    		collapse,
    		customeFlair
    	});

    	$$self.$inject_state = $$props => {
    		if ('ti' in $$props) $$invalidate(0, ti = $$props.ti);
    		if ('st' in $$props) $$invalidate(1, st = $$props.st);
    		if ('lc' in $$props) $$invalidate(2, lc = $$props.lc);
    		if ('fl' in $$props) $$invalidate(3, fl = $$props.fl);
    		if ('nt' in $$props) $$invalidate(4, nt = $$props.nt);
    		if ('listData' in $$props) $$invalidate(5, listData = $$props.listData);
    		if ('reminderKeyValue' in $$props) reminderKeyValue = $$props.reminderKeyValue;
    		if ('select' in $$props) $$invalidate(13, select = $$props.select);
    		if ('toggle' in $$props) $$invalidate(6, toggle = $$props.toggle);
    		if ('sucess' in $$props) $$invalidate(7, sucess = $$props.sucess);
    		if ('error' in $$props) $$invalidate(8, error = $$props.error);
    		if ('collapse' in $$props) $$invalidate(9, collapse = $$props.collapse);
    		if ('customeFlair' in $$props) $$invalidate(10, customeFlair = $$props.customeFlair);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$invalidate(10, customeFlair = true);
    	$$invalidate(6, toggle = false);
    	$$invalidate(8, error = false);
    	$$invalidate(7, sucess = false);
    	$$invalidate(9, collapse = false);

    	return [
    		ti,
    		st,
    		lc,
    		fl,
    		nt,
    		listData,
    		toggle,
    		sucess,
    		error,
    		collapse,
    		customeFlair,
    		submit,
    		dispatchdel,
    		select,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		select_1_change_handler,
    		input_input_handler,
    		click_handler_4
    	];
    }

    class Reminder extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {}, null, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Reminder",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src\routes\table.svelte generated by Svelte v3.50.1 */
    const file$a = "src\\routes\\table.svelte";

    function create_fragment$a(ctx) {
    	let article;
    	let div;
    	let table;
    	let thead;
    	let tr0;
    	let th0;
    	let t0;
    	let th1;
    	let t2;
    	let th2;
    	let t4;
    	let th3;
    	let t6;
    	let th4;
    	let t8;
    	let th5;
    	let t10;
    	let tbody;
    	let tr1;
    	let td0;
    	let t12;
    	let td1;
    	let t13;
    	let td2;
    	let t14;
    	let td3;
    	let t15;
    	let td4;
    	let t16;
    	let td5;
    	let t17;
    	let tr2;
    	let td6;
    	let t19;
    	let td7;
    	let t21;
    	let td8;
    	let t23;
    	let td9;
    	let t25;
    	let td10;
    	let t27;
    	let td11;
    	let t29;
    	let tr3;
    	let td12;
    	let t31;
    	let td13;
    	let t33;
    	let td14;
    	let t35;
    	let td15;
    	let t37;
    	let td16;
    	let t39;
    	let td17;
    	let t41;
    	let tr4;
    	let td18;
    	let t43;
    	let td19;
    	let t45;
    	let td20;
    	let t47;
    	let td21;
    	let t49;
    	let td22;
    	let t51;
    	let td23;
    	let t53;
    	let tr5;
    	let td24;
    	let t55;
    	let td25;
    	let t57;
    	let td26;
    	let t59;
    	let td27;
    	let t61;
    	let td28;
    	let t63;
    	let td29;
    	let t65;
    	let tr6;
    	let td30;
    	let t67;
    	let td31;
    	let t69;
    	let td32;
    	let t71;
    	let td33;
    	let t73;
    	let td34;
    	let t75;
    	let td35;
    	let t77;
    	let tr7;
    	let td36;
    	let t79;
    	let td37;
    	let t81;
    	let td38;
    	let t83;
    	let td39;
    	let t85;
    	let td40;
    	let t87;
    	let td41;
    	let t89;
    	let tr8;
    	let td42;
    	let t91;
    	let td43;
    	let t92;
    	let td44;
    	let t93;
    	let td45;
    	let t94;
    	let td46;
    	let t95;
    	let td47;
    	let t96;
    	let tr9;
    	let td48;
    	let t98;
    	let td49;
    	let t99;
    	let td50;
    	let t100;
    	let td51;
    	let t101;
    	let td52;
    	let t102;
    	let td53;
    	let t103;
    	let tr10;
    	let td54;
    	let t105;
    	let td55;
    	let t107;
    	let td56;
    	let t109;
    	let td57;
    	let t111;
    	let td58;
    	let t113;
    	let td59;
    	let t115;
    	let tr11;
    	let td60;
    	let t117;
    	let td61;
    	let t119;
    	let td62;
    	let t121;
    	let td63;
    	let t123;
    	let td64;
    	let t125;
    	let td65;
    	let t127;
    	let tr12;
    	let td66;
    	let t129;
    	let td67;
    	let t131;
    	let td68;
    	let t133;
    	let td69;
    	let t135;
    	let td70;
    	let t137;
    	let td71;
    	let t139;
    	let tr13;
    	let td72;
    	let t141;
    	let td73;
    	let t143;
    	let td74;
    	let t145;
    	let td75;
    	let t147;
    	let td76;
    	let t149;
    	let td77;
    	let t151;
    	let tr14;
    	let td78;
    	let t153;
    	let td79;
    	let t155;
    	let td80;
    	let t157;
    	let td81;
    	let t159;
    	let td82;
    	let t161;
    	let td83;
    	let t163;
    	let tr15;
    	let td84;
    	let t165;
    	let td85;
    	let t167;
    	let td86;
    	let t169;
    	let td87;
    	let t171;
    	let td88;
    	let t173;
    	let td89;
    	let t175;
    	let tr16;
    	let td90;
    	let t177;
    	let td91;
    	let t179;
    	let td92;
    	let t181;
    	let td93;
    	let t183;
    	let td94;
    	let t185;
    	let td95;
    	let t187;
    	let tr17;
    	let td96;
    	let t189;
    	let td97;
    	let t191;
    	let td98;
    	let t193;
    	let td99;
    	let t195;
    	let td100;
    	let t197;
    	let td101;

    	const block = {
    		c: function create() {
    			article = element("article");
    			div = element("div");
    			table = element("table");
    			thead = element("thead");
    			tr0 = element("tr");
    			th0 = element("th");
    			t0 = space();
    			th1 = element("th");
    			th1.textContent = "MON";
    			t2 = space();
    			th2 = element("th");
    			th2.textContent = "TUE";
    			t4 = space();
    			th3 = element("th");
    			th3.textContent = "WED";
    			t6 = space();
    			th4 = element("th");
    			th4.textContent = "THU";
    			t8 = space();
    			th5 = element("th");
    			th5.textContent = "FRI";
    			t10 = space();
    			tbody = element("tbody");
    			tr1 = element("tr");
    			td0 = element("td");
    			td0.textContent = "6 : 00";
    			t12 = space();
    			td1 = element("td");
    			t13 = space();
    			td2 = element("td");
    			t14 = space();
    			td3 = element("td");
    			t15 = space();
    			td4 = element("td");
    			t16 = space();
    			td5 = element("td");
    			t17 = space();
    			tr2 = element("tr");
    			td6 = element("td");
    			td6.textContent = "7 : 00";
    			t19 = space();
    			td7 = element("td");
    			td7.textContent = `${/*datarow*/ ctx[0]("07:00", 1)}`;
    			t21 = space();
    			td8 = element("td");
    			td8.textContent = `${/*datarow*/ ctx[0]("07:00", 2)}`;
    			t23 = space();
    			td9 = element("td");
    			td9.textContent = `${/*datarow*/ ctx[0]("07:00", 3)}`;
    			t25 = space();
    			td10 = element("td");
    			td10.textContent = `${/*datarow*/ ctx[0]("07:00", 4)}`;
    			t27 = space();
    			td11 = element("td");
    			td11.textContent = `${/*datarow*/ ctx[0]("07:00", 5)}`;
    			t29 = space();
    			tr3 = element("tr");
    			td12 = element("td");
    			td12.textContent = "8 : 00";
    			t31 = space();
    			td13 = element("td");
    			td13.textContent = `${/*datarow*/ ctx[0]("08:00", 1)}`;
    			t33 = space();
    			td14 = element("td");
    			td14.textContent = `${/*datarow*/ ctx[0]("08:00", 2)}`;
    			t35 = space();
    			td15 = element("td");
    			td15.textContent = `${/*datarow*/ ctx[0]("08:00", 3)}`;
    			t37 = space();
    			td16 = element("td");
    			td16.textContent = `${/*datarow*/ ctx[0]("08:00", 4)}`;
    			t39 = space();
    			td17 = element("td");
    			td17.textContent = `${/*datarow*/ ctx[0]("08:00", 5)}`;
    			t41 = space();
    			tr4 = element("tr");
    			td18 = element("td");
    			td18.textContent = "9 : 00";
    			t43 = space();
    			td19 = element("td");
    			td19.textContent = `${/*datarow*/ ctx[0]("09:00", 1)}`;
    			t45 = space();
    			td20 = element("td");
    			td20.textContent = `${/*datarow*/ ctx[0]("09:00", 2)}`;
    			t47 = space();
    			td21 = element("td");
    			td21.textContent = `${/*datarow*/ ctx[0]("09:00", 3)}`;
    			t49 = space();
    			td22 = element("td");
    			td22.textContent = `${/*datarow*/ ctx[0]("09:00", 4)}`;
    			t51 = space();
    			td23 = element("td");
    			td23.textContent = `${/*datarow*/ ctx[0]("09:00", 5)}`;
    			t53 = space();
    			tr5 = element("tr");
    			td24 = element("td");
    			td24.textContent = "10:00";
    			t55 = space();
    			td25 = element("td");
    			td25.textContent = `${/*datarow*/ ctx[0]("10:00", 1)}`;
    			t57 = space();
    			td26 = element("td");
    			td26.textContent = `${/*datarow*/ ctx[0]("10:00", 2)}`;
    			t59 = space();
    			td27 = element("td");
    			td27.textContent = `${/*datarow*/ ctx[0]("10:00", 3)}`;
    			t61 = space();
    			td28 = element("td");
    			td28.textContent = `${/*datarow*/ ctx[0]("10:00", 4)}`;
    			t63 = space();
    			td29 = element("td");
    			td29.textContent = `${/*datarow*/ ctx[0]("10:00", 5)}`;
    			t65 = space();
    			tr6 = element("tr");
    			td30 = element("td");
    			td30.textContent = "11:00";
    			t67 = space();
    			td31 = element("td");
    			td31.textContent = `${/*datarow*/ ctx[0]("11:00", 1)}`;
    			t69 = space();
    			td32 = element("td");
    			td32.textContent = `${/*datarow*/ ctx[0]("11:00", 2)}`;
    			t71 = space();
    			td33 = element("td");
    			td33.textContent = `${/*datarow*/ ctx[0]("11:00", 3)}`;
    			t73 = space();
    			td34 = element("td");
    			td34.textContent = `${/*datarow*/ ctx[0]("11:00", 4)}`;
    			t75 = space();
    			td35 = element("td");
    			td35.textContent = `${/*datarow*/ ctx[0]("11:00", 5)}`;
    			t77 = space();
    			tr7 = element("tr");
    			td36 = element("td");
    			td36.textContent = "12:00";
    			t79 = space();
    			td37 = element("td");
    			td37.textContent = `${/*datarow*/ ctx[0]("12:00", 1)}`;
    			t81 = space();
    			td38 = element("td");
    			td38.textContent = `${/*datarow*/ ctx[0]("12:00", 2)}`;
    			t83 = space();
    			td39 = element("td");
    			td39.textContent = `${/*datarow*/ ctx[0]("12:00", 3)}`;
    			t85 = space();
    			td40 = element("td");
    			td40.textContent = `${/*datarow*/ ctx[0]("12:00", 4)}`;
    			t87 = space();
    			td41 = element("td");
    			td41.textContent = `${/*datarow*/ ctx[0]("12:00", 5)}`;
    			t89 = space();
    			tr8 = element("tr");
    			td42 = element("td");
    			td42.textContent = "12:50";
    			t91 = space();
    			td43 = element("td");
    			t92 = space();
    			td44 = element("td");
    			t93 = space();
    			td45 = element("td");
    			t94 = space();
    			td46 = element("td");
    			t95 = space();
    			td47 = element("td");
    			t96 = space();
    			tr9 = element("tr");
    			td48 = element("td");
    			td48.textContent = "___";
    			t98 = space();
    			td49 = element("td");
    			t99 = space();
    			td50 = element("td");
    			t100 = space();
    			td51 = element("td");
    			t101 = space();
    			td52 = element("td");
    			t102 = space();
    			td53 = element("td");
    			t103 = space();
    			tr10 = element("tr");
    			td54 = element("td");
    			td54.textContent = "1 : 00";
    			t105 = space();
    			td55 = element("td");
    			td55.textContent = `${/*datarow*/ ctx[0]("13:00", 1)}`;
    			t107 = space();
    			td56 = element("td");
    			td56.textContent = `${/*datarow*/ ctx[0]("13:00", 2)}`;
    			t109 = space();
    			td57 = element("td");
    			td57.textContent = `${/*datarow*/ ctx[0]("13:00", 3)}`;
    			t111 = space();
    			td58 = element("td");
    			td58.textContent = `${/*datarow*/ ctx[0]("13:00", 4)}`;
    			t113 = space();
    			td59 = element("td");
    			td59.textContent = `${/*datarow*/ ctx[0]("13:00", 5)}`;
    			t115 = space();
    			tr11 = element("tr");
    			td60 = element("td");
    			td60.textContent = "2 : 00";
    			t117 = space();
    			td61 = element("td");
    			td61.textContent = `${/*datarow*/ ctx[0]("14:00", 1)}`;
    			t119 = space();
    			td62 = element("td");
    			td62.textContent = `${/*datarow*/ ctx[0]("14:00", 2)}`;
    			t121 = space();
    			td63 = element("td");
    			td63.textContent = `${/*datarow*/ ctx[0]("14:00", 3)}`;
    			t123 = space();
    			td64 = element("td");
    			td64.textContent = `${/*datarow*/ ctx[0]("14:00", 4)}`;
    			t125 = space();
    			td65 = element("td");
    			td65.textContent = `${/*datarow*/ ctx[0]("14:00", 5)}`;
    			t127 = space();
    			tr12 = element("tr");
    			td66 = element("td");
    			td66.textContent = "3 : 00";
    			t129 = space();
    			td67 = element("td");
    			td67.textContent = `${/*datarow*/ ctx[0]("15:00", 1)}`;
    			t131 = space();
    			td68 = element("td");
    			td68.textContent = `${/*datarow*/ ctx[0]("15:00", 2)}`;
    			t133 = space();
    			td69 = element("td");
    			td69.textContent = `${/*datarow*/ ctx[0]("15:00", 3)}`;
    			t135 = space();
    			td70 = element("td");
    			td70.textContent = `${/*datarow*/ ctx[0]("15:00", 4)}`;
    			t137 = space();
    			td71 = element("td");
    			td71.textContent = `${/*datarow*/ ctx[0]("15:00", 5)}`;
    			t139 = space();
    			tr13 = element("tr");
    			td72 = element("td");
    			td72.textContent = "4 : 00";
    			t141 = space();
    			td73 = element("td");
    			td73.textContent = `${/*datarow*/ ctx[0]("16:00", 1)}`;
    			t143 = space();
    			td74 = element("td");
    			td74.textContent = `${/*datarow*/ ctx[0]("16:00", 2)}`;
    			t145 = space();
    			td75 = element("td");
    			td75.textContent = `${/*datarow*/ ctx[0]("16:00", 3)}`;
    			t147 = space();
    			td76 = element("td");
    			td76.textContent = `${/*datarow*/ ctx[0]("16:00", 4)}`;
    			t149 = space();
    			td77 = element("td");
    			td77.textContent = `${/*datarow*/ ctx[0]("16:00", 5)}`;
    			t151 = space();
    			tr14 = element("tr");
    			td78 = element("td");
    			td78.textContent = "5 : 00";
    			t153 = space();
    			td79 = element("td");
    			td79.textContent = `${/*datarow*/ ctx[0]("17:00", 1)}`;
    			t155 = space();
    			td80 = element("td");
    			td80.textContent = `${/*datarow*/ ctx[0]("17:00", 2)}`;
    			t157 = space();
    			td81 = element("td");
    			td81.textContent = `${/*datarow*/ ctx[0]("17:00", 3)}`;
    			t159 = space();
    			td82 = element("td");
    			td82.textContent = `${/*datarow*/ ctx[0]("17:00", 4)}`;
    			t161 = space();
    			td83 = element("td");
    			td83.textContent = `${/*datarow*/ ctx[0]("17:00", 5)}`;
    			t163 = space();
    			tr15 = element("tr");
    			td84 = element("td");
    			td84.textContent = "6 : 00";
    			t165 = space();
    			td85 = element("td");
    			td85.textContent = `${/*datarow*/ ctx[0]("18:00", 1)}`;
    			t167 = space();
    			td86 = element("td");
    			td86.textContent = `${/*datarow*/ ctx[0]("18:00", 2)}`;
    			t169 = space();
    			td87 = element("td");
    			td87.textContent = `${/*datarow*/ ctx[0]("18:00", 3)}`;
    			t171 = space();
    			td88 = element("td");
    			td88.textContent = `${/*datarow*/ ctx[0]("18:00", 4)}`;
    			t173 = space();
    			td89 = element("td");
    			td89.textContent = `${/*datarow*/ ctx[0]("18:00", 5)}`;
    			t175 = space();
    			tr16 = element("tr");
    			td90 = element("td");
    			td90.textContent = "7 : 00";
    			t177 = space();
    			td91 = element("td");
    			td91.textContent = `${/*datarow*/ ctx[0]("19:00", 1)}`;
    			t179 = space();
    			td92 = element("td");
    			td92.textContent = `${/*datarow*/ ctx[0]("19:00", 2)}`;
    			t181 = space();
    			td93 = element("td");
    			td93.textContent = `${/*datarow*/ ctx[0]("19:00", 3)}`;
    			t183 = space();
    			td94 = element("td");
    			td94.textContent = `${/*datarow*/ ctx[0]("19:00", 4)}`;
    			t185 = space();
    			td95 = element("td");
    			td95.textContent = `${/*datarow*/ ctx[0]("19:00", 5)}`;
    			t187 = space();
    			tr17 = element("tr");
    			td96 = element("td");
    			td96.textContent = "8 : 00";
    			t189 = space();
    			td97 = element("td");
    			td97.textContent = `${/*datarow*/ ctx[0]("20:00", 1)}`;
    			t191 = space();
    			td98 = element("td");
    			td98.textContent = `${/*datarow*/ ctx[0]("20:00", 2)}`;
    			t193 = space();
    			td99 = element("td");
    			td99.textContent = `${/*datarow*/ ctx[0]("20:00", 3)}`;
    			t195 = space();
    			td100 = element("td");
    			td100.textContent = `${/*datarow*/ ctx[0]("20:00", 4)}`;
    			t197 = space();
    			td101 = element("td");
    			td101.textContent = `${/*datarow*/ ctx[0]("20:00", 5)}`;
    			attr_dev(th0, "class", "svelte-1lguuw8");
    			add_location(th0, file$a, 33, 20, 767);
    			attr_dev(th1, "class", "svelte-1lguuw8");
    			add_location(th1, file$a, 34, 20, 798);
    			attr_dev(th2, "class", "svelte-1lguuw8");
    			add_location(th2, file$a, 35, 20, 832);
    			attr_dev(th3, "class", "svelte-1lguuw8");
    			add_location(th3, file$a, 36, 20, 866);
    			attr_dev(th4, "class", "svelte-1lguuw8");
    			add_location(th4, file$a, 37, 20, 900);
    			attr_dev(th5, "class", "svelte-1lguuw8");
    			add_location(th5, file$a, 38, 20, 934);
    			attr_dev(tr0, "class", "svelte-1lguuw8");
    			add_location(tr0, file$a, 32, 16, 741);
    			add_location(thead, file$a, 31, 12, 716);
    			attr_dev(td0, "class", "h06 svelte-1lguuw8");
    			add_location(td0, file$a, 45, 20, 1094);
    			attr_dev(td1, "class", "mo6 svelte-1lguuw8");
    			add_location(td1, file$a, 46, 20, 1144);
    			attr_dev(td2, "class", "tu6 svelte-1lguuw8");
    			add_location(td2, file$a, 47, 20, 1188);
    			attr_dev(td3, "class", "we6 svelte-1lguuw8");
    			add_location(td3, file$a, 48, 20, 1231);
    			attr_dev(td4, "class", "th6 svelte-1lguuw8");
    			add_location(td4, file$a, 49, 20, 1274);
    			attr_dev(td5, "class", "fr6 svelte-1lguuw8");
    			add_location(td5, file$a, 50, 20, 1317);
    			attr_dev(tr1, "class", "svelte-1lguuw8");
    			add_location(tr1, file$a, 44, 16, 1068);
    			attr_dev(td6, "class", "h07 svelte-1lguuw8");
    			add_location(td6, file$a, 54, 20, 1426);
    			attr_dev(td7, "class", "mo7 svelte-1lguuw8");
    			add_location(td7, file$a, 55, 20, 1476);
    			attr_dev(td8, "class", "tu7 svelte-1lguuw8");
    			add_location(td8, file$a, 56, 20, 1539);
    			attr_dev(td9, "class", "we7 svelte-1lguuw8");
    			add_location(td9, file$a, 57, 20, 1602);
    			attr_dev(td10, "class", "th7 svelte-1lguuw8");
    			add_location(td10, file$a, 58, 20, 1665);
    			attr_dev(td11, "class", "fr7 svelte-1lguuw8");
    			add_location(td11, file$a, 59, 20, 1728);
    			attr_dev(tr2, "class", "svelte-1lguuw8");
    			add_location(tr2, file$a, 53, 16, 1400);
    			attr_dev(td12, "class", "h08 svelte-1lguuw8");
    			add_location(td12, file$a, 63, 20, 1857);
    			attr_dev(td13, "class", "mo8 svelte-1lguuw8");
    			add_location(td13, file$a, 64, 20, 1906);
    			attr_dev(td14, "class", "tu8 svelte-1lguuw8");
    			add_location(td14, file$a, 65, 20, 1969);
    			attr_dev(td15, "class", "we8 svelte-1lguuw8");
    			add_location(td15, file$a, 66, 20, 2032);
    			attr_dev(td16, "class", "th8 svelte-1lguuw8");
    			add_location(td16, file$a, 68, 20, 2111);
    			attr_dev(td17, "class", "fr8 svelte-1lguuw8");
    			add_location(td17, file$a, 69, 20, 2174);
    			attr_dev(tr3, "class", "svelte-1lguuw8");
    			add_location(tr3, file$a, 62, 16, 1831);
    			attr_dev(td18, "class", "h09 svelte-1lguuw8");
    			add_location(td18, file$a, 73, 20, 2303);
    			attr_dev(td19, "class", "mo9 svelte-1lguuw8");
    			add_location(td19, file$a, 74, 20, 2352);
    			attr_dev(td20, "class", "tu9 svelte-1lguuw8");
    			add_location(td20, file$a, 75, 20, 2415);
    			attr_dev(td21, "class", "we9 svelte-1lguuw8");
    			add_location(td21, file$a, 76, 20, 2478);
    			attr_dev(td22, "class", "th9 svelte-1lguuw8");
    			add_location(td22, file$a, 77, 20, 2541);
    			attr_dev(td23, "class", "fr9 svelte-1lguuw8");
    			add_location(td23, file$a, 78, 20, 2604);
    			attr_dev(tr4, "class", "svelte-1lguuw8");
    			add_location(tr4, file$a, 72, 16, 2277);
    			attr_dev(td24, "class", "h10 svelte-1lguuw8");
    			add_location(td24, file$a, 83, 20, 2741);
    			attr_dev(td25, "class", "mo10 svelte-1lguuw8");
    			add_location(td25, file$a, 84, 20, 2789);
    			attr_dev(td26, "class", "tu10 svelte-1lguuw8");
    			add_location(td26, file$a, 85, 20, 2853);
    			attr_dev(td27, "class", "we10 svelte-1lguuw8");
    			add_location(td27, file$a, 86, 20, 2917);
    			attr_dev(td28, "class", "th10 svelte-1lguuw8");
    			add_location(td28, file$a, 87, 20, 2981);
    			attr_dev(td29, "class", "fr10 svelte-1lguuw8");
    			add_location(td29, file$a, 88, 20, 3045);
    			attr_dev(tr5, "class", "svelte-1lguuw8");
    			add_location(tr5, file$a, 82, 16, 2715);
    			attr_dev(td30, "class", "h11 svelte-1lguuw8");
    			add_location(td30, file$a, 93, 20, 3196);
    			attr_dev(td31, "class", "mo11 svelte-1lguuw8");
    			add_location(td31, file$a, 94, 20, 3244);
    			attr_dev(td32, "class", "tu11 svelte-1lguuw8");
    			add_location(td32, file$a, 95, 20, 3308);
    			attr_dev(td33, "class", "we11 svelte-1lguuw8");
    			add_location(td33, file$a, 96, 20, 3372);
    			attr_dev(td34, "class", "th11 svelte-1lguuw8");
    			add_location(td34, file$a, 97, 20, 3436);
    			attr_dev(td35, "class", "fr11 svelte-1lguuw8");
    			add_location(td35, file$a, 98, 20, 3500);
    			attr_dev(tr6, "class", "svelte-1lguuw8");
    			add_location(tr6, file$a, 92, 16, 3170);
    			attr_dev(td36, "class", "h12 svelte-1lguuw8");
    			add_location(td36, file$a, 103, 20, 3632);
    			attr_dev(td37, "class", "mo12 svelte-1lguuw8");
    			add_location(td37, file$a, 104, 20, 3680);
    			attr_dev(td38, "class", "tu12 svelte-1lguuw8");
    			add_location(td38, file$a, 105, 20, 3744);
    			attr_dev(td39, "class", "we12 svelte-1lguuw8");
    			add_location(td39, file$a, 106, 20, 3808);
    			attr_dev(td40, "class", "th12 svelte-1lguuw8");
    			add_location(td40, file$a, 107, 20, 3872);
    			attr_dev(td41, "class", "fr12 svelte-1lguuw8");
    			add_location(td41, file$a, 108, 20, 3936);
    			attr_dev(tr7, "class", "svelte-1lguuw8");
    			add_location(tr7, file$a, 102, 16, 3606);
    			attr_dev(td42, "class", "h12 svelte-1lguuw8");
    			add_location(td42, file$a, 112, 20, 4067);
    			attr_dev(td43, "class", "mo12-50 svelte-1lguuw8");
    			add_location(td43, file$a, 113, 20, 4115);
    			attr_dev(td44, "class", "tu12-50 svelte-1lguuw8");
    			add_location(td44, file$a, 114, 20, 4162);
    			attr_dev(td45, "class", "we12-50 svelte-1lguuw8");
    			add_location(td45, file$a, 115, 20, 4209);
    			attr_dev(td46, "class", "th12-50 svelte-1lguuw8");
    			add_location(td46, file$a, 116, 20, 4256);
    			attr_dev(td47, "class", "fr12-50 svelte-1lguuw8");
    			add_location(td47, file$a, 117, 20, 4303);
    			attr_dev(tr8, "class", "svelte-1lguuw8");
    			add_location(tr8, file$a, 111, 16, 4041);
    			attr_dev(td48, "class", "h12 svelte-1lguuw8");
    			add_location(td48, file$a, 122, 20, 4412);
    			attr_dev(td49, "class", "svelte-1lguuw8");
    			add_location(td49, file$a, 123, 20, 4458);
    			attr_dev(td50, "class", "t_b12 svelte-1lguuw8");
    			add_location(td50, file$a, 124, 20, 4489);
    			attr_dev(td51, "class", "svelte-1lguuw8");
    			add_location(td51, file$a, 125, 20, 4534);
    			attr_dev(td52, "class", "svelte-1lguuw8");
    			add_location(td52, file$a, 126, 20, 4565);
    			attr_dev(td53, "class", "svelte-1lguuw8");
    			add_location(td53, file$a, 127, 20, 4596);
    			attr_dev(tr9, "class", "svelte-1lguuw8");
    			add_location(tr9, file$a, 121, 16, 4386);
    			attr_dev(td54, "class", "h13 svelte-1lguuw8");
    			add_location(td54, file$a, 131, 20, 4694);
    			attr_dev(td55, "class", "mo13 svelte-1lguuw8");
    			add_location(td55, file$a, 132, 20, 4743);
    			attr_dev(td56, "class", "tu13 svelte-1lguuw8");
    			add_location(td56, file$a, 133, 20, 4807);
    			attr_dev(td57, "class", "we13 svelte-1lguuw8");
    			add_location(td57, file$a, 134, 20, 4871);
    			attr_dev(td58, "class", "th13 svelte-1lguuw8");
    			add_location(td58, file$a, 135, 20, 4935);
    			attr_dev(td59, "class", "fr13 svelte-1lguuw8");
    			add_location(td59, file$a, 136, 20, 4999);
    			attr_dev(tr10, "class", "svelte-1lguuw8");
    			add_location(tr10, file$a, 130, 16, 4668);
    			attr_dev(td60, "class", "h14 svelte-1lguuw8");
    			add_location(td60, file$a, 140, 20, 5129);
    			attr_dev(td61, "class", "mo14 svelte-1lguuw8");
    			add_location(td61, file$a, 141, 20, 5178);
    			attr_dev(td62, "class", "tu14 svelte-1lguuw8");
    			add_location(td62, file$a, 142, 20, 5242);
    			attr_dev(td63, "class", "we14 svelte-1lguuw8");
    			add_location(td63, file$a, 143, 20, 5306);
    			attr_dev(td64, "class", "th14 svelte-1lguuw8");
    			add_location(td64, file$a, 144, 20, 5370);
    			attr_dev(td65, "class", "fr14 svelte-1lguuw8");
    			add_location(td65, file$a, 145, 20, 5434);
    			attr_dev(tr11, "class", "svelte-1lguuw8");
    			add_location(tr11, file$a, 139, 16, 5103);
    			attr_dev(td66, "class", "h15 svelte-1lguuw8");
    			add_location(td66, file$a, 149, 20, 5564);
    			attr_dev(td67, "class", "mo15 svelte-1lguuw8");
    			add_location(td67, file$a, 150, 20, 5613);
    			attr_dev(td68, "class", "tu15 svelte-1lguuw8");
    			add_location(td68, file$a, 151, 20, 5677);
    			attr_dev(td69, "class", "we15 svelte-1lguuw8");
    			add_location(td69, file$a, 152, 20, 5741);
    			attr_dev(td70, "class", "th15 svelte-1lguuw8");
    			add_location(td70, file$a, 153, 20, 5805);
    			attr_dev(td71, "class", "fr15 svelte-1lguuw8");
    			add_location(td71, file$a, 154, 20, 5869);
    			attr_dev(tr12, "class", "svelte-1lguuw8");
    			add_location(tr12, file$a, 148, 16, 5538);
    			attr_dev(td72, "class", "h16 svelte-1lguuw8");
    			add_location(td72, file$a, 158, 20, 5999);
    			attr_dev(td73, "class", "mo16 svelte-1lguuw8");
    			add_location(td73, file$a, 159, 20, 6048);
    			attr_dev(td74, "class", "tu16 svelte-1lguuw8");
    			add_location(td74, file$a, 160, 20, 6112);
    			attr_dev(td75, "class", "we16 svelte-1lguuw8");
    			add_location(td75, file$a, 161, 20, 6176);
    			attr_dev(td76, "class", "th16 svelte-1lguuw8");
    			add_location(td76, file$a, 162, 20, 6240);
    			attr_dev(td77, "class", "fr16 svelte-1lguuw8");
    			add_location(td77, file$a, 163, 20, 6304);
    			attr_dev(tr13, "class", "svelte-1lguuw8");
    			add_location(tr13, file$a, 157, 16, 5973);
    			attr_dev(td78, "class", "h17 svelte-1lguuw8");
    			add_location(td78, file$a, 167, 20, 6434);
    			attr_dev(td79, "class", "mo17 svelte-1lguuw8");
    			add_location(td79, file$a, 168, 20, 6483);
    			attr_dev(td80, "class", "tu17 svelte-1lguuw8");
    			add_location(td80, file$a, 169, 20, 6547);
    			attr_dev(td81, "class", "we17 svelte-1lguuw8");
    			add_location(td81, file$a, 170, 20, 6611);
    			attr_dev(td82, "class", "th17 svelte-1lguuw8");
    			add_location(td82, file$a, 171, 20, 6675);
    			attr_dev(td83, "class", "fr17 svelte-1lguuw8");
    			add_location(td83, file$a, 172, 20, 6739);
    			attr_dev(tr14, "class", "svelte-1lguuw8");
    			add_location(tr14, file$a, 166, 16, 6408);
    			attr_dev(td84, "class", "h18 svelte-1lguuw8");
    			add_location(td84, file$a, 176, 20, 6869);
    			attr_dev(td85, "class", "mo18 svelte-1lguuw8");
    			add_location(td85, file$a, 177, 20, 6918);
    			attr_dev(td86, "class", "tu18 svelte-1lguuw8");
    			add_location(td86, file$a, 178, 20, 6982);
    			attr_dev(td87, "class", "we18 svelte-1lguuw8");
    			add_location(td87, file$a, 179, 20, 7046);
    			attr_dev(td88, "class", "th18 svelte-1lguuw8");
    			add_location(td88, file$a, 180, 20, 7110);
    			attr_dev(td89, "class", "fr18 svelte-1lguuw8");
    			add_location(td89, file$a, 181, 20, 7174);
    			attr_dev(tr15, "class", "svelte-1lguuw8");
    			add_location(tr15, file$a, 175, 16, 6843);
    			attr_dev(td90, "class", "h19 svelte-1lguuw8");
    			add_location(td90, file$a, 185, 20, 7305);
    			attr_dev(td91, "class", "mo19 svelte-1lguuw8");
    			add_location(td91, file$a, 186, 20, 7354);
    			attr_dev(td92, "class", "tu19 svelte-1lguuw8");
    			add_location(td92, file$a, 187, 20, 7418);
    			attr_dev(td93, "class", "we19 svelte-1lguuw8");
    			add_location(td93, file$a, 188, 20, 7482);
    			attr_dev(td94, "class", "th19 svelte-1lguuw8");
    			add_location(td94, file$a, 189, 20, 7546);
    			attr_dev(td95, "class", "fr19 svelte-1lguuw8");
    			add_location(td95, file$a, 190, 20, 7610);
    			attr_dev(tr16, "class", "svelte-1lguuw8");
    			add_location(tr16, file$a, 184, 16, 7279);
    			attr_dev(td96, "class", "h20 svelte-1lguuw8");
    			add_location(td96, file$a, 194, 20, 7741);
    			attr_dev(td97, "class", "mo20 svelte-1lguuw8");
    			add_location(td97, file$a, 195, 20, 7790);
    			attr_dev(td98, "class", "tu20 svelte-1lguuw8");
    			add_location(td98, file$a, 196, 20, 7854);
    			attr_dev(td99, "class", "we20 svelte-1lguuw8");
    			add_location(td99, file$a, 197, 20, 7918);
    			attr_dev(td100, "class", "th20 svelte-1lguuw8");
    			add_location(td100, file$a, 198, 20, 7982);
    			attr_dev(td101, "class", "fr20 svelte-1lguuw8");
    			add_location(td101, file$a, 199, 20, 8046);
    			attr_dev(tr17, "class", "svelte-1lguuw8");
    			add_location(tr17, file$a, 193, 16, 7715);
    			add_location(tbody, file$a, 42, 12, 1026);
    			attr_dev(table, "class", "table svelte-1lguuw8");
    			add_location(table, file$a, 30, 8, 681);
    			attr_dev(div, "class", "time-t svelte-1lguuw8");
    			add_location(div, file$a, 29, 4, 651);
    			attr_dev(article, "id", "timetable");
    			attr_dev(article, "class", "svelte-1lguuw8");
    			add_location(article, file$a, 28, 0, 621);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, div);
    			append_dev(div, table);
    			append_dev(table, thead);
    			append_dev(thead, tr0);
    			append_dev(tr0, th0);
    			append_dev(tr0, t0);
    			append_dev(tr0, th1);
    			append_dev(tr0, t2);
    			append_dev(tr0, th2);
    			append_dev(tr0, t4);
    			append_dev(tr0, th3);
    			append_dev(tr0, t6);
    			append_dev(tr0, th4);
    			append_dev(tr0, t8);
    			append_dev(tr0, th5);
    			append_dev(table, t10);
    			append_dev(table, tbody);
    			append_dev(tbody, tr1);
    			append_dev(tr1, td0);
    			append_dev(tr1, t12);
    			append_dev(tr1, td1);
    			append_dev(tr1, t13);
    			append_dev(tr1, td2);
    			append_dev(tr1, t14);
    			append_dev(tr1, td3);
    			append_dev(tr1, t15);
    			append_dev(tr1, td4);
    			append_dev(tr1, t16);
    			append_dev(tr1, td5);
    			append_dev(tbody, t17);
    			append_dev(tbody, tr2);
    			append_dev(tr2, td6);
    			append_dev(tr2, t19);
    			append_dev(tr2, td7);
    			append_dev(tr2, t21);
    			append_dev(tr2, td8);
    			append_dev(tr2, t23);
    			append_dev(tr2, td9);
    			append_dev(tr2, t25);
    			append_dev(tr2, td10);
    			append_dev(tr2, t27);
    			append_dev(tr2, td11);
    			append_dev(tbody, t29);
    			append_dev(tbody, tr3);
    			append_dev(tr3, td12);
    			append_dev(tr3, t31);
    			append_dev(tr3, td13);
    			append_dev(tr3, t33);
    			append_dev(tr3, td14);
    			append_dev(tr3, t35);
    			append_dev(tr3, td15);
    			append_dev(tr3, t37);
    			append_dev(tr3, td16);
    			append_dev(tr3, t39);
    			append_dev(tr3, td17);
    			append_dev(tbody, t41);
    			append_dev(tbody, tr4);
    			append_dev(tr4, td18);
    			append_dev(tr4, t43);
    			append_dev(tr4, td19);
    			append_dev(tr4, t45);
    			append_dev(tr4, td20);
    			append_dev(tr4, t47);
    			append_dev(tr4, td21);
    			append_dev(tr4, t49);
    			append_dev(tr4, td22);
    			append_dev(tr4, t51);
    			append_dev(tr4, td23);
    			append_dev(tbody, t53);
    			append_dev(tbody, tr5);
    			append_dev(tr5, td24);
    			append_dev(tr5, t55);
    			append_dev(tr5, td25);
    			append_dev(tr5, t57);
    			append_dev(tr5, td26);
    			append_dev(tr5, t59);
    			append_dev(tr5, td27);
    			append_dev(tr5, t61);
    			append_dev(tr5, td28);
    			append_dev(tr5, t63);
    			append_dev(tr5, td29);
    			append_dev(tbody, t65);
    			append_dev(tbody, tr6);
    			append_dev(tr6, td30);
    			append_dev(tr6, t67);
    			append_dev(tr6, td31);
    			append_dev(tr6, t69);
    			append_dev(tr6, td32);
    			append_dev(tr6, t71);
    			append_dev(tr6, td33);
    			append_dev(tr6, t73);
    			append_dev(tr6, td34);
    			append_dev(tr6, t75);
    			append_dev(tr6, td35);
    			append_dev(tbody, t77);
    			append_dev(tbody, tr7);
    			append_dev(tr7, td36);
    			append_dev(tr7, t79);
    			append_dev(tr7, td37);
    			append_dev(tr7, t81);
    			append_dev(tr7, td38);
    			append_dev(tr7, t83);
    			append_dev(tr7, td39);
    			append_dev(tr7, t85);
    			append_dev(tr7, td40);
    			append_dev(tr7, t87);
    			append_dev(tr7, td41);
    			append_dev(tbody, t89);
    			append_dev(tbody, tr8);
    			append_dev(tr8, td42);
    			append_dev(tr8, t91);
    			append_dev(tr8, td43);
    			append_dev(tr8, t92);
    			append_dev(tr8, td44);
    			append_dev(tr8, t93);
    			append_dev(tr8, td45);
    			append_dev(tr8, t94);
    			append_dev(tr8, td46);
    			append_dev(tr8, t95);
    			append_dev(tr8, td47);
    			append_dev(tbody, t96);
    			append_dev(tbody, tr9);
    			append_dev(tr9, td48);
    			append_dev(tr9, t98);
    			append_dev(tr9, td49);
    			append_dev(tr9, t99);
    			append_dev(tr9, td50);
    			append_dev(tr9, t100);
    			append_dev(tr9, td51);
    			append_dev(tr9, t101);
    			append_dev(tr9, td52);
    			append_dev(tr9, t102);
    			append_dev(tr9, td53);
    			append_dev(tbody, t103);
    			append_dev(tbody, tr10);
    			append_dev(tr10, td54);
    			append_dev(tr10, t105);
    			append_dev(tr10, td55);
    			append_dev(tr10, t107);
    			append_dev(tr10, td56);
    			append_dev(tr10, t109);
    			append_dev(tr10, td57);
    			append_dev(tr10, t111);
    			append_dev(tr10, td58);
    			append_dev(tr10, t113);
    			append_dev(tr10, td59);
    			append_dev(tbody, t115);
    			append_dev(tbody, tr11);
    			append_dev(tr11, td60);
    			append_dev(tr11, t117);
    			append_dev(tr11, td61);
    			append_dev(tr11, t119);
    			append_dev(tr11, td62);
    			append_dev(tr11, t121);
    			append_dev(tr11, td63);
    			append_dev(tr11, t123);
    			append_dev(tr11, td64);
    			append_dev(tr11, t125);
    			append_dev(tr11, td65);
    			append_dev(tbody, t127);
    			append_dev(tbody, tr12);
    			append_dev(tr12, td66);
    			append_dev(tr12, t129);
    			append_dev(tr12, td67);
    			append_dev(tr12, t131);
    			append_dev(tr12, td68);
    			append_dev(tr12, t133);
    			append_dev(tr12, td69);
    			append_dev(tr12, t135);
    			append_dev(tr12, td70);
    			append_dev(tr12, t137);
    			append_dev(tr12, td71);
    			append_dev(tbody, t139);
    			append_dev(tbody, tr13);
    			append_dev(tr13, td72);
    			append_dev(tr13, t141);
    			append_dev(tr13, td73);
    			append_dev(tr13, t143);
    			append_dev(tr13, td74);
    			append_dev(tr13, t145);
    			append_dev(tr13, td75);
    			append_dev(tr13, t147);
    			append_dev(tr13, td76);
    			append_dev(tr13, t149);
    			append_dev(tr13, td77);
    			append_dev(tbody, t151);
    			append_dev(tbody, tr14);
    			append_dev(tr14, td78);
    			append_dev(tr14, t153);
    			append_dev(tr14, td79);
    			append_dev(tr14, t155);
    			append_dev(tr14, td80);
    			append_dev(tr14, t157);
    			append_dev(tr14, td81);
    			append_dev(tr14, t159);
    			append_dev(tr14, td82);
    			append_dev(tr14, t161);
    			append_dev(tr14, td83);
    			append_dev(tbody, t163);
    			append_dev(tbody, tr15);
    			append_dev(tr15, td84);
    			append_dev(tr15, t165);
    			append_dev(tr15, td85);
    			append_dev(tr15, t167);
    			append_dev(tr15, td86);
    			append_dev(tr15, t169);
    			append_dev(tr15, td87);
    			append_dev(tr15, t171);
    			append_dev(tr15, td88);
    			append_dev(tr15, t173);
    			append_dev(tr15, td89);
    			append_dev(tbody, t175);
    			append_dev(tbody, tr16);
    			append_dev(tr16, td90);
    			append_dev(tr16, t177);
    			append_dev(tr16, td91);
    			append_dev(tr16, t179);
    			append_dev(tr16, td92);
    			append_dev(tr16, t181);
    			append_dev(tr16, td93);
    			append_dev(tr16, t183);
    			append_dev(tr16, td94);
    			append_dev(tr16, t185);
    			append_dev(tr16, td95);
    			append_dev(tbody, t187);
    			append_dev(tbody, tr17);
    			append_dev(tr17, td96);
    			append_dev(tr17, t189);
    			append_dev(tr17, td97);
    			append_dev(tr17, t191);
    			append_dev(tr17, td98);
    			append_dev(tr17, t193);
    			append_dev(tr17, td99);
    			append_dev(tr17, t195);
    			append_dev(tr17, td100);
    			append_dev(tr17, t197);
    			append_dev(tr17, td101);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let $data;
    	validate_store(data, 'data');
    	component_subscribe($$self, data, $$value => $$invalidate(1, $data = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Table', slots, []);

    	function datarow(timeP, dayP) {
    		const store = $data.courses.map(element => {
    			return {
    				...element,
    				weekdays: element.weekdays.filter(weekdays => weekdays.initialTime == timeP)
    			};
    		}).filter(item => {
    			return item.weekdays.length !== 0;
    		});

    		let code = [];

    		store.forEach(item => {
    			item.weekdays.forEach(element => {
    				if (dayP == element.day) {
    					code = [...code, item.code];
    				}
    			});
    		});

    		return code;
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Table> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ data, datarow, $data });
    	return [datarow];
    }

    class Table extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Table",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\routes\slug.svelte generated by Svelte v3.50.1 */
    const file$9 = "src\\routes\\slug.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    // (56:36) {#each crs.weekdays as cr}
    function create_each_block_1(ctx) {
    	let div;
    	let p0;
    	let t0_value = /*cr*/ ctx[10].weekday + "";
    	let t0;
    	let t1;
    	let p1;
    	let t2_value = /*cr*/ ctx[10].location + "";
    	let t2;
    	let t3;
    	let p2;
    	let t4_value = /*cr*/ ctx[10].initialTime + "";
    	let t4;
    	let t5;
    	let t6_value = /*cr*/ ctx[10].finalTime + "";
    	let t6;
    	let t7;
    	let p3;
    	let t8_value = /*cr*/ ctx[10].type + "";
    	let t8;
    	let t9;
    	let p4;
    	let t10_value = /*cr*/ ctx[10].hours + "";
    	let t10;
    	let t11;
    	let t12;
    	let br;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			p1 = element("p");
    			t2 = text(t2_value);
    			t3 = space();
    			p2 = element("p");
    			t4 = text(t4_value);
    			t5 = text(" : ");
    			t6 = text(t6_value);
    			t7 = space();
    			p3 = element("p");
    			t8 = text(t8_value);
    			t9 = space();
    			p4 = element("p");
    			t10 = text(t10_value);
    			t11 = text("HRS");
    			t12 = space();
    			br = element("br");
    			attr_dev(p0, "class", "svelte-crr1mt");
    			add_location(p0, file$9, 59, 44, 1863);
    			attr_dev(p1, "class", "svelte-crr1mt");
    			add_location(p1, file$9, 60, 44, 1928);
    			attr_dev(p2, "class", "svelte-crr1mt");
    			add_location(p2, file$9, 61, 44, 1994);
    			attr_dev(p3, "class", "svelte-crr1mt");
    			add_location(p3, file$9, 62, 44, 2080);
    			attr_dev(p4, "class", "svelte-crr1mt");
    			add_location(p4, file$9, 63, 44, 2142);
    			attr_dev(div, "class", "details svelte-crr1mt");
    			add_location(div, file$9, 57, 40, 1794);
    			add_location(br, file$9, 66, 40, 2300);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p0);
    			append_dev(p0, t0);
    			append_dev(div, t1);
    			append_dev(div, p1);
    			append_dev(p1, t2);
    			append_dev(div, t3);
    			append_dev(div, p2);
    			append_dev(p2, t4);
    			append_dev(p2, t5);
    			append_dev(p2, t6);
    			append_dev(div, t7);
    			append_dev(div, p3);
    			append_dev(p3, t8);
    			append_dev(div, t9);
    			append_dev(div, p4);
    			append_dev(p4, t10);
    			append_dev(p4, t11);
    			insert_dev(target, t12, anchor);
    			insert_dev(target, br, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t12);
    			if (detaching) detach_dev(br);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(56:36) {#each crs.weekdays as cr}",
    		ctx
    	});

    	return block;
    }

    // (41:20) {#each crsfilter as crs}
    function create_each_block$3(ctx) {
    	let div4;
    	let div3;
    	let header;
    	let div1;
    	let h1;
    	let t0_value = /*crs*/ ctx[7].course + "";
    	let t0;
    	let t1;
    	let div0;
    	let h2;
    	let t2_value = /*crs*/ ctx[7].type + "";
    	let t2;
    	let t3;
    	let p0;
    	let t4_value = /*crs*/ ctx[7].gpa + "";
    	let t4;
    	let t5;
    	let t6;
    	let p1;
    	let t7_value = /*crs*/ ctx[7].code + "";
    	let t7;
    	let t8;
    	let main;
    	let div2;
    	let t9;
    	let each_value_1 = /*crs*/ ctx[7].weekdays;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			header = element("header");
    			div1 = element("div");
    			h1 = element("h1");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");
    			h2 = element("h2");
    			t2 = text(t2_value);
    			t3 = space();
    			p0 = element("p");
    			t4 = text(t4_value);
    			t5 = text(" GPA");
    			t6 = space();
    			p1 = element("p");
    			t7 = text(t7_value);
    			t8 = space();
    			main = element("main");
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t9 = space();
    			attr_dev(h1, "class", "svelte-crr1mt");
    			add_location(h1, file$9, 45, 36, 1169);
    			attr_dev(h2, "class", "svelte-crr1mt");
    			add_location(h2, file$9, 47, 40, 1291);
    			attr_dev(p0, "class", "svelte-crr1mt");
    			add_location(p0, file$9, 48, 40, 1352);
    			attr_dev(p1, "class", "svelte-crr1mt");
    			add_location(p1, file$9, 49, 40, 1414);
    			attr_dev(div0, "class", "details svelte-crr1mt");
    			add_location(div0, file$9, 46, 36, 1228);
    			attr_dev(div1, "class", "hd");
    			add_location(div1, file$9, 44, 32, 1115);
    			add_location(header, file$9, 43, 28, 1073);
    			attr_dev(div2, "class", "mn-cd");
    			add_location(div2, file$9, 54, 32, 1624);
    			add_location(main, file$9, 53, 28, 1584);
    			attr_dev(div3, "class", "cd svelte-crr1mt");
    			add_location(div3, file$9, 42, 24, 1027);
    			attr_dev(div4, "class", "card svelte-crr1mt");
    			add_location(div4, file$9, 41, 20, 983);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, header);
    			append_dev(header, div1);
    			append_dev(div1, h1);
    			append_dev(h1, t0);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(h2, t2);
    			append_dev(div0, t3);
    			append_dev(div0, p0);
    			append_dev(p0, t4);
    			append_dev(p0, t5);
    			append_dev(div0, t6);
    			append_dev(div0, p1);
    			append_dev(p1, t7);
    			append_dev(div3, t8);
    			append_dev(div3, main);
    			append_dev(main, div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}

    			append_dev(div4, t9);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*crsfilter*/ 1) {
    				each_value_1 = /*crs*/ ctx[7].weekdays;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div2, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(41:20) {#each crsfilter as crs}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let article;
    	let div2;
    	let main;
    	let div1;
    	let div0;
    	let each_value = /*crsfilter*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			article = element("article");
    			div2 = element("div");
    			main = element("main");
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "cards-view");
    			add_location(div0, file$9, 39, 16, 891);
    			attr_dev(div1, "class", "mn");
    			add_location(div1, file$9, 38, 12, 857);
    			add_location(main, file$9, 37, 8, 837);
    			attr_dev(div2, "class", "an-sct");
    			add_location(div2, file$9, 36, 4, 807);
    			attr_dev(article, "class", "analytics-section svelte-crr1mt");
    			add_location(article, file$9, 35, 0, 766);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, div2);
    			append_dev(div2, main);
    			append_dev(main, div1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*crsfilter*/ 1) {
    				each_value = /*crsfilter*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let $data;
    	validate_store(data, 'data');
    	component_subscribe($$self, data, $$value => $$invalidate(2, $data = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slug', slots, []);
    	let { params = {} } = $$props;
    	let date = new Date();
    	let day = date.getDay();

    	const arr = $data.courses.map(element => {
    		return {
    			...element,
    			weekdays: element.weekdays.filter(weekdays => weekdays.day === day)
    		};
    	}).filter(item => {
    		return item.weekdays.length !== 0;
    	});

    	const todaycrs = arr.map(element => {
    		let time = "";
    		element.weekdays.forEach(weekdays => time = weekdays.initialTime.substring(0, 2));
    		return { ...element, time };
    	}).sort((a, b) => {
    		return a.time.localeCompare(b.time);
    	}).map(item => {
    		return item;
    	});

    	const crsfilter = todaycrs.filter(item => {
    		return item.code == params.code;
    	});

    	const writable_props = ['params'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slug> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('params' in $$props) $$invalidate(1, params = $$props.params);
    	};

    	$$self.$capture_state = () => ({
    		params,
    		data,
    		date,
    		day,
    		arr,
    		todaycrs,
    		crsfilter,
    		$data
    	});

    	$$self.$inject_state = $$props => {
    		if ('params' in $$props) $$invalidate(1, params = $$props.params);
    		if ('date' in $$props) date = $$props.date;
    		if ('day' in $$props) day = $$props.day;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [crsfilter, params];
    }

    class Slug extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { params: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slug",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get params() {
    		throw new Error("<Slug>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set params(value) {
    		throw new Error("<Slug>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\lib\components\timecard.svelte generated by Svelte v3.50.1 */
    const file$8 = "src\\lib\\components\\timecard.svelte";

    function create_fragment$8(ctx) {
    	let div7;
    	let div6;
    	let div5;
    	let div0;
    	let button;
    	let svg;
    	let rect;
    	let path;
    	let t0;
    	let div1;
    	let h1;
    	let t2;
    	let div2;
    	let p0;
    	let t4;
    	let div3;
    	let t8;
    	let div4;
    	let p1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			div6 = element("div");
    			div5 = element("div");
    			div0 = element("div");
    			button = element("button");
    			svg = svg_element("svg");
    			rect = svg_element("rect");
    			path = svg_element("path");
    			t0 = space();
    			div1 = element("div");
    			h1 = element("h1");

    			h1.textContent = `${/*date*/ ctx[0].toLocaleDateString("en-GB", {
				day: "numeric",
				month: "long",
				year: "numeric"
			})}`;

    			t2 = space();
    			div2 = element("div");
    			p0 = element("p");
    			p0.textContent = `${`${/*date*/ ctx[0].getHours()} | ${/*date*/ ctx[0].getMinutes()}`}`;
    			t4 = space();
    			div3 = element("div");
    			div3.textContent = `... ${/*date*/ ctx[0].toLocaleDateString("en-GB", { weekday: "long" })} ...`;
    			t8 = space();
    			div4 = element("div");
    			p1 = element("p");
    			p1.textContent = "luanar app uses your system defined time";
    			attr_dev(rect, "x", "0.5");
    			attr_dev(rect, "y", "0.5");
    			attr_dev(rect, "width", "59");
    			attr_dev(rect, "height", "59");
    			attr_dev(rect, "rx", "29.5");
    			attr_dev(rect, "stroke", "#2EB035");
    			add_location(rect, file$8, 17, 18, 512);
    			attr_dev(path, "d", "M34.9203 23.636L29.9706 28.5858L25.0208 23.636C24.6362 23.2515 23.9912 23.2515 23.6066 23.636C23.222 24.0206 23.222 24.6657 23.6066 25.0503L29.9706 31.4142L36.3345 25.0503C36.7191 24.6657 36.7191 24.0206 36.3345 23.636C35.95 23.2515 35.3049 23.2515 34.9203 23.636ZM25.0208 36.364L29.9706 31.4142L34.9203 36.364C35.3049 36.7485 35.95 36.7485 36.3345 36.364C36.7191 35.9794 36.7191 35.3343 36.3345 34.9497L29.9706 28.5858L23.6066 34.9497C23.222 35.3343 23.222 35.9794 23.6066 36.364C23.9912 36.7485 24.6362 36.7485 25.0208 36.364Z");
    			attr_dev(path, "fill", "#207925");
    			add_location(path, file$8, 18, 18, 605);
    			attr_dev(svg, "width", "60");
    			attr_dev(svg, "height", "60");
    			attr_dev(svg, "viewBox", "0 0 60 60");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$8, 16, 16, 396);
    			attr_dev(button, "class", "svelte-1g0xx4u");
    			add_location(button, file$8, 14, 12, 348);
    			attr_dev(div0, "class", "cancel-svg svelte-1g0xx4u");
    			add_location(div0, file$8, 13, 10, 310);
    			add_location(h1, file$8, 24, 12, 1296);
    			attr_dev(div1, "class", "full-date svelte-1g0xx4u");
    			add_location(div1, file$8, 23, 10, 1259);
    			add_location(p0, file$8, 27, 12, 1450);
    			attr_dev(div2, "class", "full-time svelte-1g0xx4u");
    			add_location(div2, file$8, 26, 10, 1413);
    			attr_dev(div3, "class", "weekend svelte-1g0xx4u");
    			add_location(div3, file$8, 29, 10, 1532);
    			add_location(p1, file$8, 33, 12, 1693);
    			attr_dev(div4, "class", "tm-cd-msg svelte-1g0xx4u");
    			add_location(div4, file$8, 32, 10, 1656);
    			attr_dev(div5, "class", "tm-cd svelte-1g0xx4u");
    			add_location(div5, file$8, 12, 6, 279);
    			attr_dev(div6, "class", "time-card svelte-1g0xx4u");
    			add_location(div6, file$8, 11, 4, 248);
    			attr_dev(div7, "class", "tm-pcnt svelte-1g0xx4u");
    			add_location(div7, file$8, 9, 0, 219);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div6, div5);
    			append_dev(div5, div0);
    			append_dev(div0, button);
    			append_dev(button, svg);
    			append_dev(svg, rect);
    			append_dev(svg, path);
    			append_dev(div5, t0);
    			append_dev(div5, div1);
    			append_dev(div1, h1);
    			append_dev(div5, t2);
    			append_dev(div5, div2);
    			append_dev(div2, p0);
    			append_dev(div5, t4);
    			append_dev(div5, div3);
    			append_dev(div5, t8);
    			append_dev(div5, div4);
    			append_dev(div4, p1);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*timeFunc*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Timecard', slots, []);
    	const dispatch = createEventDispatcher();
    	let date = new Date();

    	function timeFunc() {
    		dispatch("timeEvent", true);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Timecard> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		date,
    		timeFunc
    	});

    	$$self.$inject_state = $$props => {
    		if ('date' in $$props) $$invalidate(0, date = $$props.date);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [date, timeFunc];
    }

    class Timecard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Timecard",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\lib\components\menu.svelte generated by Svelte v3.50.1 */
    const file$7 = "src\\lib\\components\\menu.svelte";

    // (113:36) {#if dark}
    function create_if_block_1$2(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "light theme";
    			attr_dev(p, "class", "svelte-lk1con");
    			add_location(p, file$7, 113, 36, 10739);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(113:36) {#if dark}",
    		ctx
    	});

    	return block;
    }

    // (116:36) {#if !dark}
    function create_if_block$2(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "dark theme";
    			attr_dev(p, "class", "svelte-lk1con");
    			add_location(p, file$7, 116, 36, 10887);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(116:36) {#if !dark}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div17;
    	let div16;
    	let header0;
    	let div0;
    	let button0;
    	let svg0;
    	let g;
    	let rect0;
    	let path0;
    	let defs;
    	let filter;
    	let feFlood;
    	let feColorMatrix0;
    	let feOffset;
    	let feGaussianBlur;
    	let feComposite;
    	let feColorMatrix1;
    	let feBlend0;
    	let feBlend1;
    	let t0;
    	let main3;
    	let div15;
    	let div10;
    	let div9;
    	let a0;
    	let header1;
    	let div3;
    	let div1;
    	let svg1;
    	let path1;
    	let t1;
    	let div2;
    	let h10;
    	let t3;
    	let main0;
    	let div4;
    	let p0;
    	let t5;
    	let p1;
    	let t7;
    	let a1;
    	let header2;
    	let div7;
    	let div5;
    	let svg2;
    	let path2;
    	let t8;
    	let div6;
    	let h11;
    	let t10;
    	let main1;
    	let div8;
    	let p2;
    	let t12;
    	let div14;
    	let div13;
    	let header3;
    	let div11;
    	let svg3;
    	let path3;
    	let path4;
    	let t13;
    	let hr;
    	let t14;
    	let main2;
    	let div12;
    	let button1;
    	let t15;
    	let t16;
    	let i;
    	let svg4;
    	let path5;
    	let rect1;
    	let rect2;
    	let rect3;
    	let rect4;
    	let rect5;
    	let rect6;
    	let rect7;
    	let rect8;
    	let rect9;
    	let rect10;
    	let rect11;
    	let rect12;
    	let rect13;
    	let rect14;
    	let rect15;
    	let mounted;
    	let dispose;
    	let if_block0 = /*dark*/ ctx[0] && create_if_block_1$2(ctx);
    	let if_block1 = !/*dark*/ ctx[0] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			div17 = element("div");
    			div16 = element("div");
    			header0 = element("header");
    			div0 = element("div");
    			button0 = element("button");
    			svg0 = svg_element("svg");
    			g = svg_element("g");
    			rect0 = svg_element("rect");
    			path0 = svg_element("path");
    			defs = svg_element("defs");
    			filter = svg_element("filter");
    			feFlood = svg_element("feFlood");
    			feColorMatrix0 = svg_element("feColorMatrix");
    			feOffset = svg_element("feOffset");
    			feGaussianBlur = svg_element("feGaussianBlur");
    			feComposite = svg_element("feComposite");
    			feColorMatrix1 = svg_element("feColorMatrix");
    			feBlend0 = svg_element("feBlend");
    			feBlend1 = svg_element("feBlend");
    			t0 = space();
    			main3 = element("main");
    			div15 = element("div");
    			div10 = element("div");
    			div9 = element("div");
    			a0 = element("a");
    			header1 = element("header");
    			div3 = element("div");
    			div1 = element("div");
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t1 = space();
    			div2 = element("div");
    			h10 = element("h1");
    			h10.textContent = "LUANAR BUSINESS";
    			t3 = space();
    			main0 = element("main");
    			div4 = element("div");
    			p0 = element("p");
    			p0.textContent = "⊝ view all avalable products avalable on campus";
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "OR / simply submit your product for the luanar online market.";
    			t7 = space();
    			a1 = element("a");
    			header2 = element("header");
    			div7 = element("div");
    			div5 = element("div");
    			svg2 = svg_element("svg");
    			path2 = svg_element("path");
    			t8 = space();
    			div6 = element("div");
    			h11 = element("h1");
    			h11.textContent = "LUANAR APP UPDATES";
    			t10 = space();
    			main1 = element("main");
    			div8 = element("div");
    			p2 = element("p");
    			p2.textContent = "⊝ see if there is an update avalble for your programmes app";
    			t12 = space();
    			div14 = element("div");
    			div13 = element("div");
    			header3 = element("header");
    			div11 = element("div");
    			svg3 = svg_element("svg");
    			path3 = svg_element("path");
    			path4 = svg_element("path");
    			t13 = space();
    			hr = element("hr");
    			t14 = space();
    			main2 = element("main");
    			div12 = element("div");
    			button1 = element("button");
    			if (if_block0) if_block0.c();
    			t15 = space();
    			if (if_block1) if_block1.c();
    			t16 = space();
    			i = element("i");
    			svg4 = svg_element("svg");
    			path5 = svg_element("path");
    			rect1 = svg_element("rect");
    			rect2 = svg_element("rect");
    			rect3 = svg_element("rect");
    			rect4 = svg_element("rect");
    			rect5 = svg_element("rect");
    			rect6 = svg_element("rect");
    			rect7 = svg_element("rect");
    			rect8 = svg_element("rect");
    			rect9 = svg_element("rect");
    			rect10 = svg_element("rect");
    			rect11 = svg_element("rect");
    			rect12 = svg_element("rect");
    			rect13 = svg_element("rect");
    			rect14 = svg_element("rect");
    			rect15 = svg_element("rect");
    			attr_dev(rect0, "x", "4");
    			attr_dev(rect0, "width", "44");
    			attr_dev(rect0, "height", "44");
    			attr_dev(rect0, "rx", "4");
    			attr_dev(rect0, "fill", "white");
    			attr_dev(rect0, "shape-rendering", "crispEdges");
    			add_location(rect0, file$7, 28, 24, 974);
    			attr_dev(path0, "d", "M28.7018 26.2982L23.807 21.4035C23.5789 21.1754 23.5789 22.8246 23.807 22.5965L28.7018 17.7018C28.8947 17.5263 29 17.2807 29 17C29 16.4561 28.5439 16 28 16C27.7193 16 27.4737 16.1053 27.2982 16.2982L22.4035 21.193C21.9474 21.6316 21.9474 22.3684 22.4035 22.807L27.2982 27.7018C27.4737 27.8947 27.7193 28 28 28C28.5439 28 29 27.5439 29 27C29 26.7193 28.8947 26.4737 28.7018 26.2982Z");
    			attr_dev(path0, "fill", "#333333");
    			add_location(path0, file$7, 29, 24, 1085);
    			attr_dev(g, "filter", "url(#filter0_d_6_147)");
    			add_location(g, file$7, 27, 24, 914);
    			attr_dev(feFlood, "flood-opacity", "0");
    			attr_dev(feFlood, "result", "BackgroundImageFix");
    			add_location(feFlood, file$7, 33, 24, 1735);
    			attr_dev(feColorMatrix0, "in", "SourceAlpha");
    			attr_dev(feColorMatrix0, "type", "matrix");
    			attr_dev(feColorMatrix0, "values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0");
    			attr_dev(feColorMatrix0, "result", "hardAlpha");
    			add_location(feColorMatrix0, file$7, 34, 24, 1817);
    			attr_dev(feOffset, "dy", "4");
    			add_location(feOffset, file$7, 35, 24, 1960);
    			attr_dev(feGaussianBlur, "stdDeviation", "2");
    			add_location(feGaussianBlur, file$7, 36, 24, 2004);
    			attr_dev(feComposite, "in2", "hardAlpha");
    			attr_dev(feComposite, "operator", "out");
    			add_location(feComposite, file$7, 37, 24, 2064);
    			attr_dev(feColorMatrix1, "type", "matrix");
    			attr_dev(feColorMatrix1, "values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0");
    			add_location(feColorMatrix1, file$7, 38, 24, 2135);
    			attr_dev(feBlend0, "mode", "normal");
    			attr_dev(feBlend0, "in2", "BackgroundImageFix");
    			attr_dev(feBlend0, "result", "effect1_dropShadow_6_147");
    			add_location(feBlend0, file$7, 39, 24, 2243);
    			attr_dev(feBlend1, "mode", "normal");
    			attr_dev(feBlend1, "in", "SourceGraphic");
    			attr_dev(feBlend1, "in2", "effect1_dropShadow_6_147");
    			attr_dev(feBlend1, "result", "shape");
    			add_location(feBlend1, file$7, 40, 24, 2352);
    			attr_dev(filter, "id", "filter0_d_6_147");
    			attr_dev(filter, "x", "0");
    			attr_dev(filter, "y", "0");
    			attr_dev(filter, "width", "52");
    			attr_dev(filter, "height", "52");
    			attr_dev(filter, "filterUnits", "userSpaceOnUse");
    			attr_dev(filter, "color-interpolation-filters", "sRGB");
    			add_location(filter, file$7, 32, 24, 1581);
    			add_location(defs, file$7, 31, 24, 1549);
    			attr_dev(svg0, "width", "52");
    			attr_dev(svg0, "height", "52");
    			attr_dev(svg0, "viewBox", "0 0 52 52");
    			attr_dev(svg0, "fill", "none");
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg0, "class", "svelte-lk1con");
    			add_location(svg0, file$7, 26, 20, 793);
    			attr_dev(button0, "class", "mnu-back svelte-lk1con");
    			add_location(button0, file$7, 25, 16, 726);
    			attr_dev(div0, "class", "hd");
    			add_location(div0, file$7, 24, 12, 692);
    			attr_dev(header0, "class", "svelte-lk1con");
    			add_location(header0, file$7, 23, 8, 670);
    			attr_dev(path1, "d", "M19 15V17C19 18.2632 18.2632 19 17 19H7C5.73684 19 5 18.2632 5 17V7C5 5.73684 5.73684 5 7 5H9C9.54386 5 10 4.54386 10 4C10 3.45614 9.54386 3 9 3H7C4.75439 3 3 4.75439 3 7V17C3 19.2456 4.75439 21 7 21H17C19.2456 21 21 19.2456 21 17V15C21 14.4561 20.5439 14 20 14C19.4561 14 19 14.4561 19 15ZM10.7018 14.7018L20.7018 4.70175C20.8947 4.52632 21 4.2807 21 4C21 3.45614 20.5439 3 20 3C19.7193 3 19.4737 3.10526 19.2982 3.29825L9.29825 13.2982C9.10526 13.4737 9 13.7193 9 14C9 14.5439 9.45614 15 10 15C10.2807 15 10.5263 14.8947 10.7018 14.7018ZM21 10V4.14035C21 3.49123 20.5088 3 19.8596 3H14C13.4561 3 13 3.45614 13 4C13 4.54386 13.4561 5 14 5H19.8596C20.0877 5 19 3.91228 19 4.14035V10C19 10.5439 19.4561 11 20 11C20.5439 11 21 10.5439 21 10Z");
    			attr_dev(path1, "fill", "#333333");
    			add_location(path1, file$7, 59, 44, 3185);
    			attr_dev(svg1, "width", "24");
    			attr_dev(svg1, "height", "24");
    			attr_dev(svg1, "viewBox", "0 0 24 24");
    			attr_dev(svg1, "fill", "none");
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg1, "class", "svelte-lk1con");
    			add_location(svg1, file$7, 58, 40, 3044);
    			attr_dev(div1, "class", "svg");
    			add_location(div1, file$7, 57, 36, 2985);
    			attr_dev(h10, "class", "svelte-lk1con");
    			add_location(h10, file$7, 64, 40, 4190);
    			attr_dev(div2, "class", "txt");
    			add_location(div2, file$7, 63, 36, 4131);
    			attr_dev(div3, "class", "lnk-header svelte-lk1con");
    			add_location(div3, file$7, 56, 32, 2923);
    			attr_dev(header1, "class", "svelte-lk1con");
    			add_location(header1, file$7, 55, 28, 2881);
    			attr_dev(p0, "class", "svelte-lk1con");
    			add_location(p0, file$7, 70, 36, 4461);
    			attr_dev(p1, "class", "svelte-lk1con");
    			add_location(p1, file$7, 71, 36, 4560);
    			attr_dev(div4, "class", "mn");
    			add_location(div4, file$7, 69, 32, 4407);
    			add_location(main0, file$7, 68, 28, 4367);
    			attr_dev(a0, "href", "https://luanarapp.netlify.app/ads");
    			attr_dev(a0, "class", "link-card svelte-lk1con");
    			add_location(a0, file$7, 54, 24, 2788);
    			attr_dev(path2, "d", "M18.7018 14.7018L20.0526 13.3509C21.2982 12.1228 22 10.4211 22 8.64912C22 4.96491 19.0351 2 15.3509 2C13.5789 2 11.8772 2.70175 10.6491 3.94737L9.29825 5.29825C9.10526 5.47368 9 5.7193 9 6C9 6.54386 9.45614 7 10 7C10.2807 7 10.5263 6.89474 10.7018 6.70175L12.0526 5.35088C12.9649 4.4386 14.0351 4 15.3509 4C18.0526 4 20 5.94737 20 8.64912C20 9.96491 19.5614 11.0351 18.6491 11.9474L17.2982 13.2982C17.1053 13.4737 17 13.7193 17 14C17 14.5439 17.4561 15 18 15C18.2807 15 18.5263 14.8947 18.7018 14.7018ZM13.2982 17.2982L11.9474 18.6491C11.0351 19.5614 9.96491 20 8.64912 20C5.94737 20 4 18.0526 4 15.3509C4 14.0351 4.4386 12.9649 5.35088 12.0526L6.70175 10.7018C6.89474 10.5263 7 10.2807 7 10C7 9.45614 6.54386 9 6 9C5.7193 9 5.47368 9.10526 5.29825 9.29825L3.94737 10.6491C2.70175 11.8772 2 13.5789 2 15.3509C2 19.0351 4.96491 22 8.64912 22C10.4211 22 12.1228 21.2982 13.3509 20.0526L14.7018 18.7018C14.8947 18.5263 15 18.2807 15 18C15 17.4561 14.5439 17 14 17C13.7193 17 13.4737 17.1053 13.2982 17.2982ZM9.70175 15.7018L15.7018 9.70175C15.8947 9.52632 16 9.2807 16 9C16 8.45614 15.5439 8 15 8C14.7193 8 14.4737 8.10526 14.2982 8.29825L8.29825 14.2982C8.10526 14.4737 8 14.7193 8 15C8 15.5439 8.45614 16 9 16C9.2807 16 9.52632 15.8947 9.70175 15.7018Z");
    			attr_dev(path2, "fill", "#333333");
    			add_location(path2, file$7, 80, 44, 5162);
    			attr_dev(svg2, "width", "24");
    			attr_dev(svg2, "height", "24");
    			attr_dev(svg2, "viewBox", "0 0 24 24");
    			attr_dev(svg2, "fill", "none");
    			attr_dev(svg2, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg2, "class", "svelte-lk1con");
    			add_location(svg2, file$7, 79, 40, 5021);
    			attr_dev(div5, "class", "svg");
    			add_location(div5, file$7, 78, 36, 4962);
    			attr_dev(h11, "class", "svelte-lk1con");
    			add_location(h11, file$7, 85, 40, 6679);
    			attr_dev(div6, "class", "txt");
    			add_location(div6, file$7, 84, 36, 6620);
    			attr_dev(div7, "class", "lnk-header svelte-lk1con");
    			add_location(div7, file$7, 77, 32, 4900);
    			attr_dev(header2, "class", "svelte-lk1con");
    			add_location(header2, file$7, 76, 28, 4858);
    			attr_dev(p2, "class", "svelte-lk1con");
    			add_location(p2, file$7, 91, 36, 6953);
    			attr_dev(div8, "class", "mn");
    			add_location(div8, file$7, 90, 32, 6899);
    			add_location(main1, file$7, 89, 28, 6859);
    			attr_dev(a1, "href", "https://luanarapp.netlify.app/updates");
    			attr_dev(a1, "class", "link-card svelte-lk1con");
    			add_location(a1, file$7, 75, 24, 4761);
    			attr_dev(div9, "class", "lnk");
    			add_location(div9, file$7, 51, 20, 2741);
    			attr_dev(div10, "class", "link-cnt");
    			add_location(div10, file$7, 50, 16, 2697);
    			attr_dev(path3, "d", "M12 15.75C9.93 15.75 8.25 14.07 8.25 12C8.25 9.93 9.93 8.25 12 8.25C14.07 8.25 15.75 9.93 15.75 12C15.75 14.07 14.07 15.75 12 15.75ZM12 9.75C10.76 9.75 9.75 10.76 9.75 12C9.75 13.24 10.76 14.25 12 14.25C13.24 14.25 14.25 13.24 14.25 12C14.25 10.76 13.24 9.75 12 9.75Z");
    			attr_dev(path3, "fill", "var(--tc)");
    			attr_dev(path3, "fill-opacity", "0.87");
    			add_location(path3, file$7, 102, 36, 7513);
    			attr_dev(path4, "d", "M15.21 22.19C15 22.19 14.79 22.16 14.58 22.11C13.96 21.94 13.44 21.55 13.11 21L12.99 20.8C12.4 19.78 11.59 19.78 11 20.8L10.89 20.99C10.56 21.55 10.04 21.95 9.42 22.11C8.79 22.28 8.14 22.19 7.59 21.86L5.87 20.87C5.26 20.52 4.82 19.95 4.63 19.26C4.45 18.57 4.54 17.86 4.89 17.25C5.18 16.74 5.26 16.28 5.09 15.99C4.92 15.7 4.49 15.53 3.9 15.53C2.44 15.53 1.25 14.34 1.25 12.88V11.12C1.25 9.66004 2.44 8.47004 3.9 8.47004C4.49 8.47004 4.92 8.30004 5.09 8.01004C5.26 7.72004 5.19 7.26004 4.89 6.75004C4.54 6.14004 4.45 5.42004 4.63 4.74004C4.81 4.05004 5.25 3.48004 5.87 3.13004L7.6 2.14004C8.73 1.47004 10.22 1.86004 10.9 3.01004L11.02 3.21004C11.61 4.23004 12.42 4.23004 13.01 3.21004L13.12 3.02004C13.8 1.86004 15.29 1.47004 16.43 2.15004L18.15 3.14004C18.76 3.49004 19.2 4.06004 19.39 4.75004C19.57 5.44004 19.48 6.15004 19.13 6.76004C18.84 7.27004 18.76 7.73004 18.93 8.02004C19.1 8.31004 19.53 8.48004 20.12 8.48004C21.58 8.48004 22.77 9.67004 22.77 11.13V12.89C22.77 14.35 21.58 15.54 20.12 15.54C19.53 15.54 19.1 15.71 18.93 16C18.76 16.29 18.83 16.75 19.13 17.26C19.48 17.87 19.58 18.59 19.39 19.27C19.21 19.96 18.77 20.53 18.15 20.88L16.42 21.87C16.04 22.08 15.63 22.19 15.21 22.19ZM12 18.49C12.89 18.49 13.72 19.05 14.29 20.04L14.4 20.23C14.52 20.44 14.72 20.59 14.96 20.65C15.2 20.71 15.44 20.68 15.64 20.56L17.37 19.56C17.63 19.41 17.83 19.16 17.91 18.86C17.99 18.56 17.95 18.25 17.8 17.99C17.23 17.01 17.16 16 17.6 15.23C18.04 14.46 18.95 14.02 20.09 14.02C20.73 14.02 21.24 13.51 21.24 12.87V11.11C21.24 10.48 20.73 9.96004 20.09 9.96004C18.95 9.96004 18.04 9.52004 17.6 8.75004C17.16 7.98004 17.23 6.97004 17.8 5.99004C17.95 5.73004 17.99 5.42004 17.91 5.12004C17.83 4.82004 17.64 4.58004 17.38 4.42004L15.65 3.43004C15.22 3.17004 14.65 3.32004 14.39 3.76004L14.28 3.95004C13.71 4.94004 12.88 5.50004 11.99 5.50004C11.1 5.50004 10.27 4.94004 9.7 3.95004L9.59 3.75004C9.34 3.33004 8.78 3.18004 8.35 3.43004L6.62 4.43004C6.36 4.58004 6.16 4.83004 6.08 5.13004C6 5.43004 6.04 5.74004 6.19 6.00004C6.76 6.98004 6.83 7.99004 6.39 8.76004C5.95 9.53004 5.04 9.97004 3.9 9.97004C3.26 9.97004 2.75 10.48 2.75 11.12V12.88C2.75 13.51 3.26 14.03 3.9 14.03C5.04 14.03 5.95 14.47 6.39 15.24C6.83 16.01 6.76 17.02 6.19 18C6.04 18.26 6 18.57 6.08 18.87C6.16 19.17 6.35 19.41 6.61 19.57L8.34 20.56C8.55 20.69 8.8 20.72 9.03 20.66C9.27 20.6 9.47 20.44 9.6 20.23L9.71 20.04C10.28 19.06 11.11 18.49 12 18.49Z");
    			attr_dev(path4, "fill", "var(--tc)");
    			attr_dev(path4, "fill-opacity", "0.87");
    			add_location(path4, file$7, 103, 36, 7867);
    			attr_dev(svg3, "width", "24");
    			attr_dev(svg3, "height", "24");
    			attr_dev(svg3, "viewBox", "0 0 24 24");
    			attr_dev(svg3, "fill", "none");
    			attr_dev(svg3, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg3, "class", "svelte-lk1con");
    			add_location(svg3, file$7, 101, 32, 7380);
    			attr_dev(div11, "class", "hd");
    			add_location(div11, file$7, 100, 28, 7330);
    			attr_dev(header3, "class", "svelte-lk1con");
    			add_location(header3, file$7, 99, 24, 7292);
    			add_location(hr, file$7, 108, 24, 10495);
    			attr_dev(path5, "d", "M12 20C7.45614 20 4 16.5439 4 12C4 7.45614 7.45614 4 12 4C16.5439 4 20 7.45614 20 12C20 16.5439 16.5439 20 12 20ZM12 22C17.5263 22 22 17.5263 22 12C22 6.47368 17.5263 2 12 2C6.47368 2 2 6.47368 2 12C2 17.5263 6.47368 22 12 22Z");
    			attr_dev(path5, "fill", "#333333");
    			add_location(path5, file$7, 119, 40, 11125);
    			attr_dev(rect1, "x", "7.5");
    			attr_dev(rect1, "y", "25");
    			attr_dev(rect1, "width", "9");
    			attr_dev(rect1, "height", "2");
    			attr_dev(rect1, "rx", "1");
    			attr_dev(rect1, "fill", "black");
    			add_location(rect1, file$7, 120, 40, 11420);
    			attr_dev(rect2, "x", "7.5");
    			attr_dev(rect2, "y", "25");
    			attr_dev(rect2, "width", "9");
    			attr_dev(rect2, "height", "2");
    			attr_dev(rect2, "rx", "1");
    			attr_dev(rect2, "fill", "black");
    			add_location(rect2, file$7, 121, 40, 11525);
    			attr_dev(rect3, "x", "7.5");
    			attr_dev(rect3, "y", "25");
    			attr_dev(rect3, "width", "9");
    			attr_dev(rect3, "height", "2");
    			attr_dev(rect3, "rx", "1");
    			attr_dev(rect3, "fill", "black");
    			add_location(rect3, file$7, 122, 40, 11630);
    			attr_dev(rect4, "x", "7.5");
    			attr_dev(rect4, "y", "25");
    			attr_dev(rect4, "width", "9");
    			attr_dev(rect4, "height", "2");
    			attr_dev(rect4, "rx", "1");
    			attr_dev(rect4, "fill", "black");
    			add_location(rect4, file$7, 123, 40, 11735);
    			attr_dev(rect5, "x", "7.5");
    			attr_dev(rect5, "y", "25");
    			attr_dev(rect5, "width", "9");
    			attr_dev(rect5, "height", "2");
    			attr_dev(rect5, "rx", "1");
    			attr_dev(rect5, "fill", "black");
    			add_location(rect5, file$7, 124, 40, 11840);
    			attr_dev(rect6, "x", "7.5");
    			attr_dev(rect6, "y", "28");
    			attr_dev(rect6, "width", "9");
    			attr_dev(rect6, "height", "2");
    			attr_dev(rect6, "rx", "1");
    			attr_dev(rect6, "fill", "black");
    			add_location(rect6, file$7, 125, 40, 11945);
    			attr_dev(rect7, "x", "7.5");
    			attr_dev(rect7, "y", "28");
    			attr_dev(rect7, "width", "9");
    			attr_dev(rect7, "height", "2");
    			attr_dev(rect7, "rx", "1");
    			attr_dev(rect7, "fill", "black");
    			add_location(rect7, file$7, 126, 40, 12050);
    			attr_dev(rect8, "x", "7.5");
    			attr_dev(rect8, "y", "28");
    			attr_dev(rect8, "width", "9");
    			attr_dev(rect8, "height", "2");
    			attr_dev(rect8, "rx", "1");
    			attr_dev(rect8, "fill", "black");
    			add_location(rect8, file$7, 127, 40, 12155);
    			attr_dev(rect9, "x", "7.5");
    			attr_dev(rect9, "y", "28");
    			attr_dev(rect9, "width", "9");
    			attr_dev(rect9, "height", "2");
    			attr_dev(rect9, "rx", "1");
    			attr_dev(rect9, "fill", "black");
    			add_location(rect9, file$7, 128, 40, 12260);
    			attr_dev(rect10, "x", "7.5");
    			attr_dev(rect10, "y", "28");
    			attr_dev(rect10, "width", "9");
    			attr_dev(rect10, "height", "2");
    			attr_dev(rect10, "rx", "1");
    			attr_dev(rect10, "fill", "black");
    			add_location(rect10, file$7, 129, 40, 12365);
    			attr_dev(rect11, "x", "9.5");
    			attr_dev(rect11, "y", "31");
    			attr_dev(rect11, "width", "5");
    			attr_dev(rect11, "height", "2");
    			attr_dev(rect11, "rx", "1");
    			attr_dev(rect11, "fill", "black");
    			add_location(rect11, file$7, 130, 40, 12470);
    			attr_dev(rect12, "x", "9.5");
    			attr_dev(rect12, "y", "31");
    			attr_dev(rect12, "width", "5");
    			attr_dev(rect12, "height", "2");
    			attr_dev(rect12, "rx", "1");
    			attr_dev(rect12, "fill", "black");
    			add_location(rect12, file$7, 131, 40, 12575);
    			attr_dev(rect13, "x", "9.5");
    			attr_dev(rect13, "y", "31");
    			attr_dev(rect13, "width", "5");
    			attr_dev(rect13, "height", "2");
    			attr_dev(rect13, "rx", "1");
    			attr_dev(rect13, "fill", "black");
    			add_location(rect13, file$7, 132, 40, 12680);
    			attr_dev(rect14, "x", "9.5");
    			attr_dev(rect14, "y", "31");
    			attr_dev(rect14, "width", "5");
    			attr_dev(rect14, "height", "2");
    			attr_dev(rect14, "rx", "1");
    			attr_dev(rect14, "fill", "black");
    			add_location(rect14, file$7, 133, 40, 12785);
    			attr_dev(rect15, "x", "9.5");
    			attr_dev(rect15, "y", "31");
    			attr_dev(rect15, "width", "5");
    			attr_dev(rect15, "height", "2");
    			attr_dev(rect15, "rx", "1");
    			attr_dev(rect15, "fill", "black");
    			add_location(rect15, file$7, 134, 40, 12890);
    			attr_dev(svg4, "width", "24");
    			attr_dev(svg4, "height", "33");
    			attr_dev(svg4, "viewBox", "0 0 24 33");
    			attr_dev(svg4, "fill", "none");
    			attr_dev(svg4, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg4, "class", "svelte-lk1con");
    			add_location(svg4, file$7, 118, 39, 10988);
    			add_location(i, file$7, 118, 36, 10985);
    			attr_dev(button1, "class", "theme svelte-lk1con");
    			add_location(button1, file$7, 111, 32, 10611);
    			attr_dev(div12, "class", "mn");
    			add_location(div12, file$7, 110, 28, 10561);
    			add_location(main2, file$7, 109, 24, 10525);
    			attr_dev(div13, "class", "cfg-");
    			add_location(div13, file$7, 98, 20, 7248);
    			attr_dev(div14, "class", "config-cnt");
    			add_location(div14, file$7, 97, 16, 7202);
    			attr_dev(div15, "class", "mn");
    			add_location(div15, file$7, 49, 12, 2663);
    			add_location(main3, file$7, 48, 8, 2643);
    			attr_dev(div16, "class", "mp-content svelte-lk1con");
    			add_location(div16, file$7, 22, 4, 636);
    			attr_dev(div17, "class", "mnu-pcnt svelte-lk1con");
    			add_location(div17, file$7, 21, 0, 608);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div17, anchor);
    			append_dev(div17, div16);
    			append_dev(div16, header0);
    			append_dev(header0, div0);
    			append_dev(div0, button0);
    			append_dev(button0, svg0);
    			append_dev(svg0, g);
    			append_dev(g, rect0);
    			append_dev(g, path0);
    			append_dev(svg0, defs);
    			append_dev(defs, filter);
    			append_dev(filter, feFlood);
    			append_dev(filter, feColorMatrix0);
    			append_dev(filter, feOffset);
    			append_dev(filter, feGaussianBlur);
    			append_dev(filter, feComposite);
    			append_dev(filter, feColorMatrix1);
    			append_dev(filter, feBlend0);
    			append_dev(filter, feBlend1);
    			append_dev(div16, t0);
    			append_dev(div16, main3);
    			append_dev(main3, div15);
    			append_dev(div15, div10);
    			append_dev(div10, div9);
    			append_dev(div9, a0);
    			append_dev(a0, header1);
    			append_dev(header1, div3);
    			append_dev(div3, div1);
    			append_dev(div1, svg1);
    			append_dev(svg1, path1);
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			append_dev(div2, h10);
    			append_dev(a0, t3);
    			append_dev(a0, main0);
    			append_dev(main0, div4);
    			append_dev(div4, p0);
    			append_dev(div4, t5);
    			append_dev(div4, p1);
    			append_dev(div9, t7);
    			append_dev(div9, a1);
    			append_dev(a1, header2);
    			append_dev(header2, div7);
    			append_dev(div7, div5);
    			append_dev(div5, svg2);
    			append_dev(svg2, path2);
    			append_dev(div7, t8);
    			append_dev(div7, div6);
    			append_dev(div6, h11);
    			append_dev(a1, t10);
    			append_dev(a1, main1);
    			append_dev(main1, div8);
    			append_dev(div8, p2);
    			append_dev(div15, t12);
    			append_dev(div15, div14);
    			append_dev(div14, div13);
    			append_dev(div13, header3);
    			append_dev(header3, div11);
    			append_dev(div11, svg3);
    			append_dev(svg3, path3);
    			append_dev(svg3, path4);
    			append_dev(div13, t13);
    			append_dev(div13, hr);
    			append_dev(div13, t14);
    			append_dev(div13, main2);
    			append_dev(main2, div12);
    			append_dev(div12, button1);
    			if (if_block0) if_block0.m(button1, null);
    			append_dev(button1, t15);
    			if (if_block1) if_block1.m(button1, null);
    			append_dev(button1, t16);
    			append_dev(button1, i);
    			append_dev(i, svg4);
    			append_dev(svg4, path5);
    			append_dev(svg4, rect1);
    			append_dev(svg4, rect2);
    			append_dev(svg4, rect3);
    			append_dev(svg4, rect4);
    			append_dev(svg4, rect5);
    			append_dev(svg4, rect6);
    			append_dev(svg4, rect7);
    			append_dev(svg4, rect8);
    			append_dev(svg4, rect9);
    			append_dev(svg4, rect10);
    			append_dev(svg4, rect11);
    			append_dev(svg4, rect12);
    			append_dev(svg4, rect13);
    			append_dev(svg4, rect14);
    			append_dev(svg4, rect15);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*menuFunc*/ ctx[1], false, false, false),
    					listen_dev(button1, "click", /*darkFunc*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*dark*/ ctx[0]) {
    				if (if_block0) ; else {
    					if_block0 = create_if_block_1$2(ctx);
    					if_block0.c();
    					if_block0.m(button1, t15);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (!/*dark*/ ctx[0]) {
    				if (if_block1) ; else {
    					if_block1 = create_if_block$2(ctx);
    					if_block1.c();
    					if_block1.m(button1, t16);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div17);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let dark;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Menu', slots, []);
    	let darkKeyValue = "BUTAO-LASC-V1.1.1-darkkeyvalue";
    	const dispatch = createEventDispatcher();

    	function menuFunc() {
    		dispatch("menuEvent", true);
    	}

    	function darkFunc() {
    		$$invalidate(0, dark = !dark);
    		localStorage.setItem(darkKeyValue, JSON.stringify(dark));
    		dispatch("darkEvent", true);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Menu> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		darkKeyValue,
    		dispatch,
    		menuFunc,
    		darkFunc,
    		dark
    	});

    	$$self.$inject_state = $$props => {
    		if ('darkKeyValue' in $$props) $$invalidate(3, darkKeyValue = $$props.darkKeyValue);
    		if ('dark' in $$props) $$invalidate(0, dark = $$props.dark);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$invalidate(0, dark = false);

    	if (localStorage.getItem(darkKeyValue) !== null) {
    		let darkLocal = localStorage.getItem(darkKeyValue);
    		$$invalidate(0, dark = JSON.parse(darkLocal));
    	}

    	return [dark, menuFunc, darkFunc];
    }

    class Menu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Menu",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* node_modules\svelte-carousel\src\components\Dot\Dot.svelte generated by Svelte v3.50.1 */

    const file$6 = "node_modules\\svelte-carousel\\src\\components\\Dot\\Dot.svelte";

    function create_fragment$6(ctx) {
    	let div;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "sc-carousel-dot__dot svelte-1uelw0b");
    			toggle_class(div, "sc-carousel-dot__dot_active", /*active*/ ctx[0]);
    			add_location(div, file$6, 7, 0, 99);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*active*/ 1) {
    				toggle_class(div, "sc-carousel-dot__dot_active", /*active*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Dot', slots, []);
    	let { active = false } = $$props;
    	const writable_props = ['active'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Dot> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('active' in $$props) $$invalidate(0, active = $$props.active);
    	};

    	$$self.$capture_state = () => ({ active });

    	$$self.$inject_state = $$props => {
    		if ('active' in $$props) $$invalidate(0, active = $$props.active);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [active, click_handler];
    }

    class Dot extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { active: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dot",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get active() {
    		throw new Error("<Dot>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<Dot>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-carousel\src\components\Dots\Dots.svelte generated by Svelte v3.50.1 */
    const file$5 = "node_modules\\svelte-carousel\\src\\components\\Dots\\Dots.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	child_ctx[7] = i;
    	return child_ctx;
    }

    // (23:2) {#each Array(pagesCount) as _, pageIndex (pageIndex)}
    function create_each_block$2(key_1, ctx) {
    	let div;
    	let dot;
    	let t;
    	let current;

    	function click_handler() {
    		return /*click_handler*/ ctx[3](/*pageIndex*/ ctx[7]);
    	}

    	dot = new Dot({
    			props: {
    				active: /*currentPageIndex*/ ctx[1] === /*pageIndex*/ ctx[7]
    			},
    			$$inline: true
    		});

    	dot.$on("click", click_handler);

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			create_component(dot.$$.fragment);
    			t = space();
    			attr_dev(div, "class", "sc-carousel-dots__dot-container svelte-1oj5bge");
    			add_location(div, file$5, 23, 4, 515);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(dot, div, null);
    			append_dev(div, t);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const dot_changes = {};
    			if (dirty & /*currentPageIndex, pagesCount*/ 3) dot_changes.active = /*currentPageIndex*/ ctx[1] === /*pageIndex*/ ctx[7];
    			dot.$set(dot_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(dot.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(dot.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(dot);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(23:2) {#each Array(pagesCount) as _, pageIndex (pageIndex)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let current;
    	let each_value = Array(/*pagesCount*/ ctx[0]);
    	validate_each_argument(each_value);
    	const get_key = ctx => /*pageIndex*/ ctx[7];
    	validate_each_keys(ctx, each_value, get_each_context$2, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$2(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "sc-carousel-dots__container svelte-1oj5bge");
    			add_location(div, file$5, 21, 0, 411);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*currentPageIndex, Array, pagesCount, handleDotClick*/ 7) {
    				each_value = Array(/*pagesCount*/ ctx[0]);
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$2, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, outro_and_destroy_block, create_each_block$2, null, get_each_context$2);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Dots', slots, []);
    	const dispatch = createEventDispatcher();
    	let { pagesCount = 1 } = $$props;
    	let { currentPageIndex = 0 } = $$props;

    	function handleDotClick(pageIndex) {
    		dispatch('pageChange', pageIndex);
    	}

    	const writable_props = ['pagesCount', 'currentPageIndex'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Dots> was created with unknown prop '${key}'`);
    	});

    	const click_handler = pageIndex => handleDotClick(pageIndex);

    	$$self.$$set = $$props => {
    		if ('pagesCount' in $$props) $$invalidate(0, pagesCount = $$props.pagesCount);
    		if ('currentPageIndex' in $$props) $$invalidate(1, currentPageIndex = $$props.currentPageIndex);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Dot,
    		dispatch,
    		pagesCount,
    		currentPageIndex,
    		handleDotClick
    	});

    	$$self.$inject_state = $$props => {
    		if ('pagesCount' in $$props) $$invalidate(0, pagesCount = $$props.pagesCount);
    		if ('currentPageIndex' in $$props) $$invalidate(1, currentPageIndex = $$props.currentPageIndex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pagesCount, currentPageIndex, handleDotClick, click_handler];
    }

    class Dots extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { pagesCount: 0, currentPageIndex: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dots",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get pagesCount() {
    		throw new Error("<Dots>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pagesCount(value) {
    		throw new Error("<Dots>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get currentPageIndex() {
    		throw new Error("<Dots>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set currentPageIndex(value) {
    		throw new Error("<Dots>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const PREV = 'prev';
    const NEXT = 'next';

    /* node_modules\svelte-carousel\src\components\Arrow\Arrow.svelte generated by Svelte v3.50.1 */
    const file$4 = "node_modules\\svelte-carousel\\src\\components\\Arrow\\Arrow.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let i;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			i = element("i");
    			attr_dev(i, "class", "sc-carousel-arrow__arrow svelte-9ztt4p");
    			toggle_class(i, "sc-carousel-arrow__arrow-next", /*direction*/ ctx[0] === NEXT);
    			toggle_class(i, "sc-carousel-arrow__arrow-prev", /*direction*/ ctx[0] === PREV);
    			add_location(i, file$4, 19, 2, 371);
    			attr_dev(div, "class", "sc-carousel-arrow__circle svelte-9ztt4p");
    			toggle_class(div, "sc-carousel-arrow__circle_disabled", /*disabled*/ ctx[1]);
    			add_location(div, file$4, 14, 0, 256);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, i);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*direction, NEXT*/ 1) {
    				toggle_class(i, "sc-carousel-arrow__arrow-next", /*direction*/ ctx[0] === NEXT);
    			}

    			if (dirty & /*direction, PREV*/ 1) {
    				toggle_class(i, "sc-carousel-arrow__arrow-prev", /*direction*/ ctx[0] === PREV);
    			}

    			if (dirty & /*disabled*/ 2) {
    				toggle_class(div, "sc-carousel-arrow__circle_disabled", /*disabled*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Arrow', slots, []);
    	let { direction = NEXT } = $$props;
    	let { disabled = false } = $$props;
    	const writable_props = ['direction', 'disabled'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Arrow> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('direction' in $$props) $$invalidate(0, direction = $$props.direction);
    		if ('disabled' in $$props) $$invalidate(1, disabled = $$props.disabled);
    	};

    	$$self.$capture_state = () => ({ NEXT, PREV, direction, disabled });

    	$$self.$inject_state = $$props => {
    		if ('direction' in $$props) $$invalidate(0, direction = $$props.direction);
    		if ('disabled' in $$props) $$invalidate(1, disabled = $$props.disabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [direction, disabled, click_handler];
    }

    class Arrow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { direction: 0, disabled: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Arrow",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get direction() {
    		throw new Error("<Arrow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set direction(value) {
    		throw new Error("<Arrow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Arrow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Arrow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-carousel\src\components\Progress\Progress.svelte generated by Svelte v3.50.1 */

    const file$3 = "node_modules\\svelte-carousel\\src\\components\\Progress\\Progress.svelte";

    function create_fragment$3(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "sc-carousel-progress__indicator svelte-nuyenl");
    			set_style(div, "width", /*width*/ ctx[0] + "%");
    			add_location(div, file$3, 11, 0, 192);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*width*/ 1) {
    				set_style(div, "width", /*width*/ ctx[0] + "%");
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const MAX_PERCENT = 100;

    function instance$3($$self, $$props, $$invalidate) {
    	let width;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Progress', slots, []);
    	let { value = 0 } = $$props;
    	const writable_props = ['value'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Progress> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(1, value = $$props.value);
    	};

    	$$self.$capture_state = () => ({ MAX_PERCENT, value, width });

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(1, value = $$props.value);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*value*/ 2) {
    			$$invalidate(0, width = Math.min(Math.max(value * MAX_PERCENT, 0), MAX_PERCENT));
    		}
    	};

    	return [width, value];
    }

    class Progress extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { value: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Progress",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get value() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    // start event
    function addStartEventListener(source, cb) {
      source.addEventListener('mousedown', cb);
      source.addEventListener('touchstart', cb, { passive: true });
    }
    function removeStartEventListener(source, cb) {
      source.removeEventListener('mousedown', cb);
      source.removeEventListener('touchstart', cb);
    }

    // end event
    function addEndEventListener(source, cb) {
      source.addEventListener('mouseup', cb);
      source.addEventListener('touchend', cb);
    }
    function removeEndEventListener(source, cb) {
      source.removeEventListener('mouseup', cb);
      source.removeEventListener('touchend', cb);
    }

    // move event
    function addMoveEventListener(source, cb) {
      source.addEventListener('mousemove', cb);
      source.addEventListener('touchmove', cb);
    }
    function removeMoveEventListener(source, cb) {
      source.removeEventListener('mousemove', cb);
      source.removeEventListener('touchmove', cb);
    }

    function createDispatcher(source) {
      return function (event, data) {
        source.dispatchEvent(
          new CustomEvent(event, {
            detail: data,
          })
        );
      }
    }

    const TAP_DURATION_MS = 110;
    const TAP_MOVEMENT_PX = 9; // max movement during the tap, keep it small

    const SWIPE_MIN_DURATION_MS = 111;
    const SWIPE_MIN_DISTANCE_PX = 20;

    function getCoords(event) {
      if ('TouchEvent' in window && event instanceof TouchEvent) {
        const touch = event.touches[0];
        return {
          x: touch ? touch.clientX : 0,
          y: touch ? touch.clientY : 0,
        }
      }
      return {
        x: event.clientX,
        y: event.clientY,
      }
    }

    function swipeable(node, { thresholdProvider }) {
      const dispatch = createDispatcher(node);
      let x;
      let y;
      let moved = 0;
      let swipeStartedAt;
      let isTouching = false;

      function isValidSwipe() {
        const swipeDurationMs = Date.now() - swipeStartedAt;
        return swipeDurationMs >= SWIPE_MIN_DURATION_MS && Math.abs(moved) >= SWIPE_MIN_DISTANCE_PX
      }

      function handleDown(event) {
        swipeStartedAt = Date.now();
        moved = 0;
        isTouching = true;
        const coords = getCoords(event);
        x = coords.x;
        y = coords.y;
        dispatch('swipeStart', { x, y });
        addMoveEventListener(window, handleMove);
        addEndEventListener(window, handleUp);
      }

      function handleMove(event) {
        if (!isTouching) return
        const coords = getCoords(event);
        const dx = coords.x - x;
        const dy = coords.y - y;
        x = coords.x;
        y = coords.y;
        dispatch('swipeMove', { x, y, dx, dy });

        if (dx !== 0 && Math.sign(dx) !== Math.sign(moved)) {
          moved = 0;
        }
        moved += dx;
        if (Math.abs(moved) > thresholdProvider()) {
          dispatch('swipeThresholdReached', { direction: moved > 0 ? PREV : NEXT });
          removeEndEventListener(window, handleUp);
          removeMoveEventListener(window, handleMove);
        }
      }

      function handleUp(event) {
        event.preventDefault();
        removeEndEventListener(window, handleUp);
        removeMoveEventListener(window, handleMove);

        isTouching = false;

        if (!isValidSwipe()) {
          dispatch('swipeFailed');
          return
        }
        const coords = getCoords(event);
        dispatch('swipeEnd', { x: coords.x, y: coords.y });
      }

      addStartEventListener(node, handleDown);
      return {
        destroy() {
          removeStartEventListener(node, handleDown);
        },
      }
    }

    // in event
    function addHoverInEventListener(source, cb) {
      source.addEventListener('mouseenter', cb);
    }
    function removeHoverInEventListener(source, cb) {
      source.removeEventListener('mouseenter', cb);
    }

    // out event
    function addHoverOutEventListener(source, cb) {
      source.addEventListener('mouseleave', cb);
    }
    function removeHoverOutEventListener(source, cb) {
      source.removeEventListener('mouseleave', cb);
    }

    /**
     * hoverable events are for mouse events only
     */
    function hoverable(node) {
      const dispatch = createDispatcher(node);

      function handleHoverIn() {
        addHoverOutEventListener(node, handleHoverOut);
        dispatch('hovered', { value: true });
      }

      function handleHoverOut() {
        dispatch('hovered', { value: false });
        removeHoverOutEventListener(node, handleHoverOut);
      }

      addHoverInEventListener(node, handleHoverIn);
      
      return {
        destroy() {
          removeHoverInEventListener(node, handleHoverIn);
          removeHoverOutEventListener(node, handleHoverOut);
        },
      }
    }

    const getDistance = (p1, p2) => {
      const xDist = p2.x - p1.x;
      const yDist = p2.y - p1.y;

      return Math.sqrt((xDist * xDist) + (yDist * yDist));
    };

    function getValueInRange(min, value, max) {
      return Math.max(min, Math.min(value, max))
    }

    // tap start event
    function addFocusinEventListener(source, cb) {
      source.addEventListener('touchstart', cb, { passive: true });
    }
    function removeFocusinEventListener(source, cb) {
      source.removeEventListener('touchstart', cb);
    }

    // tap end event
    function addFocusoutEventListener(source, cb) {
      source.addEventListener('touchend', cb);
    }
    function removeFocusoutEventListener(source, cb) {
      source.removeEventListener('touchend', cb);
    }

    /**
     * tappable events are for touchable devices only
     */
    function tappable(node) {
      const dispatch = createDispatcher(node);

      let tapStartedAt = 0;
      let tapStartPos = { x: 0, y: 0 };

      function getIsValidTap({
        tapEndedAt,
        tapEndedPos
      }) {
        const tapTime = tapEndedAt - tapStartedAt;
        const tapDist = getDistance(tapStartPos, tapEndedPos);
        return (
          tapTime <= TAP_DURATION_MS &&
          tapDist <= TAP_MOVEMENT_PX
        )
      }

      function handleTapstart(event) {
        tapStartedAt = Date.now();

        const touch = event.touches[0];
        tapStartPos = { x: touch.clientX, y: touch.clientY };

        addFocusoutEventListener(node, handleTapend);
      }

      function handleTapend(event) {
        event.preventDefault();
        removeFocusoutEventListener(node, handleTapend);

        const touch = event.changedTouches[0];
        if (getIsValidTap({
          tapEndedAt: Date.now(),
          tapEndedPos: { x: touch.clientX, y: touch.clientY }
        })) {
          dispatch('tapped');
        }
      }

      addFocusinEventListener(node, handleTapstart);
      
      return {
        destroy() {
          removeFocusinEventListener(node, handleTapstart);
          removeFocusoutEventListener(node, handleTapend);
        },
      }
    }

    // getCurrentPageIndexByCurrentParticleIndex

    function _getCurrentPageIndexByCurrentParticleIndexInfinite({
      currentParticleIndex,
      particlesCount,
      clonesCountHead,
      clonesCountTotal,
      particlesToScroll,
    }) {
      if (currentParticleIndex === particlesCount - clonesCountHead) return 0
      if (currentParticleIndex === 0) return _getPagesCountByParticlesCountInfinite({
        particlesCountWithoutClones: particlesCount - clonesCountTotal,
        particlesToScroll,
      }) - 1
      return Math.floor((currentParticleIndex - clonesCountHead) / particlesToScroll)
    }

    function _getCurrentPageIndexByCurrentParticleIndexLimited({
      currentParticleIndex,
      particlesToScroll,
    }) {
      return Math.ceil(currentParticleIndex / particlesToScroll)
    }

    function getCurrentPageIndexByCurrentParticleIndex({
      currentParticleIndex,
      particlesCount,
      clonesCountHead,
      clonesCountTotal,
      infinite,
      particlesToScroll,
    }) {
      return infinite
        ? _getCurrentPageIndexByCurrentParticleIndexInfinite({
          currentParticleIndex,
          particlesCount,
          clonesCountHead,
          clonesCountTotal,
          particlesToScroll,
        })
        : _getCurrentPageIndexByCurrentParticleIndexLimited({
          currentParticleIndex,
          particlesToScroll,
        })
    }

    // getPagesCountByParticlesCount

    function _getPagesCountByParticlesCountInfinite({
      particlesCountWithoutClones,
      particlesToScroll,
    }) {
      return Math.ceil(particlesCountWithoutClones / particlesToScroll)
    }

    function _getPagesCountByParticlesCountLimited({
      particlesCountWithoutClones,
      particlesToScroll,
      particlesToShow,
    }) {
      const partialPageSize = getPartialPageSize({
        particlesCountWithoutClones,
        particlesToScroll,
        particlesToShow,
      });
      return Math.ceil(particlesCountWithoutClones / particlesToScroll) - partialPageSize
    }

    function getPagesCountByParticlesCount({
      infinite,
      particlesCountWithoutClones,
      particlesToScroll,
      particlesToShow,
    }) {
      return infinite
        ? _getPagesCountByParticlesCountInfinite({
          particlesCountWithoutClones,
          particlesToScroll,
        })
        : _getPagesCountByParticlesCountLimited({
          particlesCountWithoutClones,
          particlesToScroll,
          particlesToShow,
        })
    }

    // getParticleIndexByPageIndex

    function _getParticleIndexByPageIndexInfinite({
      pageIndex,
      clonesCountHead,
      clonesCountTail,
      particlesToScroll,
      particlesCount,
    }) {
      return getValueInRange(
        0,
        Math.min(clonesCountHead + pageIndex * particlesToScroll, particlesCount - clonesCountTail),
        particlesCount - 1
      )
    }

    function _getParticleIndexByPageIndexLimited({
      pageIndex,
      particlesToScroll,
      particlesCount,
      particlesToShow,
    }) {
      return getValueInRange(
        0,
        Math.min(pageIndex * particlesToScroll, particlesCount - particlesToShow),
        particlesCount - 1
      ) 
    }

    function getParticleIndexByPageIndex({
      infinite,
      pageIndex,
      clonesCountHead,
      clonesCountTail,
      particlesToScroll,
      particlesCount,
      particlesToShow,
    }) {
      return infinite
        ? _getParticleIndexByPageIndexInfinite({
          pageIndex,
          clonesCountHead,
          clonesCountTail,
          particlesToScroll,
          particlesCount,
        })
        : _getParticleIndexByPageIndexLimited({
          pageIndex,
          particlesToScroll,
          particlesCount,
          particlesToShow,
        })
    }

    function applyParticleSizes({
      particlesContainerChildren,
      particleWidth,
    }) {
      for (let particleIndex=0; particleIndex<particlesContainerChildren.length; particleIndex++) {
        particlesContainerChildren[particleIndex].style.minWidth = `${particleWidth}px`;
        particlesContainerChildren[particleIndex].style.maxWidth = `${particleWidth}px`;
      }
    }

    function getPartialPageSize({
      particlesToScroll,
      particlesToShow,
      particlesCountWithoutClones, 
    }) {
      const overlap = particlesToScroll - particlesToShow;
      let particlesCount = particlesToShow;

      while(true) {
        const diff = particlesCountWithoutClones - particlesCount - overlap;
        if (diff < particlesToShow) {
          return Math.max(diff, 0) // show: 2; scroll: 3, n: 5 => -1
        }
        particlesCount += particlesToShow + overlap;
      }
    }

    function createResizeObserver(onResize) {
      return new ResizeObserver(entries => {
        onResize({
          width: entries[0].contentRect.width,
        });
      });
    }

    function getClones({
      clonesCountHead,
      clonesCountTail,
      particlesContainerChildren,
    }) {
      // TODO: add fns to remove clones if needed
      const clonesToAppend = [];
      for (let i=0; i<clonesCountTail; i++) {
        clonesToAppend.push(particlesContainerChildren[i].cloneNode(true));
      }

      const clonesToPrepend = [];
      const len = particlesContainerChildren.length;
      for (let i=len-1; i>len-1-clonesCountHead; i--) {
        clonesToPrepend.push(particlesContainerChildren[i].cloneNode(true));
      }

      return {
        clonesToAppend,
        clonesToPrepend,
      }
    }

    function applyClones({
      particlesContainer,
      clonesToAppend,
      clonesToPrepend,
    }) {
      for (let i=0; i<clonesToAppend.length; i++) {
        particlesContainer.append(clonesToAppend[i]);
      }
      for (let i=0; i<clonesToPrepend.length; i++) {
        particlesContainer.prepend(clonesToPrepend[i]);
      }
    }

    function getClonesCount({
      infinite,
      particlesToShow,
      partialPageSize,
    }) {
      const clonesCount = infinite
        ? {
          // need to round with ceil as particlesToShow, particlesToShow can be floating (e.g. 1.5, 3.75)
          head: Math.ceil(partialPageSize || particlesToShow),
          tail: Math.ceil(particlesToShow),
        } : {
          head: 0,
          tail: 0,
        };

      return {
        ...clonesCount,
        total: clonesCount.head + clonesCount.tail,
      }
    }

    const get$1 = (object, fieldName, defaultValue) => {
      if (object && object.hasOwnProperty(fieldName)) {
        return object[fieldName]
      }
      if (defaultValue === undefined) {
        throw new Error(`Required arg "${fieldName}" was not provided`)
      }
      return defaultValue
    };

    const switcher = (description) => (key) => {
      description[key] && description[key]();
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    /** Used as the `TypeError` message for "Functions" methods. */
    var FUNC_ERROR_TEXT = 'Expected a function';

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;

    /** `Object#toString` result references. */
    var funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        symbolTag = '[object Symbol]';

    /** Used to match property names within property paths. */
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        reIsPlainProp = /^\w*$/,
        reLeadingDot = /^\./,
        rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to match backslashes in property paths. */
    var reEscapeChar = /\\(\\)?/g;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    /**
     * Checks if `value` is a host object in IE < 9.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
     */
    function isHostObject(value) {
      // Many host objects are `Object` objects that can coerce to strings
      // despite having improperly defined `toString` methods.
      var result = false;
      if (value != null && typeof value.toString != 'function') {
        try {
          result = !!(value + '');
        } catch (e) {}
      }
      return result;
    }

    /** Used for built-in method references. */
    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = root['__core-js_shared__'];

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Built-in value references. */
    var Symbol$1 = root.Symbol,
        splice = arrayProto.splice;

    /* Built-in method references that are verified to be native. */
    var Map$1 = getNative(root, 'Map'),
        nativeCreate = getNative(Object, 'create');

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
    }

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
      return this;
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
    }

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map$1 || ListCache),
        'string': new Hash
      };
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      return getMapData(this, key)['delete'](key);
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = isKey(path, object) ? [path] : castPath(path);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value) {
      return isArray(value) ? value : stringToPath(value);
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = memoize(function(string) {
      string = toString(string);

      var result = [];
      if (reLeadingDot.test(string)) {
        result.push('');
      }
      string.replace(rePropName, function(match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to process.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache);
      return memoized;
    }

    // Assign cache to `_.memoize`.
    memoize.Cache = MapCache;

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 8-9 which returns 'object' for typed array and other constructors.
      var tag = isObject(value) ? objectToString.call(value) : '';
      return tag == funcTag || tag == genTag;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && objectToString.call(value) == symbolTag);
    }

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }

    var lodash_get = get;

    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    var lodash_clonedeep = createCommonjsModule(function (module, exports) {
    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        objectTag = '[object Object]',
        promiseTag = '[object Promise]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        symbolTag = '[object Symbol]',
        weakMapTag = '[object WeakMap]';

    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to match `RegExp` flags from their coerced string values. */
    var reFlags = /\w*$/;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /** Used to identify `toStringTag` values supported by `_.clone`. */
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] =
    cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
    cloneableTags[boolTag] = cloneableTags[dateTag] =
    cloneableTags[float32Tag] = cloneableTags[float64Tag] =
    cloneableTags[int8Tag] = cloneableTags[int16Tag] =
    cloneableTags[int32Tag] = cloneableTags[mapTag] =
    cloneableTags[numberTag] = cloneableTags[objectTag] =
    cloneableTags[regexpTag] = cloneableTags[setTag] =
    cloneableTags[stringTag] = cloneableTags[symbolTag] =
    cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
    cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] =
    cloneableTags[weakMapTag] = false;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();

    /** Detect free variable `exports`. */
    var freeExports = exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /**
     * Adds the key-value `pair` to `map`.
     *
     * @private
     * @param {Object} map The map to modify.
     * @param {Array} pair The key-value pair to add.
     * @returns {Object} Returns `map`.
     */
    function addMapEntry(map, pair) {
      // Don't return `map.set` because it's not chainable in IE 11.
      map.set(pair[0], pair[1]);
      return map;
    }

    /**
     * Adds `value` to `set`.
     *
     * @private
     * @param {Object} set The set to modify.
     * @param {*} value The value to add.
     * @returns {Object} Returns `set`.
     */
    function addSetEntry(set, value) {
      // Don't return `set.add` because it's not chainable in IE 11.
      set.add(value);
      return set;
    }

    /**
     * A specialized version of `_.forEach` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEach(array, iteratee) {
      var index = -1,
          length = array ? array.length : 0;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }

    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }

    /**
     * A specialized version of `_.reduce` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initAccum] Specify using the first element of `array` as
     *  the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1,
          length = array ? array.length : 0;

      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }

    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    /**
     * Checks if `value` is a host object in IE < 9.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
     */
    function isHostObject(value) {
      // Many host objects are `Object` objects that can coerce to strings
      // despite having improperly defined `toString` methods.
      var result = false;
      if (value != null && typeof value.toString != 'function') {
        try {
          result = !!(value + '');
        } catch (e) {}
      }
      return result;
    }

    /**
     * Converts `map` to its key-value pairs.
     *
     * @private
     * @param {Object} map The map to convert.
     * @returns {Array} Returns the key-value pairs.
     */
    function mapToArray(map) {
      var index = -1,
          result = Array(map.size);

      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }

    /**
     * Converts `set` to an array of its values.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the values.
     */
    function setToArray(set) {
      var index = -1,
          result = Array(set.size);

      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }

    /** Used for built-in method references. */
    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = root['__core-js_shared__'];

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Built-in value references. */
    var Buffer = moduleExports ? root.Buffer : undefined,
        Symbol = root.Symbol,
        Uint8Array = root.Uint8Array,
        getPrototype = overArg(Object.getPrototypeOf, Object),
        objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
        nativeKeys = overArg(Object.keys, Object);

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(root, 'DataView'),
        Map = getNative(root, 'Map'),
        Promise = getNative(root, 'Promise'),
        Set = getNative(root, 'Set'),
        WeakMap = getNative(root, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
    }

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
      return this;
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
    }

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map || ListCache),
        'string': new Hash
      };
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      return getMapData(this, key)['delete'](key);
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      return this.__data__['delete'](key);
    }

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var cache = this.__data__;
      if (cache instanceof ListCache) {
        var pairs = cache.__data__;
        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          return this;
        }
        cache = this.__data__ = new MapCache(pairs);
      }
      cache.set(key, value);
      return this;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
      // Safari 9 makes `arguments.length` enumerable in strict mode.
      var result = (isArray(value) || isArguments(value))
        ? baseTimes(value.length, String)
        : [];

      var length = result.length,
          skipIndexes = !!length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
          (value === undefined && !(key in object))) {
        object[key] = value;
      }
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }

    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {boolean} [isFull] Specify a clone including symbols.
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
      var result;
      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;

        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          if (isHostObject(value)) {
            return object ? value : {};
          }
          result = initCloneObject(isFunc ? {} : value);
          if (!isDeep) {
            return copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, baseClone, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new Stack);
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      if (!isArr) {
        var props = isFull ? getAllKeys(value) : keys(value);
      }
      arrayEach(props || value, function(subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
      });
      return result;
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} prototype The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    function baseCreate(proto) {
      return isObject(proto) ? objectCreate(proto) : {};
    }

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }

    /**
     * The base implementation of `getTag`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      return objectToString.call(value);
    }

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var result = new buffer.constructor(buffer.length);
      buffer.copy(result);
      return result;
    }

    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }

    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    /**
     * Creates a clone of `map`.
     *
     * @private
     * @param {Object} map The map to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned map.
     */
    function cloneMap(map, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
      return arrayReduce(array, addMapEntry, new map.constructor);
    }

    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }

    /**
     * Creates a clone of `set`.
     *
     * @private
     * @param {Object} set The set to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned set.
     */
    function cloneSet(set, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
      return arrayReduce(array, addSetEntry, new set.constructor);
    }

    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }

    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined;

        assignValue(object, key, newValue === undefined ? source[key] : newValue);
      }
      return object;
    }

    /**
     * Copies own symbol properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /**
     * Creates an array of the own enumerable symbol properties of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11,
    // for data views in Edge < 14, and promises in Node.js.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
        (Map && getTag(new Map) != mapTag) ||
        (Promise && getTag(Promise.resolve()) != promiseTag) ||
        (Set && getTag(new Set) != setTag) ||
        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
      getTag = function(value) {
        var result = objectToString.call(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : undefined;

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag;
            case mapCtorString: return mapTag;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag;
            case weakMapCtorString: return weakMapTag;
          }
        }
        return result;
      };
    }

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = array.constructor(length);

      // Add properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      return (typeof object.constructor == 'function' && !isPrototype(object))
        ? baseCreate(getPrototype(object))
        : {};
    }

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, cloneFunc, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case dataViewTag:
          return cloneDataView(object, isDeep);

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
          return cloneTypedArray(object, isDeep);

        case mapTag:
          return cloneMap(object, isDeep, cloneFunc);

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          return cloneRegExp(object);

        case setTag:
          return cloneSet(object, isDeep, cloneFunc);

        case symbolTag:
          return cloneSymbol(object);
      }
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length &&
        (typeof value == 'number' || reIsUint.test(value)) &&
        (value > -1 && value % 1 == 0 && value < length);
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

      return value === proto;
    }

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to process.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @see _.clone
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */
    function cloneDeep(value) {
      return baseClone(value, true, true);
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
      return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
        (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
    }

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 8-9 which returns 'object' for typed array and other constructors.
      var tag = isObject(value) ? objectToString.call(value) : '';
      return tag == funcTag || tag == genTag;
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    module.exports = cloneDeep;
    });

    /**
     * Lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright JS Foundation and other contributors <https://js.foundation/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    var lodash_isequal = createCommonjsModule(function (module, exports) {
    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG = 1,
        COMPARE_UNORDERED_FLAG = 2;

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        asyncTag = '[object AsyncFunction]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        nullTag = '[object Null]',
        objectTag = '[object Object]',
        promiseTag = '[object Promise]',
        proxyTag = '[object Proxy]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        symbolTag = '[object Symbol]',
        undefinedTag = '[object Undefined]',
        weakMapTag = '[object WeakMap]';

    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /** Used to identify `toStringTag` values of typed arrays. */
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
    typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
    typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
    typedArrayTags[errorTag] = typedArrayTags[funcTag] =
    typedArrayTags[mapTag] = typedArrayTags[numberTag] =
    typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
    typedArrayTags[setTag] = typedArrayTags[stringTag] =
    typedArrayTags[weakMapTag] = false;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();

    /** Detect free variable `exports`. */
    var freeExports = exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Detect free variable `process` from Node.js. */
    var freeProcess = moduleExports && freeGlobal.process;

    /** Used to access faster Node.js helpers. */
    var nodeUtil = (function() {
      try {
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }());

    /* Node.js helper references. */
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

    /**
     * A specialized version of `_.filter` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function arrayFilter(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }

    /**
     * A specialized version of `_.some` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function arraySome(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }

    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }

    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }

    /**
     * Checks if a `cache` value for `key` exists.
     *
     * @private
     * @param {Object} cache The cache to query.
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function cacheHas(cache, key) {
      return cache.has(key);
    }

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    /**
     * Converts `map` to its key-value pairs.
     *
     * @private
     * @param {Object} map The map to convert.
     * @returns {Array} Returns the key-value pairs.
     */
    function mapToArray(map) {
      var index = -1,
          result = Array(map.size);

      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }

    /**
     * Converts `set` to an array of its values.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the values.
     */
    function setToArray(set) {
      var index = -1,
          result = Array(set.size);

      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }

    /** Used for built-in method references. */
    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = root['__core-js_shared__'];

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Built-in value references. */
    var Buffer = moduleExports ? root.Buffer : undefined,
        Symbol = root.Symbol,
        Uint8Array = root.Uint8Array,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice,
        symToStringTag = Symbol ? Symbol.toStringTag : undefined;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
        nativeKeys = overArg(Object.keys, Object);

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(root, 'DataView'),
        Map = getNative(root, 'Map'),
        Promise = getNative(root, 'Promise'),
        Set = getNative(root, 'Set'),
        WeakMap = getNative(root, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
    }

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
      return this;
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map || ListCache),
        'string': new Hash
      };
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values == null ? 0 : values.length;

      this.__data__ = new MapCache;
      while (++index < length) {
        this.add(values[index]);
      }
    }

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }

    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache;
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);

      this.size = data.size;
      return result;
    }

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }

    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Unordered comparison
     *  2 - Partial comparison
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = objIsArr ? arrayTag : getTag(object),
          othTag = othIsArr ? arrayTag : getTag(other);

      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;

      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;

      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack);
        return (objIsArr || isTypedArray(object))
          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
          : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;

          stack || (stack = new Stack);
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack);
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index = -1,
          result = true,
          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

      stack.set(array, other);
      stack.set(other, array);

      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, arrValue, index, other, array, stack)
            : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
          if (!arraySome(other, function(othValue, othIndex) {
                if (!cacheHas(seen, othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
            result = false;
            break;
          }
        } else if (!(
              arrValue === othValue ||
                equalFunc(arrValue, othValue, bitmask, customizer, stack)
            )) {
          result = false;
          break;
        }
      }
      stack['delete'](array);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if ((object.byteLength != other.byteLength) ||
              (object.byteOffset != other.byteOffset)) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag:
          if ((object.byteLength != other.byteLength) ||
              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;

        case boolTag:
        case dateTag:
        case numberTag:
          // Coerce booleans to `1` or `0` and dates to milliseconds.
          // Invalid dates are coerced to `NaN`.
          return eq(+object, +other);

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == (other + '');

        case mapTag:
          var convert = mapToArray;

        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          }
          // Assume cyclic values are equal.
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;

          // Recursively compare objects (susceptible to call stack limits).
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack['delete'](object);
          return result;

        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          objProps = getAllKeys(object),
          objLength = objProps.length,
          othProps = getAllKeys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);

      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, objValue, key, other, object, stack)
            : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined
              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
              : compared
            )) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack['delete'](object);
      stack['delete'](other);
      return result;
    }

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }

    /**
     * Creates an array of the own enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
        (Map && getTag(new Map) != mapTag) ||
        (Promise && getTag(Promise.resolve()) != promiseTag) ||
        (Set && getTag(new Set) != setTag) ||
        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
      getTag = function(value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag;
            case mapCtorString: return mapTag;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag;
            case weakMapCtorString: return weakMapTag;
          }
        }
        return result;
      };
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length &&
        (typeof value == 'number' || reIsUint.test(value)) &&
        (value > -1 && value % 1 == 0 && value < length);
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

      return value === proto;
    }

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
    };

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent.
     *
     * **Note:** This method supports comparing arrays, array buffers, booleans,
     * date objects, error objects, maps, numbers, `Object` objects, regexes,
     * sets, strings, symbols, and typed arrays. `Object` objects are compared
     * by their own, not inherited, enumerable properties. Functions and DOM
     * nodes are compared by strict equality, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.isEqual(object, other);
     * // => true
     *
     * object === other;
     * // => false
     */
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    module.exports = isEqual;
    });

    const depsAreEqual = (deps1, deps2) => {
      return lodash_isequal(deps1, deps2)
    };

    const getDepNames = (deps) => {
      return Object.keys(deps || {})
    };

    const getUpdatedDeps = (depNames, currentData) => {
      const updatedDeps = {};
      depNames.forEach((depName) => {
        updatedDeps[depName] = currentData[depName];
      });
      return updatedDeps
    };

    const createSubscription = () => {
      const subscribers = {};

      const memoDependency = (target, dep) => {
        const { watcherName, fn } = target;
        const { prop, value } = dep;

        if (!subscribers[watcherName]) {
          subscribers[watcherName] = {
            deps: {},
            fn,
          };
        }
        subscribers[watcherName].deps[prop] = value;
      };

      return {
        subscribers,
        subscribe(target, dep) {
          if (target) {
            memoDependency(target, dep);
          }
        },
        notify(data, prop) {
          Object.entries(subscribers).forEach(([watchName, { deps, fn }]) => {
            const depNames = getDepNames(deps);

            if (depNames.includes(prop)) {
              const updatedDeps = getUpdatedDeps(depNames, data);
              if (!depsAreEqual(deps, updatedDeps)) {
                subscribers[watchName].deps = updatedDeps;
                fn();
              }
            }
          });
        },
      }
    };

    const createTargetWatcher = () => {
      let target = null;

      return {
        targetWatcher(watcherName, fn) {
          target = {
            watcherName,
            fn,
          };
          target.fn();
          target = null;
        },
        getTarget() {
          return target
        },
      }
    };

    function simplyReactive(entities, options) {
      const data = lodash_get(entities, 'data', {});
      const watch = lodash_get(entities, 'watch', {});
      const methods = lodash_get(entities, 'methods', {});
      const onChange = lodash_get(options, 'onChange', () => {});

      const { subscribe, notify, subscribers } = createSubscription();
      const { targetWatcher, getTarget } = createTargetWatcher();

      let _data;
      const _methods = {};
      const getContext = () => ({
        data: _data,
        methods: _methods,
      });

      let callingMethod = false;
      const methodWithFlags = (fn) => (...args) => {
        callingMethod = true;
        const result = fn(...args);
        callingMethod = false;
        return result
      };

      // init methods before data, as methods may be used in data
      Object.entries(methods).forEach(([methodName, methodItem]) => {
        _methods[methodName] = methodWithFlags((...args) =>
          methodItem(getContext(), ...args)
        );
        Object.defineProperty(_methods[methodName], 'name', { value: methodName });
      });

      _data = new Proxy(lodash_clonedeep(data), {
        get(target, prop) {
          if (getTarget() && !callingMethod) {
            subscribe(getTarget(), { prop, value: target[prop] });
          }
          return Reflect.get(...arguments)
        },
        set(target, prop, value) {
          // if value is the same, do nothing
          if (target[prop] === value) {
            return true
          }

          Reflect.set(...arguments);

          if (!getTarget()) {
            onChange && onChange(prop, value);
            notify(_data, prop);
          }

          return true
        },
      });

      Object.entries(watch).forEach(([watchName, watchItem]) => {
        targetWatcher(watchName, () => {
          watchItem(getContext());
        });
      });

      const output = [_data, _methods];
      output._internal = {
        _getSubscribers() {
          return subscribers
        },
      };

      return output
    }

    function getIndexesOfParticlesWithoutClonesInPage({
      pageIndex,
      particlesToShow,
      particlesToScroll,
      particlesCount,
    }) {
      const overlap = pageIndex === 0 ? 0 : particlesToShow - particlesToScroll;
      const from = pageIndex * particlesToShow - pageIndex * overlap;
      const to = from + Math.max(particlesToShow, particlesToScroll) - 1;
      const indexes = [];
      for (let i=from; i<=Math.min(particlesCount - 1, to); i++) {
        indexes.push(i);
      }
      return indexes
    }

    function getAdjacentIndexes({
      infinite,
      pageIndex,
      pagesCount,
      particlesCount,
      particlesToShow,
      particlesToScroll,
    }) {
      const _pageIndex = getValueInRange(0, pageIndex, pagesCount - 1);

      let rangeStart = _pageIndex - 1;
      let rangeEnd = _pageIndex + 1;

      rangeStart = infinite
        ? rangeStart < 0 ? pagesCount - 1 : rangeStart
        : Math.max(0, rangeStart);

      rangeEnd = infinite
        ? rangeEnd > pagesCount - 1 ? 0 : rangeEnd
        : Math.min(pagesCount - 1, rangeEnd);

      const pageIndexes = [...new Set([
        rangeStart,
        _pageIndex,
        rangeEnd,

        // because of these values outputs for infinite/non-infinites are the same
        0, // needed to clone first page particles
        pagesCount - 1, // needed to clone last page particles
      ])].sort((a, b) => a - b);
      const particleIndexes = pageIndexes.flatMap(
        pageIndex => getIndexesOfParticlesWithoutClonesInPage({
          pageIndex,
          particlesToShow,
          particlesToScroll,
          particlesCount,
        })
      );
      return {
        pageIndexes,
        particleIndexes: [...new Set(particleIndexes)].sort((a, b) => a - b),
      }
    }

    const setIntervalImmediate = (fn, ms) => {
      fn();
      return setInterval(fn, ms);
    };

    const STEP_MS = 35;
    const MAX_VALUE = 1;

    class ProgressManager {
      constructor({ onProgressValueChange }) {
        this._onProgressValueChange = onProgressValueChange;

        this._autoplayDuration;
        this._onProgressValueChange;
      
        this._interval;
        this._paused = false;
      }

      setAutoplayDuration(autoplayDuration) {
        this._autoplayDuration = autoplayDuration;
      }

      start(onFinish) {
        return new Promise((resolve) => {
          this.reset();

          const stepMs = Math.min(STEP_MS, this._autoplayDuration);
          let progress = -stepMs;
      
          this._interval = setIntervalImmediate(async () => {
            if (this._paused) {
              return
            }
            progress += stepMs;
      
            const value = progress / this._autoplayDuration;
            this._onProgressValueChange(value);
      
            if (value > MAX_VALUE) {
              this.reset();
              await onFinish();
              resolve();
            }
          }, stepMs);
        })
      }

      pause() {
        this._paused = true;
      }

      resume() {
        this._paused = false;
      }

      reset() {
        clearInterval(this._interval);
        this._onProgressValueChange(MAX_VALUE);
      }
    }

    function createCarousel(onChange) {
      const progressManager = new ProgressManager({
        onProgressValueChange: (value) => {
          onChange('progressValue', 1 - value);
        },
      });

      const reactive = simplyReactive(
        {
          data: {
            particlesCountWithoutClones: 0,
            particlesToShow: 1, // normalized
            particlesToShowInit: 1, // initial value
            particlesToScroll: 1, // normalized
            particlesToScrollInit: 1, // initial value
            particlesCount: 1,
            currentParticleIndex: 1,
            infinite: false,
            autoplayDuration: 1000,
            clonesCountHead: 0,
            clonesCountTail: 0,
            clonesCountTotal: 0,
            partialPageSize: 1,
            currentPageIndex: 1,
            pagesCount: 1,
            pauseOnFocus: false,
            focused: false,
            autoplay: false,
            autoplayDirection: 'next',
            disabled: false, // disable page change while animation is in progress
            durationMsInit: 1000,
            durationMs: 1000,
            offset: 0,
            particleWidth: 0,
            loaded: [],
          },
          watch: {
            setLoaded({ data }) {
              data.loaded = getAdjacentIndexes({
                infinite: data.infinite,
                pageIndex: data.currentPageIndex,
                pagesCount: data.pagesCount,
                particlesCount: data.particlesCountWithoutClones,
                particlesToShow: data.particlesToShow,
                particlesToScroll: data.particlesToScroll,
              }).particleIndexes;
            },
            setCurrentPageIndex({ data }) {
              data.currentPageIndex = getCurrentPageIndexByCurrentParticleIndex({
                currentParticleIndex: data.currentParticleIndex,
                particlesCount: data.particlesCount,
                clonesCountHead: data.clonesCountHead,
                clonesCountTotal: data.clonesCountTotal,
                infinite: data.infinite,
                particlesToScroll: data.particlesToScroll,
              });
            },
            setPartialPageSize({ data }) {
              data.partialPageSize = getPartialPageSize({
                particlesToScroll: data.particlesToScroll,
                particlesToShow: data.particlesToShow,
                particlesCountWithoutClones: data.particlesCountWithoutClones,
              });
            },
            setClonesCount({ data }) {
              const { head, tail } = getClonesCount({
                infinite: data.infinite,
                particlesToShow: data.particlesToShow,
                partialPageSize: data.partialPageSize,
              });
              data.clonesCountHead = head;
              data.clonesCountTail = tail;
              data.clonesCountTotal = head + tail;
            },
            setProgressManagerAutoplayDuration({ data }) {
              progressManager.setAutoplayDuration(data.autoplayDuration);
            },
            toggleProgressManager({ data: { pauseOnFocus, focused } }) {
              // as focused is in if block, it will not be put to deps, read them in data: {}
              if (pauseOnFocus) {
                if (focused) {
                  progressManager.pause();
                } else {
                  progressManager.resume();
                }
              }
            },
            initDuration({ data }) {
              data.durationMs = data.durationMsInit;
            },
            applyAutoplay({ data, methods: { _applyAutoplayIfNeeded } }) {
              // prevent _applyAutoplayIfNeeded to be called with watcher
              // to prevent its data added to deps
              data.autoplay && _applyAutoplayIfNeeded(data.autoplay);
            },
            setPagesCount({ data }) {
              data.pagesCount = getPagesCountByParticlesCount({
                infinite: data.infinite,
                particlesCountWithoutClones: data.particlesCountWithoutClones,
                particlesToScroll: data.particlesToScroll,
                particlesToShow: data.particlesToShow,
              });
            },
            setParticlesToShow({ data }) {
              data.particlesToShow = getValueInRange(
                1,
                data.particlesToShowInit,
                data.particlesCountWithoutClones
              );
            },
            setParticlesToScroll({ data }) {
              data.particlesToScroll = getValueInRange(
                1,
                data.particlesToScrollInit,
                data.particlesCountWithoutClones
              );
            },
          },
          methods: {
            _prev({ data }) {
              data.currentParticleIndex = getParticleIndexByPageIndex({
                infinite: data.infinite,
                pageIndex: data.currentPageIndex - 1,
                clonesCountHead: data.clonesCountHead,
                clonesCountTail: data.clonesCountTail,
                particlesToScroll: data.particlesToScroll,
                particlesCount: data.particlesCount,
                particlesToShow: data.particlesToShow,
              });
            },
            _next({ data }) {
              data.currentParticleIndex = getParticleIndexByPageIndex({
                infinite: data.infinite,
                pageIndex: data.currentPageIndex + 1,
                clonesCountHead: data.clonesCountHead,
                clonesCountTail: data.clonesCountTail,
                particlesToScroll: data.particlesToScroll,
                particlesCount: data.particlesCount,
                particlesToShow: data.particlesToShow,
              });
            },
            _moveToParticle({ data }, particleIndex) {
              data.currentParticleIndex = getValueInRange(
                0,
                particleIndex,
                data.particlesCount - 1
              );
            },
            toggleFocused({ data }) {
              data.focused = !data.focused;
            },
            async _applyAutoplayIfNeeded({ data, methods }) {
              // prevent progress change if not infinite for first and last page
              if (
                !data.infinite &&
                ((data.autoplayDirection === NEXT &&
                  data.currentParticleIndex === data.particlesCount - 1) ||
                  (data.autoplayDirection === PREV &&
                    data.currentParticleIndex === 0))
              ) {
                progressManager.reset();
                return
              }

              if (data.autoplay) {
                const onFinish = () =>
                  switcher({
                    [NEXT]: async () => methods.showNextPage(),
                    [PREV]: async () => methods.showPrevPage(),
                  })(data.autoplayDirection);

                await progressManager.start(onFinish);
              }
            },
            // makes delayed jump to 1st or last element
            async _jumpIfNeeded({ data, methods }) {
              let jumped = false;
              if (data.infinite) {
                if (data.currentParticleIndex === 0) {
                  await methods.showParticle(
                    data.particlesCount - data.clonesCountTotal,
                    {
                      animated: false,
                    }
                  );
                  jumped = true;
                } else if (
                  data.currentParticleIndex ===
                  data.particlesCount - data.clonesCountTail
                ) {
                  await methods.showParticle(data.clonesCountHead, {
                    animated: false,
                  });
                  jumped = true;
                }
              }
              return jumped
            },
            async changePage({ data, methods }, updateStoreFn, options) {
              progressManager.reset();
              if (data.disabled) return
              data.disabled = true;

              updateStoreFn();
              await methods.offsetPage({ animated: get$1(options, 'animated', true) });
              data.disabled = false;

              const jumped = await methods._jumpIfNeeded();
              !jumped && methods._applyAutoplayIfNeeded(); // no need to wait it finishes
            },
            async showNextPage({ data, methods }, options) {
              if (data.disabled) return
              await methods.changePage(methods._next, options);
            },
            async showPrevPage({ data, methods }, options) {
              if (data.disabled) return
              await methods.changePage(methods._prev, options);
            },
            async showParticle({ methods }, particleIndex, options) {
              await methods.changePage(
                () => methods._moveToParticle(particleIndex),
                options
              );
            },
            _getParticleIndexByPageIndex({ data }, pageIndex) {
              return getParticleIndexByPageIndex({
                infinite: data.infinite,
                pageIndex,
                clonesCountHead: data.clonesCountHead,
                clonesCountTail: data.clonesCountTail,
                particlesToScroll: data.particlesToScroll,
                particlesCount: data.particlesCount,
                particlesToShow: data.particlesToShow,
              })
            },
            async showPage({ methods }, pageIndex, options) {
              const particleIndex = methods._getParticleIndexByPageIndex(pageIndex);
              await methods.showParticle(particleIndex, options);
            },
            offsetPage({ data }, options) {
              const animated = get$1(options, 'animated', true);
              return new Promise((resolve) => {
                // durationMs is an offset animation time
                data.durationMs = animated ? data.durationMsInit : 0;
                data.offset = -data.currentParticleIndex * data.particleWidth;
                setTimeout(() => {
                  resolve();
                }, data.durationMs);
              })
            },
          },
        },
        {
          onChange,
        }
      );
      const [data, methods] = reactive;

      return [{ data, progressManager }, methods, reactive._internal]
    }

    /* node_modules\svelte-carousel\src\components\Carousel\Carousel.svelte generated by Svelte v3.50.1 */

    const { Error: Error_1 } = globals;
    const file$2 = "node_modules\\svelte-carousel\\src\\components\\Carousel\\Carousel.svelte";

    const get_dots_slot_changes = dirty => ({
    	currentPageIndex: dirty[0] & /*currentPageIndex*/ 64,
    	pagesCount: dirty[0] & /*pagesCount*/ 1024,
    	loaded: dirty[0] & /*loaded*/ 32
    });

    const get_dots_slot_context = ctx => ({
    	currentPageIndex: /*currentPageIndex*/ ctx[6],
    	pagesCount: /*pagesCount*/ ctx[10],
    	showPage: /*handlePageChange*/ ctx[15],
    	loaded: /*loaded*/ ctx[5]
    });

    const get_next_slot_changes = dirty => ({ loaded: dirty[0] & /*loaded*/ 32 });

    const get_next_slot_context = ctx => ({
    	showNextPage: /*methods*/ ctx[14].showNextPage,
    	loaded: /*loaded*/ ctx[5]
    });

    const get_default_slot_changes = dirty => ({ loaded: dirty[0] & /*loaded*/ 32 });
    const get_default_slot_context = ctx => ({ loaded: /*loaded*/ ctx[5] });
    const get_prev_slot_changes = dirty => ({ loaded: dirty[0] & /*loaded*/ 32 });

    const get_prev_slot_context = ctx => ({
    	showPrevPage: /*methods*/ ctx[14].showPrevPage,
    	loaded: /*loaded*/ ctx[5]
    });

    // (255:4) {#if arrows}
    function create_if_block_3(ctx) {
    	let current;
    	const prev_slot_template = /*#slots*/ ctx[37].prev;
    	const prev_slot = create_slot(prev_slot_template, ctx, /*$$scope*/ ctx[36], get_prev_slot_context);
    	const prev_slot_or_fallback = prev_slot || fallback_block_2(ctx);

    	const block = {
    		c: function create() {
    			if (prev_slot_or_fallback) prev_slot_or_fallback.c();
    		},
    		m: function mount(target, anchor) {
    			if (prev_slot_or_fallback) {
    				prev_slot_or_fallback.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (prev_slot) {
    				if (prev_slot.p && (!current || dirty[0] & /*loaded*/ 32 | dirty[1] & /*$$scope*/ 32)) {
    					update_slot_base(
    						prev_slot,
    						prev_slot_template,
    						ctx,
    						/*$$scope*/ ctx[36],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[36])
    						: get_slot_changes(prev_slot_template, /*$$scope*/ ctx[36], dirty, get_prev_slot_changes),
    						get_prev_slot_context
    					);
    				}
    			} else {
    				if (prev_slot_or_fallback && prev_slot_or_fallback.p && (!current || dirty[0] & /*infinite, currentPageIndex*/ 68)) {
    					prev_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(prev_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(prev_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (prev_slot_or_fallback) prev_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(255:4) {#if arrows}",
    		ctx
    	});

    	return block;
    }

    // (256:60)           
    function fallback_block_2(ctx) {
    	let div;
    	let arrow;
    	let current;

    	arrow = new Arrow({
    			props: {
    				direction: "prev",
    				disabled: !/*infinite*/ ctx[2] && /*currentPageIndex*/ ctx[6] === 0
    			},
    			$$inline: true
    		});

    	arrow.$on("click", /*showPrevPage*/ ctx[23]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(arrow.$$.fragment);
    			attr_dev(div, "class", "sc-carousel__arrow-container svelte-h7bw08");
    			add_location(div, file$2, 256, 8, 6291);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(arrow, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const arrow_changes = {};
    			if (dirty[0] & /*infinite, currentPageIndex*/ 68) arrow_changes.disabled = !/*infinite*/ ctx[2] && /*currentPageIndex*/ ctx[6] === 0;
    			arrow.$set(arrow_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arrow.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arrow.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(arrow);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_2.name,
    		type: "fallback",
    		source: "(256:60)           ",
    		ctx
    	});

    	return block;
    }

    // (293:6) {#if autoplayProgressVisible}
    function create_if_block_2(ctx) {
    	let div;
    	let progress;
    	let current;

    	progress = new Progress({
    			props: { value: /*progressValue*/ ctx[7] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(progress.$$.fragment);
    			attr_dev(div, "class", "sc-carousel-progress__container svelte-h7bw08");
    			add_location(div, file$2, 293, 8, 7421);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(progress, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const progress_changes = {};
    			if (dirty[0] & /*progressValue*/ 128) progress_changes.value = /*progressValue*/ ctx[7];
    			progress.$set(progress_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(progress.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(progress.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(progress);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(293:6) {#if autoplayProgressVisible}",
    		ctx
    	});

    	return block;
    }

    // (299:4) {#if arrows}
    function create_if_block_1$1(ctx) {
    	let current;
    	const next_slot_template = /*#slots*/ ctx[37].next;
    	const next_slot = create_slot(next_slot_template, ctx, /*$$scope*/ ctx[36], get_next_slot_context);
    	const next_slot_or_fallback = next_slot || fallback_block_1(ctx);

    	const block = {
    		c: function create() {
    			if (next_slot_or_fallback) next_slot_or_fallback.c();
    		},
    		m: function mount(target, anchor) {
    			if (next_slot_or_fallback) {
    				next_slot_or_fallback.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (next_slot) {
    				if (next_slot.p && (!current || dirty[0] & /*loaded*/ 32 | dirty[1] & /*$$scope*/ 32)) {
    					update_slot_base(
    						next_slot,
    						next_slot_template,
    						ctx,
    						/*$$scope*/ ctx[36],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[36])
    						: get_slot_changes(next_slot_template, /*$$scope*/ ctx[36], dirty, get_next_slot_changes),
    						get_next_slot_context
    					);
    				}
    			} else {
    				if (next_slot_or_fallback && next_slot_or_fallback.p && (!current || dirty[0] & /*infinite, currentPageIndex, pagesCount*/ 1092)) {
    					next_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(next_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(next_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (next_slot_or_fallback) next_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(299:4) {#if arrows}",
    		ctx
    	});

    	return block;
    }

    // (300:60)           
    function fallback_block_1(ctx) {
    	let div;
    	let arrow;
    	let current;

    	arrow = new Arrow({
    			props: {
    				direction: "next",
    				disabled: !/*infinite*/ ctx[2] && /*currentPageIndex*/ ctx[6] === /*pagesCount*/ ctx[10] - 1
    			},
    			$$inline: true
    		});

    	arrow.$on("click", /*methods*/ ctx[14].showNextPage);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(arrow.$$.fragment);
    			attr_dev(div, "class", "sc-carousel__arrow-container svelte-h7bw08");
    			add_location(div, file$2, 300, 8, 7643);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(arrow, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const arrow_changes = {};
    			if (dirty[0] & /*infinite, currentPageIndex, pagesCount*/ 1092) arrow_changes.disabled = !/*infinite*/ ctx[2] && /*currentPageIndex*/ ctx[6] === /*pagesCount*/ ctx[10] - 1;
    			arrow.$set(arrow_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arrow.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arrow.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(arrow);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_1.name,
    		type: "fallback",
    		source: "(300:60)           ",
    		ctx
    	});

    	return block;
    }

    // (311:2) {#if dots}
    function create_if_block$1(ctx) {
    	let current;
    	const dots_slot_template = /*#slots*/ ctx[37].dots;
    	const dots_slot = create_slot(dots_slot_template, ctx, /*$$scope*/ ctx[36], get_dots_slot_context);
    	const dots_slot_or_fallback = dots_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			if (dots_slot_or_fallback) dots_slot_or_fallback.c();
    		},
    		m: function mount(target, anchor) {
    			if (dots_slot_or_fallback) {
    				dots_slot_or_fallback.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dots_slot) {
    				if (dots_slot.p && (!current || dirty[0] & /*currentPageIndex, pagesCount, loaded*/ 1120 | dirty[1] & /*$$scope*/ 32)) {
    					update_slot_base(
    						dots_slot,
    						dots_slot_template,
    						ctx,
    						/*$$scope*/ ctx[36],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[36])
    						: get_slot_changes(dots_slot_template, /*$$scope*/ ctx[36], dirty, get_dots_slot_changes),
    						get_dots_slot_context
    					);
    				}
    			} else {
    				if (dots_slot_or_fallback && dots_slot_or_fallback.p && (!current || dirty[0] & /*pagesCount, currentPageIndex*/ 1088)) {
    					dots_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(dots_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(dots_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (dots_slot_or_fallback) dots_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(311:2) {#if dots}",
    		ctx
    	});

    	return block;
    }

    // (317:5)         
    function fallback_block(ctx) {
    	let dots_1;
    	let current;

    	dots_1 = new Dots({
    			props: {
    				pagesCount: /*pagesCount*/ ctx[10],
    				currentPageIndex: /*currentPageIndex*/ ctx[6]
    			},
    			$$inline: true
    		});

    	dots_1.$on("pageChange", /*pageChange_handler*/ ctx[41]);

    	const block = {
    		c: function create() {
    			create_component(dots_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(dots_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const dots_1_changes = {};
    			if (dirty[0] & /*pagesCount*/ 1024) dots_1_changes.pagesCount = /*pagesCount*/ ctx[10];
    			if (dirty[0] & /*currentPageIndex*/ 64) dots_1_changes.currentPageIndex = /*currentPageIndex*/ ctx[6];
    			dots_1.$set(dots_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(dots_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(dots_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(dots_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(317:5)         ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div3;
    	let div2;
    	let t0;
    	let div1;
    	let div0;
    	let swipeable_action;
    	let t1;
    	let t2;
    	let t3;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*arrows*/ ctx[1] && create_if_block_3(ctx);
    	const default_slot_template = /*#slots*/ ctx[37].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[36], get_default_slot_context);
    	let if_block1 = /*autoplayProgressVisible*/ ctx[3] && create_if_block_2(ctx);
    	let if_block2 = /*arrows*/ ctx[1] && create_if_block_1$1(ctx);
    	let if_block3 = /*dots*/ ctx[4] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (if_block2) if_block2.c();
    			t3 = space();
    			if (if_block3) if_block3.c();
    			attr_dev(div0, "class", "sc-carousel__pages-container svelte-h7bw08");
    			set_style(div0, "transform", "translateX(" + /*offset*/ ctx[8] + "px)");
    			set_style(div0, "transition-duration", /*durationMs*/ ctx[9] + "ms");
    			set_style(div0, "transition-timing-function", /*timingFunction*/ ctx[0]);
    			add_location(div0, file$2, 275, 6, 6748);
    			attr_dev(div1, "class", "sc-carousel__pages-window svelte-h7bw08");
    			add_location(div1, file$2, 265, 4, 6540);
    			attr_dev(div2, "class", "sc-carousel__content-container svelte-h7bw08");
    			add_location(div2, file$2, 253, 2, 6157);
    			attr_dev(div3, "class", "sc-carousel__carousel-container svelte-h7bw08");
    			add_location(div3, file$2, 252, 0, 6108);
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			if (if_block0) if_block0.m(div2, null);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			/*div0_binding*/ ctx[39](div0);
    			append_dev(div1, t1);
    			if (if_block1) if_block1.m(div1, null);
    			/*div1_binding*/ ctx[40](div1);
    			append_dev(div2, t2);
    			if (if_block2) if_block2.m(div2, null);
    			append_dev(div3, t3);
    			if (if_block3) if_block3.m(div3, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(swipeable_action = swipeable.call(null, div0, {
    						thresholdProvider: /*swipeable_function*/ ctx[38]
    					})),
    					listen_dev(div0, "swipeStart", /*handleSwipeStart*/ ctx[16], false, false, false),
    					listen_dev(div0, "swipeMove", /*handleSwipeMove*/ ctx[18], false, false, false),
    					listen_dev(div0, "swipeEnd", /*handleSwipeEnd*/ ctx[19], false, false, false),
    					listen_dev(div0, "swipeFailed", /*handleSwipeFailed*/ ctx[20], false, false, false),
    					listen_dev(div0, "swipeThresholdReached", /*handleSwipeThresholdReached*/ ctx[17], false, false, false),
    					action_destroyer(hoverable.call(null, div1)),
    					listen_dev(div1, "hovered", /*handleHovered*/ ctx[21], false, false, false),
    					action_destroyer(tappable.call(null, div1)),
    					listen_dev(div1, "tapped", /*handleTapped*/ ctx[22], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*arrows*/ ctx[1]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*arrows*/ 2) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div2, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*loaded*/ 32 | dirty[1] & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[36],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[36])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[36], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}

    			if (!current || dirty[0] & /*offset*/ 256) {
    				set_style(div0, "transform", "translateX(" + /*offset*/ ctx[8] + "px)");
    			}

    			if (!current || dirty[0] & /*durationMs*/ 512) {
    				set_style(div0, "transition-duration", /*durationMs*/ ctx[9] + "ms");
    			}

    			if (!current || dirty[0] & /*timingFunction*/ 1) {
    				set_style(div0, "transition-timing-function", /*timingFunction*/ ctx[0]);
    			}

    			if (swipeable_action && is_function(swipeable_action.update) && dirty[0] & /*pageWindowWidth*/ 2048) swipeable_action.update.call(null, {
    				thresholdProvider: /*swipeable_function*/ ctx[38]
    			});

    			if (/*autoplayProgressVisible*/ ctx[3]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*autoplayProgressVisible*/ 8) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_2(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div1, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*arrows*/ ctx[1]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty[0] & /*arrows*/ 2) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_1$1(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(div2, null);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (/*dots*/ ctx[4]) {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);

    					if (dirty[0] & /*dots*/ 16) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block$1(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(div3, null);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(default_slot, local);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(if_block3);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(default_slot, local);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (if_block0) if_block0.d();
    			if (default_slot) default_slot.d(detaching);
    			/*div0_binding*/ ctx[39](null);
    			if (if_block1) if_block1.d();
    			/*div1_binding*/ ctx[40](null);
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Carousel', slots, ['prev','default','next','dots']);
    	let loaded = [];
    	let currentPageIndex;
    	let progressValue;
    	let offset = 0;
    	let durationMs = 0;
    	let pagesCount = 1;

    	const [{ data, progressManager }, methods, service] = createCarousel((key, value) => {
    		switcher({
    			'currentPageIndex': () => $$invalidate(6, currentPageIndex = value),
    			'progressValue': () => $$invalidate(7, progressValue = value),
    			'offset': () => $$invalidate(8, offset = value),
    			'durationMs': () => $$invalidate(9, durationMs = value),
    			'pagesCount': () => $$invalidate(10, pagesCount = value),
    			'loaded': () => $$invalidate(5, loaded = value)
    		})(key);
    	});

    	const dispatch = createEventDispatcher();
    	let { timingFunction = 'ease-in-out' } = $$props;
    	let { arrows = true } = $$props;
    	let { infinite = true } = $$props;
    	let { initialPageIndex = 0 } = $$props;
    	let { duration = 500 } = $$props;
    	let { autoplay = false } = $$props;
    	let { autoplayDuration = 3000 } = $$props;
    	let { autoplayDirection = NEXT } = $$props;
    	let { pauseOnFocus = false } = $$props;
    	let { autoplayProgressVisible = false } = $$props;
    	let { dots = true } = $$props;
    	let { swiping = true } = $$props;
    	let { particlesToShow = 1 } = $$props;
    	let { particlesToScroll = 1 } = $$props;

    	async function goTo(pageIndex, options) {
    		const animated = get$1(options, 'animated', true);

    		if (typeof pageIndex !== 'number') {
    			throw new Error('pageIndex should be a number');
    		}

    		await methods.showPage(pageIndex, { animated });
    	}

    	async function goToPrev(options) {
    		const animated = get$1(options, 'animated', true);
    		await methods.showPrevPage({ animated });
    	}

    	async function goToNext(options) {
    		const animated = get$1(options, 'animated', true);
    		await methods.showNextPage({ animated });
    	}

    	let pageWindowWidth = 0;
    	let pageWindowElement;
    	let particlesContainer;

    	const pageWindowElementResizeObserver = createResizeObserver(({ width }) => {
    		$$invalidate(11, pageWindowWidth = width);
    		data.particleWidth = pageWindowWidth / data.particlesToShow;

    		applyParticleSizes({
    			particlesContainerChildren: particlesContainer.children,
    			particleWidth: data.particleWidth
    		});

    		methods.offsetPage({ animated: false });
    	});

    	function addClones() {
    		const { clonesToAppend, clonesToPrepend } = getClones({
    			clonesCountHead: data.clonesCountHead,
    			clonesCountTail: data.clonesCountTail,
    			particlesContainerChildren: particlesContainer.children
    		});

    		applyClones({
    			particlesContainer,
    			clonesToAppend,
    			clonesToPrepend
    		});
    	}

    	onMount(() => {
    		(async () => {
    			await tick();

    			if (particlesContainer && pageWindowElement) {
    				data.particlesCountWithoutClones = particlesContainer.children.length;
    				await tick();
    				data.infinite && addClones();

    				// call after adding clones
    				data.particlesCount = particlesContainer.children.length;

    				methods.showPage(initialPageIndex, { animated: false });
    				pageWindowElementResizeObserver.observe(pageWindowElement);
    			}
    		})();
    	});

    	onDestroy(() => {
    		pageWindowElementResizeObserver.disconnect();
    		progressManager.reset();
    	});

    	async function handlePageChange(pageIndex) {
    		await methods.showPage(pageIndex, { animated: true });
    	}

    	// gestures
    	function handleSwipeStart() {
    		if (!swiping) return;
    		data.durationMs = 0;
    	}

    	async function handleSwipeThresholdReached(event) {
    		if (!swiping) return;

    		await switcher({
    			[NEXT]: methods.showNextPage,
    			[PREV]: methods.showPrevPage
    		})(event.detail.direction);
    	}

    	function handleSwipeMove(event) {
    		if (!swiping) return;
    		data.offset += event.detail.dx;
    	}

    	function handleSwipeEnd() {
    		if (!swiping) return;
    		methods.showParticle(data.currentParticleIndex);
    	}

    	async function handleSwipeFailed() {
    		if (!swiping) return;
    		await methods.offsetPage({ animated: true });
    	}

    	function handleHovered(event) {
    		data.focused = event.detail.value;
    	}

    	function handleTapped() {
    		methods.toggleFocused();
    	}

    	function showPrevPage() {
    		methods.showPrevPage();
    	}

    	const writable_props = [
    		'timingFunction',
    		'arrows',
    		'infinite',
    		'initialPageIndex',
    		'duration',
    		'autoplay',
    		'autoplayDuration',
    		'autoplayDirection',
    		'pauseOnFocus',
    		'autoplayProgressVisible',
    		'dots',
    		'swiping',
    		'particlesToShow',
    		'particlesToScroll'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Carousel> was created with unknown prop '${key}'`);
    	});

    	const swipeable_function = () => pageWindowWidth / 3;

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			particlesContainer = $$value;
    			$$invalidate(13, particlesContainer);
    		});
    	}

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			pageWindowElement = $$value;
    			$$invalidate(12, pageWindowElement);
    		});
    	}

    	const pageChange_handler = event => handlePageChange(event.detail);

    	$$self.$$set = $$props => {
    		if ('timingFunction' in $$props) $$invalidate(0, timingFunction = $$props.timingFunction);
    		if ('arrows' in $$props) $$invalidate(1, arrows = $$props.arrows);
    		if ('infinite' in $$props) $$invalidate(2, infinite = $$props.infinite);
    		if ('initialPageIndex' in $$props) $$invalidate(24, initialPageIndex = $$props.initialPageIndex);
    		if ('duration' in $$props) $$invalidate(25, duration = $$props.duration);
    		if ('autoplay' in $$props) $$invalidate(26, autoplay = $$props.autoplay);
    		if ('autoplayDuration' in $$props) $$invalidate(27, autoplayDuration = $$props.autoplayDuration);
    		if ('autoplayDirection' in $$props) $$invalidate(28, autoplayDirection = $$props.autoplayDirection);
    		if ('pauseOnFocus' in $$props) $$invalidate(29, pauseOnFocus = $$props.pauseOnFocus);
    		if ('autoplayProgressVisible' in $$props) $$invalidate(3, autoplayProgressVisible = $$props.autoplayProgressVisible);
    		if ('dots' in $$props) $$invalidate(4, dots = $$props.dots);
    		if ('swiping' in $$props) $$invalidate(30, swiping = $$props.swiping);
    		if ('particlesToShow' in $$props) $$invalidate(31, particlesToShow = $$props.particlesToShow);
    		if ('particlesToScroll' in $$props) $$invalidate(32, particlesToScroll = $$props.particlesToScroll);
    		if ('$$scope' in $$props) $$invalidate(36, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		onMount,
    		tick,
    		createEventDispatcher,
    		Dots,
    		Arrow,
    		Progress,
    		NEXT,
    		PREV,
    		swipeable,
    		hoverable,
    		tappable,
    		applyParticleSizes,
    		createResizeObserver,
    		getClones,
    		applyClones,
    		get: get$1,
    		switcher,
    		createCarousel,
    		loaded,
    		currentPageIndex,
    		progressValue,
    		offset,
    		durationMs,
    		pagesCount,
    		data,
    		progressManager,
    		methods,
    		service,
    		dispatch,
    		timingFunction,
    		arrows,
    		infinite,
    		initialPageIndex,
    		duration,
    		autoplay,
    		autoplayDuration,
    		autoplayDirection,
    		pauseOnFocus,
    		autoplayProgressVisible,
    		dots,
    		swiping,
    		particlesToShow,
    		particlesToScroll,
    		goTo,
    		goToPrev,
    		goToNext,
    		pageWindowWidth,
    		pageWindowElement,
    		particlesContainer,
    		pageWindowElementResizeObserver,
    		addClones,
    		handlePageChange,
    		handleSwipeStart,
    		handleSwipeThresholdReached,
    		handleSwipeMove,
    		handleSwipeEnd,
    		handleSwipeFailed,
    		handleHovered,
    		handleTapped,
    		showPrevPage
    	});

    	$$self.$inject_state = $$props => {
    		if ('loaded' in $$props) $$invalidate(5, loaded = $$props.loaded);
    		if ('currentPageIndex' in $$props) $$invalidate(6, currentPageIndex = $$props.currentPageIndex);
    		if ('progressValue' in $$props) $$invalidate(7, progressValue = $$props.progressValue);
    		if ('offset' in $$props) $$invalidate(8, offset = $$props.offset);
    		if ('durationMs' in $$props) $$invalidate(9, durationMs = $$props.durationMs);
    		if ('pagesCount' in $$props) $$invalidate(10, pagesCount = $$props.pagesCount);
    		if ('timingFunction' in $$props) $$invalidate(0, timingFunction = $$props.timingFunction);
    		if ('arrows' in $$props) $$invalidate(1, arrows = $$props.arrows);
    		if ('infinite' in $$props) $$invalidate(2, infinite = $$props.infinite);
    		if ('initialPageIndex' in $$props) $$invalidate(24, initialPageIndex = $$props.initialPageIndex);
    		if ('duration' in $$props) $$invalidate(25, duration = $$props.duration);
    		if ('autoplay' in $$props) $$invalidate(26, autoplay = $$props.autoplay);
    		if ('autoplayDuration' in $$props) $$invalidate(27, autoplayDuration = $$props.autoplayDuration);
    		if ('autoplayDirection' in $$props) $$invalidate(28, autoplayDirection = $$props.autoplayDirection);
    		if ('pauseOnFocus' in $$props) $$invalidate(29, pauseOnFocus = $$props.pauseOnFocus);
    		if ('autoplayProgressVisible' in $$props) $$invalidate(3, autoplayProgressVisible = $$props.autoplayProgressVisible);
    		if ('dots' in $$props) $$invalidate(4, dots = $$props.dots);
    		if ('swiping' in $$props) $$invalidate(30, swiping = $$props.swiping);
    		if ('particlesToShow' in $$props) $$invalidate(31, particlesToShow = $$props.particlesToShow);
    		if ('particlesToScroll' in $$props) $$invalidate(32, particlesToScroll = $$props.particlesToScroll);
    		if ('pageWindowWidth' in $$props) $$invalidate(11, pageWindowWidth = $$props.pageWindowWidth);
    		if ('pageWindowElement' in $$props) $$invalidate(12, pageWindowElement = $$props.pageWindowElement);
    		if ('particlesContainer' in $$props) $$invalidate(13, particlesContainer = $$props.particlesContainer);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*infinite*/ 4) {
    			{
    				data.infinite = infinite;
    			}
    		}

    		if ($$self.$$.dirty[0] & /*duration*/ 33554432) {
    			{
    				data.durationMsInit = duration;
    			}
    		}

    		if ($$self.$$.dirty[0] & /*autoplay*/ 67108864) {
    			{
    				data.autoplay = autoplay;
    			}
    		}

    		if ($$self.$$.dirty[0] & /*autoplayDuration*/ 134217728) {
    			{
    				data.autoplayDuration = autoplayDuration;
    			}
    		}

    		if ($$self.$$.dirty[0] & /*autoplayDirection*/ 268435456) {
    			{
    				data.autoplayDirection = autoplayDirection;
    			}
    		}

    		if ($$self.$$.dirty[0] & /*pauseOnFocus*/ 536870912) {
    			{
    				data.pauseOnFocus = pauseOnFocus;
    			}
    		}

    		if ($$self.$$.dirty[1] & /*particlesToShow*/ 1) {
    			{
    				data.particlesToShowInit = particlesToShow;
    			}
    		}

    		if ($$self.$$.dirty[1] & /*particlesToScroll*/ 2) {
    			{
    				data.particlesToScrollInit = particlesToScroll;
    			}
    		}
    	};

    	return [
    		timingFunction,
    		arrows,
    		infinite,
    		autoplayProgressVisible,
    		dots,
    		loaded,
    		currentPageIndex,
    		progressValue,
    		offset,
    		durationMs,
    		pagesCount,
    		pageWindowWidth,
    		pageWindowElement,
    		particlesContainer,
    		methods,
    		handlePageChange,
    		handleSwipeStart,
    		handleSwipeThresholdReached,
    		handleSwipeMove,
    		handleSwipeEnd,
    		handleSwipeFailed,
    		handleHovered,
    		handleTapped,
    		showPrevPage,
    		initialPageIndex,
    		duration,
    		autoplay,
    		autoplayDuration,
    		autoplayDirection,
    		pauseOnFocus,
    		swiping,
    		particlesToShow,
    		particlesToScroll,
    		goTo,
    		goToPrev,
    		goToNext,
    		$$scope,
    		slots,
    		swipeable_function,
    		div0_binding,
    		div1_binding,
    		pageChange_handler
    	];
    }

    class Carousel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$2,
    			create_fragment$2,
    			safe_not_equal,
    			{
    				timingFunction: 0,
    				arrows: 1,
    				infinite: 2,
    				initialPageIndex: 24,
    				duration: 25,
    				autoplay: 26,
    				autoplayDuration: 27,
    				autoplayDirection: 28,
    				pauseOnFocus: 29,
    				autoplayProgressVisible: 3,
    				dots: 4,
    				swiping: 30,
    				particlesToShow: 31,
    				particlesToScroll: 32,
    				goTo: 33,
    				goToPrev: 34,
    				goToNext: 35
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Carousel",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get timingFunction() {
    		throw new Error_1("<Carousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set timingFunction(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get arrows() {
    		throw new Error_1("<Carousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set arrows(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get infinite() {
    		throw new Error_1("<Carousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set infinite(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get initialPageIndex() {
    		throw new Error_1("<Carousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set initialPageIndex(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get duration() {
    		throw new Error_1("<Carousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set duration(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get autoplay() {
    		throw new Error_1("<Carousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set autoplay(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get autoplayDuration() {
    		throw new Error_1("<Carousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set autoplayDuration(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get autoplayDirection() {
    		throw new Error_1("<Carousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set autoplayDirection(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pauseOnFocus() {
    		throw new Error_1("<Carousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pauseOnFocus(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get autoplayProgressVisible() {
    		throw new Error_1("<Carousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set autoplayProgressVisible(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dots() {
    		throw new Error_1("<Carousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dots(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get swiping() {
    		throw new Error_1("<Carousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set swiping(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get particlesToShow() {
    		throw new Error_1("<Carousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set particlesToShow(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get particlesToScroll() {
    		throw new Error_1("<Carousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set particlesToScroll(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get goTo() {
    		return this.$$.ctx[33];
    	}

    	set goTo(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get goToPrev() {
    		return this.$$.ctx[34];
    	}

    	set goToPrev(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get goToNext() {
    		return this.$$.ctx[35];
    	}

    	set goToNext(value) {
    		throw new Error_1("<Carousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\lib\components\introduction.svelte generated by Svelte v3.50.1 */

    const { console: console_1 } = globals;
    const file$1 = "src\\lib\\components\\introduction.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (50:24) {#each message as dt}
    function create_each_block$1(ctx) {
    	let p;
    	let raw_value = /*dt*/ ctx[4].messages + "";

    	const block = {
    		c: function create() {
    			p = element("p");
    			attr_dev(p, "class", "instruct svelte-or1eb2");
    			add_location(p, file$1, 50, 24, 1705);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			p.innerHTML = raw_value;
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(50:24) {#each message as dt}",
    		ctx
    	});

    	return block;
    }

    // (22:12) <Carousel                  $: on:pageChange={(e)=>{console.log(e)}}              >
    function create_default_slot(ctx) {
    	let div4;
    	let div0;
    	let h10;
    	let t1;
    	let div1;
    	let img;
    	let img_src_value;
    	let t2;
    	let div2;
    	let p0;
    	let t4;
    	let div3;
    	let p1;
    	let t6;
    	let p2;
    	let t8;
    	let h11;
    	let t10;
    	let div6;
    	let div5;
    	let each_value = message;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			h10 = element("h1");
    			h10.textContent = "WELCOME TO LUANAR APP";
    			t1 = space();
    			div1 = element("div");
    			img = element("img");
    			t2 = space();
    			div2 = element("div");
    			p0 = element("p");
    			p0.textContent = "By using LUANAR APP, you agree to the LUANAR Terms\r\n                            of service and the BUTAO DEV\r\n                            Additional Terms of Service";
    			t4 = space();
    			div3 = element("div");
    			p1 = element("p");
    			p1.textContent = "© COPYRIGHT | 2022 BUTAO PETER UX / UI DEV";
    			t6 = space();
    			p2 = element("p");
    			p2.textContent = "in association with";
    			t8 = space();
    			h11 = element("h1");
    			h11.textContent = "DEVELOPER AFRICA MW";
    			t10 = space();
    			div6 = element("div");
    			div5 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h10, "class", "svelte-or1eb2");
    			add_location(h10, file$1, 27, 24, 733);
    			attr_dev(div0, "class", "upper-txt");
    			add_location(div0, file$1, 26, 20, 684);
    			if (!src_url_equal(img.src, img_src_value = "/favicon.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "luanar logo");
    			add_location(img, file$1, 30, 24, 857);
    			attr_dev(div1, "class", "logo svelte-or1eb2");
    			add_location(div1, file$1, 29, 20, 813);
    			attr_dev(p0, "class", "svelte-or1eb2");
    			add_location(p0, file$1, 33, 24, 999);
    			attr_dev(div2, "class", "bottom-txt");
    			add_location(div2, file$1, 32, 20, 949);
    			attr_dev(p1, "class", "svelte-or1eb2");
    			add_location(p1, file$1, 40, 24, 1325);
    			attr_dev(p2, "class", "svelte-or1eb2");
    			add_location(p2, file$1, 41, 24, 1400);
    			attr_dev(h11, "class", "svelte-or1eb2");
    			add_location(h11, file$1, 42, 24, 1452);
    			attr_dev(div3, "class", "foot-txt");
    			add_location(div3, file$1, 39, 20, 1277);
    			attr_dev(div4, "class", "mn-one svelte-or1eb2");
    			add_location(div4, file$1, 25, 12, 642);
    			attr_dev(div5, "class", "paragraphs svelte-or1eb2");
    			add_location(div5, file$1, 48, 20, 1608);
    			attr_dev(div6, "class", "mn-two svelte-or1eb2");
    			add_location(div6, file$1, 47, 16, 1566);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, h10);
    			append_dev(div4, t1);
    			append_dev(div4, div1);
    			append_dev(div1, img);
    			append_dev(div4, t2);
    			append_dev(div4, div2);
    			append_dev(div2, p0);
    			append_dev(div4, t4);
    			append_dev(div4, div3);
    			append_dev(div3, p1);
    			append_dev(div3, t6);
    			append_dev(div3, p2);
    			append_dev(div3, t8);
    			append_dev(div3, h11);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div5);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div5, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*message*/ 0) {
    				each_value = message;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div5, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(div6);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(22:12) <Carousel                  $: on:pageChange={(e)=>{console.log(e)}}              >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let article1;
    	let article0;
    	let header;
    	let div0;
    	let button0;
    	let t1;
    	let main;
    	let carousel;
    	let t2;
    	let p;
    	let span0;
    	let span1;
    	let t5;
    	let footer;
    	let div1;
    	let button1;
    	let current;
    	let mounted;
    	let dispose;

    	carousel = new Carousel({
    			props: {
    				"$:": true,
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	carousel.$on("pageChange", /*pageChange_handler*/ ctx[2]);

    	const block = {
    		c: function create() {
    			article1 = element("article");
    			article0 = element("article");
    			header = element("header");
    			div0 = element("div");
    			button0 = element("button");
    			button0.textContent = "skip";
    			t1 = space();
    			main = element("main");
    			create_component(carousel.$$.fragment);
    			t2 = space();
    			p = element("p");
    			span0 = element("span");
    			span0.textContent = ".";
    			span1 = element("span");
    			span1.textContent = ".";
    			t5 = space();
    			footer = element("footer");
    			div1 = element("div");
    			button1 = element("button");
    			button1.textContent = "Accept & Continue";
    			attr_dev(button0, "class", "svelte-or1eb2");
    			add_location(button0, file$1, 17, 16, 403);
    			attr_dev(div0, "class", "hd svelte-or1eb2");
    			add_location(div0, file$1, 16, 12, 369);
    			add_location(header, file$1, 15, 8, 347);
    			attr_dev(main, "class", "svelte-or1eb2");
    			add_location(main, file$1, 20, 8, 524);
    			add_location(span0, file$1, 59, 81, 2000);
    			add_location(span1, file$1, 59, 95, 2014);
    			attr_dev(p, "class", "dots svelte-or1eb2");
    			set_style(p, "color", "white");
    			set_style(p, "text-align", "center");
    			set_style(p, "font-size", "2.5rem");
    			add_location(p, file$1, 59, 8, 1927);
    			attr_dev(button1, "class", "svelte-or1eb2");
    			add_location(button1, file$1, 63, 16, 2108);
    			attr_dev(div1, "class", "ft svelte-or1eb2");
    			add_location(div1, file$1, 62, 12, 2074);
    			add_location(footer, file$1, 61, 8, 2052);
    			attr_dev(article0, "class", "ints svelte-or1eb2");
    			add_location(article0, file$1, 13, 4, 305);
    			attr_dev(article1, "class", "intro-section svelte-or1eb2");
    			add_location(article1, file$1, 12, 0, 268);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article1, anchor);
    			append_dev(article1, article0);
    			append_dev(article0, header);
    			append_dev(header, div0);
    			append_dev(div0, button0);
    			append_dev(article0, t1);
    			append_dev(article0, main);
    			mount_component(carousel, main, null);
    			append_dev(article0, t2);
    			append_dev(article0, p);
    			append_dev(p, span0);
    			append_dev(p, span1);
    			append_dev(article0, t5);
    			append_dev(article0, footer);
    			append_dev(footer, div1);
    			append_dev(div1, button1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[1], false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const carousel_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				carousel_changes.$$scope = { dirty, ctx };
    			}

    			carousel.$set(carousel_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(carousel.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(carousel.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article1);
    			destroy_component(carousel);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Introduction', slots, []);
    	const dispatch = createEventDispatcher();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Introduction> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		dispatch("acceptcontEvent", true);
    	};

    	const pageChange_handler = e => {
    		console.log(e);
    	};

    	const click_handler_1 = () => {
    		dispatch("acceptcontEvent", true);
    	};

    	$$self.$capture_state = () => ({
    		message,
    		Carousel,
    		createEventDispatcher,
    		dispatch
    	});

    	return [dispatch, click_handler, pageChange_handler, click_handler_1];
    }

    class Introduction extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Introduction",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.50.1 */
    const file = "src\\App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    // (79:0) {#if introtoggle}
    function create_if_block_1(ctx) {
    	let div;
    	let intro;
    	let current;
    	intro = new Introduction({ $$inline: true });
    	intro.$on("acceptcontEvent", /*acceptcontListener*/ ctx[6]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(intro.$$.fragment);
    			attr_dev(div, "class", "introduction");
    			add_location(div, file, 79, 0, 1996);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(intro, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro$1(local) {
    			if (current) return;
    			transition_in(intro.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(intro.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(intro);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(79:0) {#if introtoggle}",
    		ctx
    	});

    	return block;
    }

    // (118:18) {#each $data.common as dc}
    function create_each_block(ctx) {
    	let h1;
    	let t_value = /*dc*/ ctx[12].programme + "";
    	let t;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t = text(t_value);
    			attr_dev(h1, "class", "svelte-1ceecb4");
    			add_location(h1, file, 118, 18, 4274);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$data*/ 16 && t_value !== (t_value = /*dc*/ ctx[12].programme + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(118:18) {#each $data.common as dc}",
    		ctx
    	});

    	return block;
    }

    // (208:4) {#if darktogglevar}
    function create_if_block(ctx) {
    	let style;

    	const block = {
    		c: function create() {
    			style = element("style");
    			style.textContent = "body{\n        background: hsl(208, 96%, 4%) !important;\n        height: 100%;\n        --bg: hsl(208, 96%, 4%) !important;\n        --l-bl: hsl(207, 38%, 24%) !important;\n        --rmd-cd: hsl(207, 38%, 24%) !important;\n        --wc: hsl(208, 80%, 10%) !important;\n        --tc: seashell !important;\n        --mn-cd: rgb(122, 122, 122, .4) !important;\n        --abt-txt: hsl(208, 96%, 90%) !important;\n      }";
    			add_location(style, file, 208, 4, 10524);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, style, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(style);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(208:4) {#if darktogglevar}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let router;
    	let t0;
    	let t1;
    	let div16;
    	let div15;
    	let div9;
    	let div8;
    	let nav0;
    	let div5;
    	let div2;
    	let div0;
    	let button0;
    	let svg0;
    	let g;
    	let rect;
    	let path0;
    	let defs;
    	let filter;
    	let feFlood;
    	let feColorMatrix0;
    	let feOffset;
    	let feGaussianBlur;
    	let feComposite;
    	let feColorMatrix1;
    	let feBlend0;
    	let feBlend1;
    	let t2;
    	let div1;
    	let t3;
    	let div4;
    	let div3;
    	let button1;
    	let t5;
    	let div7;
    	let div6;
    	let article0;
    	let timecard;
    	let t6;
    	let article1;
    	let menu;
    	let t7;
    	let div14;
    	let div13;
    	let nav1;
    	let div12;
    	let div10;
    	let ul0;
    	let li0;
    	let a0;
    	let svg1;
    	let path1;
    	let t8;
    	let li1;
    	let a1;
    	let svg2;
    	let path2;
    	let t9;
    	let li2;
    	let a2;
    	let svg3;
    	let path3;
    	let t10;
    	let li3;
    	let a3;
    	let svg4;
    	let path4;
    	let t11;
    	let div11;
    	let ul1;
    	let li4;
    	let a4;
    	let svg5;
    	let path5;
    	let t12;
    	let if_block1_anchor;
    	let current;
    	let mounted;
    	let dispose;

    	router = new Router({
    			props: {
    				routes: {
    					"/": Routes,
    					"/about": About,
    					"/analytics": Analytics,
    					"/table": Table,
    					"/reminder": Reminder,
    					"/slug/:code": Slug
    				}
    			},
    			$$inline: true
    		});

    	let if_block0 = /*introtoggle*/ ctx[0] && create_if_block_1(ctx);
    	let each_value = /*$data*/ ctx[4].common;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	timecard = new Timecard({ $$inline: true });
    	timecard.$on("timeEvent", /*timeListener*/ ctx[7]);
    	menu = new Menu({ $$inline: true });
    	menu.$on("darkEvent", /*darkListener*/ ctx[9]);
    	menu.$on("menuEvent", /*menuListener*/ ctx[8]);
    	let if_block1 = /*darktogglevar*/ ctx[1] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			div16 = element("div");
    			div15 = element("div");
    			div9 = element("div");
    			div8 = element("div");
    			nav0 = element("nav");
    			div5 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			button0 = element("button");
    			svg0 = svg_element("svg");
    			g = svg_element("g");
    			rect = svg_element("rect");
    			path0 = svg_element("path");
    			defs = svg_element("defs");
    			filter = svg_element("filter");
    			feFlood = svg_element("feFlood");
    			feColorMatrix0 = svg_element("feColorMatrix");
    			feOffset = svg_element("feOffset");
    			feGaussianBlur = svg_element("feGaussianBlur");
    			feComposite = svg_element("feComposite");
    			feColorMatrix1 = svg_element("feColorMatrix");
    			feBlend0 = svg_element("feBlend");
    			feBlend1 = svg_element("feBlend");
    			t2 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			div4 = element("div");
    			div3 = element("div");
    			button1 = element("button");
    			button1.textContent = `${`${/*date*/ ctx[5].getDate()} | ${/*date*/ ctx[5].toLocaleDateString("en-GB", { weekday: "long" })}`}`;
    			t5 = space();
    			div7 = element("div");
    			div6 = element("div");
    			article0 = element("article");
    			create_component(timecard.$$.fragment);
    			t6 = space();
    			article1 = element("article");
    			create_component(menu.$$.fragment);
    			t7 = space();
    			div14 = element("div");
    			div13 = element("div");
    			nav1 = element("nav");
    			div12 = element("div");
    			div10 = element("div");
    			ul0 = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t8 = space();
    			li1 = element("li");
    			a1 = element("a");
    			svg2 = svg_element("svg");
    			path2 = svg_element("path");
    			t9 = space();
    			li2 = element("li");
    			a2 = element("a");
    			svg3 = svg_element("svg");
    			path3 = svg_element("path");
    			t10 = space();
    			li3 = element("li");
    			a3 = element("a");
    			svg4 = svg_element("svg");
    			path4 = svg_element("path");
    			t11 = space();
    			div11 = element("div");
    			ul1 = element("ul");
    			li4 = element("li");
    			a4 = element("a");
    			svg5 = svg_element("svg");
    			path5 = svg_element("path");
    			t12 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    			attr_dev(rect, "x", "4");
    			attr_dev(rect, "width", "37");
    			attr_dev(rect, "height", "36");
    			attr_dev(rect, "rx", "3");
    			attr_dev(rect, "fill", "#F5FBF5");
    			add_location(rect, file, 97, 22, 2574);
    			attr_dev(g, "filter", "url(#filter0_d_33_34)");
    			add_location(g, file, 96, 22, 2517);
    			attr_dev(path0, "d", "M13.5 18C13.5 19.1053 14.3947 20 15.5 20C16.6053 20 17.5 19.1053 17.5 18C17.5 16.8947 16.6053 16 15.5 16C14.3947 16 13.5 16.8947 13.5 18ZM20.5 18C20.5 19.1053 21.3947 20 22.5 20C23.6053 20 24.5 19.1053 24.5 18C24.5 16.8947 23.6053 16 22.5 16C21.3947 16 20.5 16.8947 20.5 18ZM27.5 18C27.5 19.1053 28.3947 20 29.5 20C30.6053 20 31.5 19.1053 31.5 18C31.5 16.8947 30.6053 16 29.5 16C28.3947 16 27.5 16.8947 27.5 18Z");
    			attr_dev(path0, "fill", "#333333");
    			add_location(path0, file, 99, 22, 2682);
    			attr_dev(feFlood, "flood-opacity", "0");
    			attr_dev(feFlood, "result", "BackgroundImageFix");
    			add_location(feFlood, file, 102, 22, 3323);
    			attr_dev(feColorMatrix0, "in", "SourceAlpha");
    			attr_dev(feColorMatrix0, "type", "matrix");
    			attr_dev(feColorMatrix0, "values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0");
    			attr_dev(feColorMatrix0, "result", "hardAlpha");
    			add_location(feColorMatrix0, file, 103, 22, 3402);
    			attr_dev(feOffset, "dy", "4");
    			add_location(feOffset, file, 104, 22, 3542);
    			attr_dev(feGaussianBlur, "stdDeviation", "2");
    			add_location(feGaussianBlur, file, 105, 22, 3583);
    			attr_dev(feComposite, "in2", "hardAlpha");
    			attr_dev(feComposite, "operator", "out");
    			add_location(feComposite, file, 106, 22, 3640);
    			attr_dev(feColorMatrix1, "type", "matrix");
    			attr_dev(feColorMatrix1, "values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.37 0");
    			add_location(feColorMatrix1, file, 107, 22, 3708);
    			attr_dev(feBlend0, "mode", "normal");
    			attr_dev(feBlend0, "in2", "BackgroundImageFix");
    			attr_dev(feBlend0, "result", "effect1_dropShadow_33_34");
    			add_location(feBlend0, file, 108, 22, 3813);
    			attr_dev(feBlend1, "mode", "normal");
    			attr_dev(feBlend1, "in", "SourceGraphic");
    			attr_dev(feBlend1, "in2", "effect1_dropShadow_33_34");
    			attr_dev(feBlend1, "result", "shape");
    			add_location(feBlend1, file, 109, 22, 3919);
    			attr_dev(filter, "id", "filter0_d_33_34");
    			attr_dev(filter, "x", "0");
    			attr_dev(filter, "y", "0");
    			attr_dev(filter, "width", "45");
    			attr_dev(filter, "height", "44");
    			attr_dev(filter, "filterUnits", "userSpaceOnUse");
    			attr_dev(filter, "color-interpolation-filters", "sRGB");
    			add_location(filter, file, 101, 22, 3172);
    			add_location(defs, file, 100, 22, 3143);
    			attr_dev(svg0, "width", "45");
    			attr_dev(svg0, "height", "44");
    			attr_dev(svg0, "viewBox", "0 0 45 44");
    			attr_dev(svg0, "fill", "none");
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg0, "class", "svelte-1ceecb4");
    			add_location(svg0, file, 95, 20, 2399);
    			attr_dev(button0, "class", "svelte-1ceecb4");
    			add_location(button0, file, 93, 18, 2343);
    			attr_dev(div0, "class", "mnu");
    			add_location(div0, file, 92, 16, 2307);
    			attr_dev(div1, "class", "progname");
    			add_location(div1, file, 116, 16, 4188);
    			attr_dev(div2, "class", "menu svelte-1ceecb4");
    			add_location(div2, file, 91, 14, 2272);
    			attr_dev(button1, "class", "svelte-1ceecb4");
    			add_location(button1, file, 125, 18, 4455);
    			attr_dev(div3, "class", "tm");
    			add_location(div3, file, 124, 16, 4420);
    			attr_dev(div4, "class", "time");
    			add_location(div4, file, 123, 14, 4385);
    			attr_dev(div5, "class", "nv svelte-1ceecb4");
    			add_location(div5, file, 89, 12, 2238);
    			add_location(nav0, file, 88, 10, 2220);
    			attr_dev(article0, "class", "time-pcnt svelte-1ceecb4");
    			toggle_class(article0, "clipclass", /*timetogglevar*/ ctx[3]);
    			add_location(article0, file, 135, 14, 4751);
    			attr_dev(article1, "class", "menu-pcnt svelte-1ceecb4");
    			toggle_class(article1, "clipclass", /*menutogglevar*/ ctx[2]);
    			add_location(article1, file, 139, 14, 4910);
    			attr_dev(div6, "class", "ppp-cnt");
    			add_location(div6, file, 133, 12, 4712);
    			attr_dev(div7, "class", "popup-content");
    			add_location(div7, file, 132, 10, 4672);
    			attr_dev(div8, "class", "up-nv svelte-1ceecb4");
    			add_location(div8, file, 87, 8, 2190);
    			attr_dev(div9, "class", "upper-navigation svelte-1ceecb4");
    			add_location(div9, file, 86, 6, 2151);
    			attr_dev(path1, "d", "M15 14C15 12.3333 13.6667 11 12 11C10.3333 11 9 12.3333 9 14V19H7C5.77193 19 5 18.2281 5 17V11.2456C5 10.6316 5.15789 10.2456 5.57895 9.82456L10.5789 4.82456C11.4737 3.94737 12.5263 3.94737 13.4211 4.82456L18.4211 9.82456C18.8421 10.2456 19 10.6316 19 11.2456V17C19 18.2281 18.2281 19 17 19H15V14ZM13 14V21H17C19.2105 21 21 19.2105 21 17V11.2456C21 10.1754 20.5789 9.15789 19.8246 8.42105L14.8246 3.42105C13.2632 1.84211 10.7368 1.84211 9.17544 3.42105L4.17544 8.42105C3.42105 9.15789 3 10.1754 3 11.2456V17C3 19.2105 4.78947 21 7 21H11V14C11 13.3158 11.3158 13 12 13C12.6842 13 13 13.3158 13 14ZM14 19H10V21H14V19Z");
    			attr_dev(path1, "fill", "var(--svg)");
    			add_location(path1, file, 156, 24, 5517);
    			attr_dev(svg1, "width", "24");
    			attr_dev(svg1, "height", "24");
    			attr_dev(svg1, "viewBox", "0 0 24 24");
    			attr_dev(svg1, "fill", "none");
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg1, "class", "svelte-1ceecb4");
    			add_location(svg1, file, 155, 22, 5397);
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "svelte-1ceecb4");
    			add_location(a0, file, 154, 20, 5353);
    			attr_dev(li0, "class", "svelte-1ceecb4");
    			add_location(li0, file, 153, 18, 5328);
    			attr_dev(path2, "d", "M16 11H8C7.45614 11 7 11.4561 7 12C7 12.5439 7.45614 13 8 13H16C16.5439 13 17 12.5439 17 12C17 11.4561 16.5439 11 16 11ZM12 15H8C7.45614 15 7 15.4561 7 16C7 16.5439 7.45614 17 8 17H12C12.5439 17 13 16.5439 13 16C13 15.4561 12.5439 15 12 15ZM17 5C18.2632 5 19 5.73684 19 7H5C5 5.73684 5.73684 5 7 5H17ZM17 3H7C4.75439 3 3 4.75439 3 7V9H21V7C21 4.75439 19.2456 3 17 3ZM5 9H19V17C19 18.2632 18.2632 19 17 19H7C5.73684 19 5 18.2632 5 17V9ZM3 7V17C3 19.2456 4.75439 21 7 21H17C19.2456 21 21 19.2456 21 17V7H3ZM6 2V4C6 4.54386 6.45614 5 7 5C7.54386 5 8 4.54386 8 4V2C8 1.45614 7.54386 1 7 1C6.45614 1 6 1.45614 6 2ZM18 4V2C18 1.45614 17.5439 1 17 1C16.4561 1 16 1.45614 16 2V4C16 4.54386 16.4561 5 17 5C17.5439 5 18 4.54386 18 4Z");
    			attr_dev(path2, "fill", "var(--svg)");
    			add_location(path2, file, 164, 24, 6480);
    			attr_dev(svg2, "width", "24");
    			attr_dev(svg2, "height", "24");
    			attr_dev(svg2, "viewBox", "0 0 24 24");
    			attr_dev(svg2, "fill", "none");
    			attr_dev(svg2, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg2, "class", "svelte-1ceecb4");
    			add_location(svg2, file, 163, 22, 6360);
    			attr_dev(a1, "href", "/table");
    			attr_dev(a1, "class", "svelte-1ceecb4");
    			add_location(a1, file, 162, 20, 6311);
    			attr_dev(li1, "class", "svelte-1ceecb4");
    			add_location(li1, file, 161, 18, 6286);
    			attr_dev(path3, "d", "M12 11H19C19.5439 11 20 10.5439 20 10C20 9.45614 19.5439 9 19 9H12C11.4561 9 11 9.45614 11 10C11 10.5439 11.4561 11 12 11ZM12 2H8C5.78947 2 4 3.78947 4 6V18C4 20.2105 5.78947 22 8 22H16C18.2105 22 20 20.2105 20 18V10C20 9.45614 19.5439 9 19 9C18.4561 9 18 9.45614 18 10V18C18 19.2281 17.2281 20 16 20H8C6.77193 20 6 19.2281 6 18V6C6 4.77193 6.77193 4 8 4H12C12.5439 4 13 3.54386 13 3C13 2.45614 12.5439 2 12 2ZM11 3V10C11 10.5439 11.4561 11 12 11C12.5439 11 13 10.5439 13 10V3C13 2.45614 12.5439 2 12 2C11.4561 2 11 2.45614 11 3ZM19.7018 9.29825L12.7018 2.29825C12.5263 2.10526 12.2807 2 12 2C11.4561 2 11 2.45614 11 3C11 3.2807 11.1053 3.52632 11.2982 3.70175L18.2982 10.7018C18.4737 10.8947 18.7193 11 19 11C19.5439 11 20 10.5439 20 10C20 9.7193 19.8947 9.47368 19.7018 9.29825Z");
    			attr_dev(path3, "fill", "var(--svg)");
    			add_location(path3, file, 171, 24, 7551);
    			attr_dev(svg3, "width", "24");
    			attr_dev(svg3, "height", "24");
    			attr_dev(svg3, "viewBox", "0 0 24 24");
    			attr_dev(svg3, "fill", "none");
    			attr_dev(svg3, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg3, "class", "svelte-1ceecb4");
    			add_location(svg3, file, 170, 22, 7431);
    			attr_dev(a2, "href", "/analytics");
    			attr_dev(a2, "class", "svelte-1ceecb4");
    			add_location(a2, file, 169, 20, 7377);
    			attr_dev(li2, "class", "svelte-1ceecb4");
    			add_location(li2, file, 168, 18, 7352);
    			attr_dev(path4, "d", "M20 11H13V4C13 3.45614 12.5439 3 12 3C11.4561 3 11 3.45614 11 4V13H20C20.5439 13 21 12.5439 21 12C21 11.4561 20.5439 11 20 11ZM4 13H11V20C11 20.5439 11.4561 21 12 21C12.5439 21 13 20.5439 13 20V11H4C3.45614 11 3 11.4561 3 12C3 12.5439 3.45614 13 4 13Z");
    			attr_dev(path4, "fill", "var(--svg)");
    			add_location(path4, file, 180, 24, 8707);
    			attr_dev(svg4, "width", "24");
    			attr_dev(svg4, "height", "24");
    			attr_dev(svg4, "viewBox", "0 0 24 24");
    			attr_dev(svg4, "fill", "none");
    			attr_dev(svg4, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg4, "class", "svelte-1ceecb4");
    			add_location(svg4, file, 179, 22, 8587);
    			attr_dev(a3, "href", "/reminder");
    			attr_dev(a3, "class", "svelte-1ceecb4");
    			add_location(a3, file, 178, 20, 8535);
    			attr_dev(li3, "class", "svelte-1ceecb4");
    			add_location(li3, file, 177, 18, 8510);
    			attr_dev(ul0, "class", "svelte-1ceecb4");
    			add_location(ul0, file, 152, 16, 5305);
    			attr_dev(div10, "class", "left svelte-1ceecb4");
    			add_location(div10, file, 151, 14, 5270);
    			attr_dev(path5, "d", "M12 20C7.45614 20 4 16.5439 4 12C4 7.45614 7.45614 4 12 4C16.5439 4 20 7.45614 20 12C20 16.5439 16.5439 20 12 20ZM12 22C17.5263 22 22 17.5263 22 12C22 6.47368 17.5263 2 12 2C6.47368 2 2 6.47368 2 12C2 17.5263 6.47368 22 12 22ZM13 13.3333C13 12.0877 15.5263 11.7018 15.5088 9.49123C15.5088 7.5614 13.9474 6 12 6C10.0526 6 8.50877 7.57895 8.50877 9.49123C8.50877 10.0351 8.96491 10.4912 9.50877 10.4912C10.0526 10.4912 10.5088 10.0351 10.5088 9.49123C10.5088 8.52632 11.0351 8 12 8C12.9649 8 13.5088 8.54386 13.5088 9.49123C13.5263 10.6842 11 11.1228 11 13.3333C11 13.8772 11.4561 14.3333 12 14.3333C12.5439 14.3333 13 13.8772 13 13.3333ZM12 18C12.7368 18 13.3333 17.4035 13.3333 16.6667C13.3333 15.9298 12.7368 15.3333 12 15.3333C11.2632 15.3333 10.6667 15.9298 10.6667 16.6667C10.6667 17.4035 11.2632 18 12 18Z");
    			attr_dev(path5, "fill", "var(--bl)");
    			add_location(path5, file, 192, 24, 9405);
    			attr_dev(svg5, "width", "24");
    			attr_dev(svg5, "height", "24");
    			attr_dev(svg5, "viewBox", "0 0 24 24");
    			attr_dev(svg5, "fill", "none");
    			attr_dev(svg5, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg5, "class", "svelte-1ceecb4");
    			add_location(svg5, file, 191, 22, 9285);
    			attr_dev(a4, "href", "/about");
    			attr_dev(a4, "class", "svelte-1ceecb4");
    			add_location(a4, file, 190, 20, 9234);
    			attr_dev(li4, "class", "svelte-1ceecb4");
    			add_location(li4, file, 189, 18, 9209);
    			attr_dev(ul1, "class", "svelte-1ceecb4");
    			add_location(ul1, file, 188, 16, 9186);
    			attr_dev(div11, "class", "right svelte-1ceecb4");
    			add_location(div11, file, 187, 14, 9150);
    			attr_dev(div12, "class", "nv svelte-1ceecb4");
    			add_location(div12, file, 150, 12, 5239);
    			add_location(nav1, file, 149, 10, 5221);
    			attr_dev(div13, "class", "lw-nv svelte-1ceecb4");
    			add_location(div13, file, 148, 8, 5191);
    			attr_dev(div14, "class", "lowwer-navigation svelte-1ceecb4");
    			add_location(div14, file, 147, 6, 5151);
    			attr_dev(div15, "class", "mn-lyout");
    			add_location(div15, file, 85, 4, 2122);
    			attr_dev(div16, "class", "main-layout svelte-1ceecb4");
    			add_location(div16, file, 84, 0, 2091);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div16, anchor);
    			append_dev(div16, div15);
    			append_dev(div15, div9);
    			append_dev(div9, div8);
    			append_dev(div8, nav0);
    			append_dev(nav0, div5);
    			append_dev(div5, div2);
    			append_dev(div2, div0);
    			append_dev(div0, button0);
    			append_dev(button0, svg0);
    			append_dev(svg0, g);
    			append_dev(g, rect);
    			append_dev(svg0, path0);
    			append_dev(svg0, defs);
    			append_dev(defs, filter);
    			append_dev(filter, feFlood);
    			append_dev(filter, feColorMatrix0);
    			append_dev(filter, feOffset);
    			append_dev(filter, feGaussianBlur);
    			append_dev(filter, feComposite);
    			append_dev(filter, feColorMatrix1);
    			append_dev(filter, feBlend0);
    			append_dev(filter, feBlend1);
    			append_dev(div2, t2);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div5, t3);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div3, button1);
    			append_dev(div8, t5);
    			append_dev(div8, div7);
    			append_dev(div7, div6);
    			append_dev(div6, article0);
    			mount_component(timecard, article0, null);
    			append_dev(div6, t6);
    			append_dev(div6, article1);
    			mount_component(menu, article1, null);
    			append_dev(div15, t7);
    			append_dev(div15, div14);
    			append_dev(div14, div13);
    			append_dev(div13, nav1);
    			append_dev(nav1, div12);
    			append_dev(div12, div10);
    			append_dev(div10, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, a0);
    			append_dev(a0, svg1);
    			append_dev(svg1, path1);
    			append_dev(ul0, t8);
    			append_dev(ul0, li1);
    			append_dev(li1, a1);
    			append_dev(a1, svg2);
    			append_dev(svg2, path2);
    			append_dev(ul0, t9);
    			append_dev(ul0, li2);
    			append_dev(li2, a2);
    			append_dev(a2, svg3);
    			append_dev(svg3, path3);
    			append_dev(ul0, t10);
    			append_dev(ul0, li3);
    			append_dev(li3, a3);
    			append_dev(a3, svg4);
    			append_dev(svg4, path4);
    			append_dev(div12, t11);
    			append_dev(div12, div11);
    			append_dev(div11, ul1);
    			append_dev(ul1, li4);
    			append_dev(li4, a4);
    			append_dev(a4, svg5);
    			append_dev(svg5, path5);
    			insert_dev(target, t12, anchor);
    			if (if_block1) if_block1.m(document.head, null);
    			append_dev(document.head, if_block1_anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*menuListener*/ ctx[8], false, false, false),
    					listen_dev(button1, "click", /*timeListener*/ ctx[7], false, false, false),
    					action_destroyer(link.call(null, a0)),
    					action_destroyer(link.call(null, a1)),
    					action_destroyer(link.call(null, a2)),
    					action_destroyer(link.call(null, a3)),
    					action_destroyer(link.call(null, a4))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*introtoggle*/ ctx[0]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*introtoggle*/ 1) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t1.parentNode, t1);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*$data*/ 16) {
    				each_value = /*$data*/ ctx[4].common;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (!current || dirty & /*timetogglevar*/ 8) {
    				toggle_class(article0, "clipclass", /*timetogglevar*/ ctx[3]);
    			}

    			if (!current || dirty & /*menutogglevar*/ 4) {
    				toggle_class(article1, "clipclass", /*menutogglevar*/ ctx[2]);
    			}

    			if (/*darktogglevar*/ ctx[1]) {
    				if (if_block1) ; else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(timecard.$$.fragment, local);
    			transition_in(menu.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(timecard.$$.fragment, local);
    			transition_out(menu.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div16);
    			destroy_each(each_blocks, detaching);
    			destroy_component(timecard);
    			destroy_component(menu);
    			if (detaching) detach_dev(t12);
    			if (if_block1) if_block1.d(detaching);
    			detach_dev(if_block1_anchor);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let timetogglevar;
    	let menutogglevar;
    	let darktogglevar;
    	let introtoggle;
    	let $data;
    	validate_store(data, 'data');
    	component_subscribe($$self, data, $$value => $$invalidate(4, $data = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let date = new Date();
    	let darkKeyValue = "BUTAO-LASC-V1.1.1-darkkeyvalue";
    	let introKeyValue = "BUTAO-LASC-V1.1.1-introkeyvalue";

    	function acceptcontListener() {
    		$$invalidate(0, introtoggle = false);
    		localStorage.setItem(introKeyValue, JSON.stringify(false));
    	}

    	function timeListener() {
    		$$invalidate(3, timetogglevar = !timetogglevar);
    	}

    	function menuListener() {
    		$$invalidate(2, menutogglevar = !menutogglevar);
    	}

    	function darkListener() {
    		$$invalidate(1, darktogglevar = !darktogglevar);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Router,
    		link,
    		ABOUT: About,
    		ANALYTICS: Analytics,
    		HOME: Routes,
    		REMINDER: Reminder,
    		TABLE: Table,
    		SLUG: Slug,
    		data,
    		TIMECARD: Timecard,
    		MENU: Menu,
    		INTRO: Introduction,
    		date,
    		darkKeyValue,
    		introKeyValue,
    		acceptcontListener,
    		timeListener,
    		menuListener,
    		darkListener,
    		introtoggle,
    		darktogglevar,
    		menutogglevar,
    		timetogglevar,
    		$data
    	});

    	$$self.$inject_state = $$props => {
    		if ('date' in $$props) $$invalidate(5, date = $$props.date);
    		if ('darkKeyValue' in $$props) $$invalidate(10, darkKeyValue = $$props.darkKeyValue);
    		if ('introKeyValue' in $$props) $$invalidate(11, introKeyValue = $$props.introKeyValue);
    		if ('introtoggle' in $$props) $$invalidate(0, introtoggle = $$props.introtoggle);
    		if ('darktogglevar' in $$props) $$invalidate(1, darktogglevar = $$props.darktogglevar);
    		if ('menutogglevar' in $$props) $$invalidate(2, menutogglevar = $$props.menutogglevar);
    		if ('timetogglevar' in $$props) $$invalidate(3, timetogglevar = $$props.timetogglevar);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$invalidate(3, timetogglevar = false);
    	$$invalidate(2, menutogglevar = false);
    	$$invalidate(1, darktogglevar = false);
    	$$invalidate(0, introtoggle = false);

    	if (localStorage.getItem(darkKeyValue) !== null) {
    		let darkLocal = localStorage.getItem(darkKeyValue);
    		$$invalidate(1, darktogglevar = JSON.parse(darkLocal));
    	}

    	if (localStorage.getItem(introKeyValue) == null) {
    		$$invalidate(0, introtoggle = true);
    	}

    	if (localStorage.getItem(introKeyValue) !== null) {
    		let introLocal = localStorage.getItem(introKeyValue);
    		$$invalidate(0, introtoggle = JSON.parse(introLocal));
    	}

    	return [
    		introtoggle,
    		darktogglevar,
    		menutogglevar,
    		timetogglevar,
    		$data,
    		date,
    		acceptcontListener,
    		timeListener,
    		menuListener,
    		darkListener
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
      props: {
        name: "world",
      },
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
