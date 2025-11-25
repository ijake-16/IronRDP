var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _t2, _e, _a, _b;
const nr = "5";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(nr);
const sr = 2, or = "[", ar = "]", je = {}, W = Symbol(), ei = false, Z = 2, hi = 4, Ct = 8, qt = 16, me = 32, Ne = 64, ft = 128, j = 256, ht = 512, H = 1024, ge = 2048, Pe = 4096, bt = 8192, Et = 16384, lr = 32768, ur = 65536, cr = 1 << 19, bi = 1 << 20, at = Symbol("$state"), dr = Symbol("legacy props");
var pi = Array.isArray, fr = Array.prototype.indexOf, hr = Array.from, pt = Object.keys, vt = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, br = Object.getOwnPropertyDescriptors, pr = Object.prototype, vr = Array.prototype, vi = Object.getPrototypeOf;
const lt = () => {
};
function wi(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
let Ye = [], Nt = [];
function mi() {
  var t = Ye;
  Ye = [], wi(t);
}
function wr() {
  var t = Nt;
  Nt = [], wi(t);
}
function Ht(t) {
  Ye.length === 0 && queueMicrotask(mi), Ye.push(t);
}
function ti() {
  Ye.length > 0 && mi(), Nt.length > 0 && wr();
}
function gi(t) {
  return t === this.v;
}
function _i(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == "object" || typeof t == "function";
}
function mr(t) {
  return !_i(t, this.v);
}
function gr(t) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function _r() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function xr(t) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function yr() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Cr() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function Er() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function kr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Sr() {
  throw new Error("https://svelte.dev/e/state_unsafe_local_read");
}
function Dr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
let $r = false;
function ne(t, e) {
  var i = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: gi,
    rv: 0,
    wv: 0
  };
  return i;
}
function Rt(t) {
  return /* @__PURE__ */ Tr(ne(t));
}
// @__NO_SIDE_EFFECTS__
function xi(t, e = false) {
  const i = ne(t);
  return e || (i.equals = mr), i;
}
// @__NO_SIDE_EFFECTS__
function Tr(t) {
  return S !== null && !X && (S.f & Z) !== 0 && (se === null ? Mr([t]) : se.push(t)), t;
}
function q(t, e) {
  return S !== null && !X && qi() && (S.f & (Z | qt)) !== 0 && // If the source was created locally within the current derived, then
  // we allow the mutation.
  (se === null || !se.includes(t)) && Dr(), Rr(t, e);
}
function Rr(t, e) {
  return t.equals(e) || (t.v, t.v = e, t.wv = Oi(), yi(t, ge), $ !== null && ($.f & H) !== 0 && ($.f & (me | Ne)) === 0 && (ue === null ? Fr([t]) : ue.push(t))), e;
}
function yi(t, e) {
  var i = t.reactions;
  if (i !== null)
    for (var r = i.length, n = 0; n < r; n++) {
      var s = i[n], c = s.f;
      (c & ge) === 0 && (ce(s, e), (c & (H | j)) !== 0 && ((c & Z) !== 0 ? yi(
        /** @type {Derived} */
        s,
        Pe
      ) : Yt(
        /** @type {Effect} */
        s
      )));
    }
}
// @__NO_SIDE_EFFECTS__
function Ci(t) {
  var e = Z | ge, i = S !== null && (S.f & Z) !== 0 ? (
    /** @type {Derived} */
    S
  ) : null;
  return $ === null || i !== null && (i.f & j) !== 0 ? e |= j : $.f |= bi, {
    ctx: U,
    deps: null,
    effects: null,
    equals: gi,
    f: e,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      null
    ),
    wv: 0,
    parent: i ?? $
  };
}
function Ei(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var i = 0; i < e.length; i += 1)
      we(
        /** @type {Effect} */
        e[i]
      );
  }
}
function Ar(t) {
  for (var e = t.parent; e !== null; ) {
    if ((e.f & Z) === 0)
      return (
        /** @type {Effect} */
        e
      );
    e = e.parent;
  }
  return null;
}
function Or(t) {
  var e, i = $;
  ve(Ar(t));
  try {
    Ei(t), e = Mi(t);
  } finally {
    ve(i);
  }
  return e;
}
function ki(t) {
  var e = Or(t), i = (be || (t.f & j) !== 0) && t.deps !== null ? Pe : H;
  ce(t, i), t.equals(e) || (t.v = e, t.wv = Oi());
}
function Vt(t) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
let Q = false;
function nt(t) {
  Q = t;
}
let z;
function wt(t) {
  if (t === null)
    throw Vt(), je;
  return z = t;
}
function Si() {
  return wt(
    /** @type {TemplateNode} */
    /* @__PURE__ */ kt(z)
  );
}
function At(t) {
  if (Q) {
    if (/* @__PURE__ */ kt(z) !== null)
      throw Vt(), je;
    z = t;
  }
}
function Ee(t, e = null, i) {
  if (typeof t != "object" || t === null || at in t)
    return t;
  const r = vi(t);
  if (r !== pr && r !== vr)
    return t;
  var n = /* @__PURE__ */ new Map(), s = pi(t), c = ne(0);
  s && n.set("length", ne(
    /** @type {any[]} */
    t.length
  ));
  var f;
  return new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(h, d, p) {
        (!("value" in p) || p.configurable === false || p.enumerable === false || p.writable === false) && Er();
        var w = n.get(d);
        return w === void 0 ? (w = ne(p.value), n.set(d, w)) : q(w, Ee(p.value, f)), true;
      },
      deleteProperty(h, d) {
        var p = n.get(d);
        if (p === void 0)
          d in h && n.set(d, ne(W));
        else {
          if (s && typeof d == "string") {
            var w = (
              /** @type {Source<number>} */
              n.get("length")
            ), o = Number(d);
            Number.isInteger(o) && o < w.v && q(w, o);
          }
          q(p, W), ii(c);
        }
        return true;
      },
      get(h, d, p) {
        var _a2;
        if (d === at)
          return t;
        var w = n.get(d), o = d in h;
        if (w === void 0 && (!o || ((_a2 = Fe(h, d)) == null ? void 0 : _a2.writable)) && (w = ne(Ee(o ? h[d] : W, f)), n.set(d, w)), w !== void 0) {
          var a = B(w);
          return a === W ? void 0 : a;
        }
        return Reflect.get(h, d, p);
      },
      getOwnPropertyDescriptor(h, d) {
        var p = Reflect.getOwnPropertyDescriptor(h, d);
        if (p && "value" in p) {
          var w = n.get(d);
          w && (p.value = B(w));
        } else if (p === void 0) {
          var o = n.get(d), a = o == null ? void 0 : o.v;
          if (o !== void 0 && a !== W)
            return {
              enumerable: true,
              configurable: true,
              value: a,
              writable: true
            };
        }
        return p;
      },
      has(h, d) {
        var _a2;
        if (d === at)
          return true;
        var p = n.get(d), w = p !== void 0 && p.v !== W || Reflect.has(h, d);
        if (p !== void 0 || $ !== null && (!w || ((_a2 = Fe(h, d)) == null ? void 0 : _a2.writable))) {
          p === void 0 && (p = ne(w ? Ee(h[d], f) : W), n.set(d, p));
          var o = B(p);
          if (o === W)
            return false;
        }
        return w;
      },
      set(h, d, p, w) {
        var _a2;
        var o = n.get(d), a = d in h;
        if (s && d === "length")
          for (var l = p; l < /** @type {Source<number>} */
          o.v; l += 1) {
            var u = n.get(l + "");
            u !== void 0 ? q(u, W) : l in h && (u = ne(W), n.set(l + "", u));
          }
        o === void 0 ? (!a || ((_a2 = Fe(h, d)) == null ? void 0 : _a2.writable)) && (o = ne(void 0), q(o, Ee(p, f)), n.set(d, o)) : (a = o.v !== W, q(o, Ee(p, f)));
        var b = Reflect.getOwnPropertyDescriptor(h, d);
        if ((b == null ? void 0 : b.set) && b.set.call(w, p), !a) {
          if (s && typeof d == "string") {
            var O = (
              /** @type {Source<number>} */
              n.get("length")
            ), L = Number(d);
            Number.isInteger(L) && L >= O.v && q(O, L + 1);
          }
          ii(c);
        }
        return true;
      },
      ownKeys(h) {
        B(c);
        var d = Reflect.ownKeys(h).filter((o) => {
          var a = n.get(o);
          return a === void 0 || a.v !== W;
        });
        for (var [p, w] of n)
          w.v !== W && !(p in h) && d.push(p);
        return d;
      },
      setPrototypeOf() {
        kr();
      }
    }
  );
}
function ii(t, e = 1) {
  q(t, t.v + e);
}
var ri, Di, $i, Ti;
function Pt() {
  if (ri === void 0) {
    ri = window, Di = /Firefox/.test(navigator.userAgent);
    var t = Element.prototype, e = Node.prototype;
    $i = Fe(e, "firstChild").get, Ti = Fe(e, "nextSibling").get, t.__click = void 0, t.__className = void 0, t.__attributes = null, t.__styles = null, t.__e = void 0, Text.prototype.__t = void 0;
  }
}
function Ri(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function mt(t) {
  return $i.call(t);
}
// @__NO_SIDE_EFFECTS__
function kt(t) {
  return Ti.call(t);
}
function Ot(t, e) {
  if (!Q)
    return /* @__PURE__ */ mt(t);
  var i = (
    /** @type {TemplateNode} */
    /* @__PURE__ */ mt(z)
  );
  return i === null && (i = z.appendChild(Ri())), wt(i), i;
}
function Lr(t) {
  t.textContent = "";
}
let ut = false, gt = false, _t = null, ct = false, jt = false;
function ni(t) {
  jt = t;
}
let Ge = [];
let S = null, X = false;
function pe(t) {
  S = t;
}
let $ = null;
function ve(t) {
  $ = t;
}
let se = null;
function Mr(t) {
  se = t;
}
let P = null, K = 0, ue = null;
function Fr(t) {
  ue = t;
}
let Ai = 1, xt = 0, be = false;
function Oi() {
  return ++Ai;
}
function St(t) {
  var _a2;
  var e = t.f;
  if ((e & ge) !== 0)
    return true;
  if ((e & Pe) !== 0) {
    var i = t.deps, r = (e & j) !== 0;
    if (i !== null) {
      var n, s, c = (e & ht) !== 0, f = r && $ !== null && !be, h = i.length;
      if (c || f) {
        var d = (
          /** @type {Derived} */
          t
        ), p = d.parent;
        for (n = 0; n < h; n++)
          s = i[n], (c || !((_a2 = s == null ? void 0 : s.reactions) == null ? void 0 : _a2.includes(d))) && (s.reactions ?? (s.reactions = [])).push(d);
        c && (d.f ^= ht), f && p !== null && (p.f & j) === 0 && (d.f ^= j);
      }
      for (n = 0; n < h; n++)
        if (s = i[n], St(
          /** @type {Derived} */
          s
        ) && ki(
          /** @type {Derived} */
          s
        ), s.wv > t.wv)
          return true;
    }
    (!r || $ !== null && !be) && ce(t, H);
  }
  return false;
}
function Nr(t, e) {
  for (var i = e; i !== null; ) {
    if ((i.f & ft) !== 0)
      try {
        i.fn(t);
        return;
      } catch {
        i.f ^= ft;
      }
    i = i.parent;
  }
  throw ut = false, t;
}
function Pr(t) {
  return (t.f & Et) === 0 && (t.parent === null || (t.parent.f & ft) === 0);
}
function Dt(t, e, i, r) {
  if (ut) {
    if (i === null && (ut = false), Pr(e))
      throw t;
    return;
  }
  i !== null && (ut = true);
  {
    Nr(t, e);
    return;
  }
}
function Li(t, e, i = true) {
  var r = t.reactions;
  if (r !== null)
    for (var n = 0; n < r.length; n++) {
      var s = r[n];
      (s.f & Z) !== 0 ? Li(
        /** @type {Derived} */
        s,
        e,
        false
      ) : e === s && (i ? ce(s, ge) : (s.f & H) !== 0 && ce(s, Pe), Yt(
        /** @type {Effect} */
        s
      ));
    }
}
function Mi(t) {
  var _a2;
  var e = P, i = K, r = ue, n = S, s = be, c = se, f = U, h = X, d = t.f;
  P = /** @type {null | Value[]} */
  null, K = 0, ue = null, be = (d & j) !== 0 && (X || !ct || S === null), S = (d & (me | Ne)) === 0 ? t : null, se = null, si(t.ctx), X = false, xt++;
  try {
    var p = (
      /** @type {Function} */
      (0, t.fn)()
    ), w = t.deps;
    if (P !== null) {
      var o;
      if (yt(t, K), w !== null && K > 0)
        for (w.length = K + P.length, o = 0; o < P.length; o++)
          w[K + o] = P[o];
      else
        t.deps = w = P;
      if (!be)
        for (o = K; o < w.length; o++)
          ((_a2 = w[o]).reactions ?? (_a2.reactions = [])).push(t);
    } else w !== null && K < w.length && (yt(t, K), w.length = K);
    if (qi() && ue !== null && !X && w !== null && (t.f & (Z | Pe | ge)) === 0)
      for (o = 0; o < /** @type {Source[]} */
      ue.length; o++)
        Li(
          ue[o],
          /** @type {Effect} */
          t
        );
    return n !== null && xt++, p;
  } finally {
    P = e, K = i, ue = r, S = n, be = s, se = c, si(f), X = h;
  }
}
function Br(t, e) {
  let i = e.reactions;
  if (i !== null) {
    var r = fr.call(i, t);
    if (r !== -1) {
      var n = i.length - 1;
      n === 0 ? i = e.reactions = null : (i[r] = i[n], i.pop());
    }
  }
  i === null && (e.f & Z) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (P === null || !P.includes(e)) && (ce(e, Pe), (e.f & (j | ht)) === 0 && (e.f ^= ht), Ei(
    /** @type {Derived} **/
    e
  ), yt(
    /** @type {Derived} **/
    e,
    0
  ));
}
function yt(t, e) {
  var i = t.deps;
  if (i !== null)
    for (var r = e; r < i.length; r++)
      Br(t, i[r]);
}
function Gt(t) {
  var e = t.f;
  if ((e & Et) === 0) {
    ce(t, H);
    var i = $, r = U, n = ct;
    $ = t, ct = true;
    try {
      (e & qt) !== 0 ? Qr(t) : Bi(t), Pi(t);
      var s = Mi(t);
      t.teardown = typeof s == "function" ? s : null, t.wv = Ai;
      var c = t.deps, f;
      ei && $r && t.f & ge;
    } catch (h) {
      Dt(h, t, i, r || t.ctx);
    } finally {
      ct = n, $ = i;
    }
  }
}
function Ur() {
  try {
    yr();
  } catch (t) {
    if (_t !== null)
      Dt(t, _t, null);
    else
      throw t;
  }
}
function Fi() {
  try {
    for (var t = 0; Ge.length > 0; ) {
      t++ > 1e3 && Ur();
      var e = Ge, i = e.length;
      Ge = [];
      for (var r = 0; r < i; r++) {
        var n = e[r];
        (n.f & H) === 0 && (n.f ^= H);
        var s = Ir(n);
        zr(s);
      }
    }
  } finally {
    gt = false, _t = null;
  }
}
function zr(t) {
  var e = t.length;
  if (e !== 0)
    for (var i = 0; i < e; i++) {
      var r = t[i];
      if ((r.f & (Et | bt)) === 0)
        try {
          St(r) && (Gt(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null ? Ui(r) : r.fn = null));
        } catch (n) {
          Dt(n, r, null, r.ctx);
        }
    }
}
function Yt(t) {
  gt || (gt = true, queueMicrotask(Fi));
  for (var e = _t = t; e.parent !== null; ) {
    e = e.parent;
    var i = e.f;
    if ((i & (Ne | me)) !== 0) {
      if ((i & H) === 0) return;
      e.f ^= H;
    }
  }
  Ge.push(e);
}
function Ir(t) {
  for (var e = [], i = t.first; i !== null; ) {
    var r = i.f, n = (r & me) !== 0, s = n && (r & H) !== 0;
    if (!s && (r & bt) === 0) {
      if ((r & hi) !== 0)
        e.push(i);
      else if (n)
        i.f ^= H;
      else {
        var c = S;
        try {
          S = i, St(i) && Gt(i);
        } catch (d) {
          Dt(d, i, null, i.ctx);
        } finally {
          S = c;
        }
      }
      var f = i.first;
      if (f !== null) {
        i = f;
        continue;
      }
    }
    var h = i.parent;
    for (i = i.next; i === null && h !== null; )
      i = h.next, h = h.parent;
  }
  return e;
}
function Ke(t) {
  var e;
  for (ti(); Ge.length > 0; )
    gt = true, Fi(), ti();
  return (
    /** @type {T} */
    e
  );
}
function B(t) {
  var e = t.f, i = (e & Z) !== 0;
  if (S !== null && !X) {
    se !== null && se.includes(t) && Sr();
    var r = S.deps;
    t.rv < xt && (t.rv = xt, P === null && r !== null && r[K] === t ? K++ : P === null ? P = [t] : (!be || !P.includes(t)) && P.push(t));
  } else if (i && /** @type {Derived} */
  t.deps === null && /** @type {Derived} */
  t.effects === null) {
    var n = (
      /** @type {Derived} */
      t
    ), s = n.parent;
    s !== null && (s.f & j) === 0 && (n.f ^= j);
  }
  return i && (n = /** @type {Derived} */
  t, St(n) && ki(n)), t.v;
}
function Ze(t) {
  var e = X;
  try {
    return X = true, t();
  } finally {
    X = e;
  }
}
const Wr = -7169;
function ce(t, e) {
  t.f = t.f & Wr | e;
}
function Kr(t) {
  $ === null && S === null && xr(), S !== null && (S.f & j) !== 0 && $ === null && _r(), jt && gr();
}
function qr(t, e) {
  var i = e.last;
  i === null ? e.last = e.first = t : (i.next = t, t.prev = i, e.last = t);
}
function ke(t, e, i, r = true) {
  var n = (t & Ne) !== 0, s = $, c = {
    ctx: U,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: t | ge,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: n ? null : s,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0
  };
  if (i)
    try {
      Gt(c), c.f |= lr;
    } catch (d) {
      throw we(c), d;
    }
  else e !== null && Yt(c);
  var f = i && c.deps === null && c.first === null && c.nodes_start === null && c.teardown === null && (c.f & (bi | ft)) === 0;
  if (!f && !n && r && (s !== null && qr(c, s), S !== null && (S.f & Z) !== 0)) {
    var h = (
      /** @type {Derived} */
      S
    );
    (h.effects ?? (h.effects = [])).push(c);
  }
  return c;
}
function Hr(t) {
  const e = ke(Ct, null, false);
  return ce(e, H), e.teardown = t, e;
}
function Vr(t) {
  Kr();
  var e = $ !== null && ($.f & me) !== 0 && U !== null && !U.m;
  if (e) {
    var i = (
      /** @type {ComponentContext} */
      U
    );
    (i.e ?? (i.e = [])).push({
      fn: t,
      effect: $,
      reaction: S
    });
  } else {
    var r = Xt(t);
    return r;
  }
}
function jr(t) {
  const e = ke(Ne, t, true);
  return () => {
    we(e);
  };
}
function Gr(t) {
  const e = ke(Ne, t, true);
  return (i = {}) => new Promise((r) => {
    i.outro ? Jr(e, () => {
      we(e), r(void 0);
    }) : (we(e), r(void 0));
  });
}
function Xt(t) {
  return ke(hi, t, false);
}
function Ni(t) {
  return ke(Ct, t, true);
}
function Yr(t, e = [], i = Ci) {
  const r = e.map(i);
  return Xr(() => t(...r.map(B)));
}
function Xr(t, e = 0) {
  return ke(Ct | qt | e, t, true);
}
function Zr(t, e = true) {
  return ke(Ct | me, t, true, e);
}
function Pi(t) {
  var e = t.teardown;
  if (e !== null) {
    const i = jt, r = S;
    ni(true), pe(null);
    try {
      e.call(null);
    } finally {
      ni(i), pe(r);
    }
  }
}
function Bi(t, e = false) {
  var i = t.first;
  for (t.first = t.last = null; i !== null; ) {
    var r = i.next;
    we(i, e), i = r;
  }
}
function Qr(t) {
  for (var e = t.first; e !== null; ) {
    var i = e.next;
    (e.f & me) === 0 && we(e), e = i;
  }
}
function we(t, e = true) {
  var i = false;
  if ((e || (t.f & cr) !== 0) && t.nodes_start !== null) {
    for (var r = t.nodes_start, n = t.nodes_end; r !== null; ) {
      var s = r === n ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ kt(r)
      );
      r.remove(), r = s;
    }
    i = true;
  }
  Bi(t, e && !i), yt(t, 0), ce(t, Et);
  var c = t.transitions;
  if (c !== null)
    for (const h of c)
      h.stop();
  Pi(t);
  var f = t.parent;
  f !== null && f.first !== null && Ui(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = null;
}
function Ui(t) {
  var e = t.parent, i = t.prev, r = t.next;
  i !== null && (i.next = r), r !== null && (r.prev = i), e !== null && (e.first === t && (e.first = r), e.last === t && (e.last = i));
}
function Jr(t, e) {
  var i = [];
  zi(t, i, true), en(i, () => {
    we(t), e && e();
  });
}
function en(t, e) {
  var i = t.length;
  if (i > 0) {
    var r = () => --i || e();
    for (var n of t)
      n.out(r);
  } else
    e();
}
function zi(t, e, i) {
  if ((t.f & bt) === 0) {
    if (t.f ^= bt, t.transitions !== null)
      for (const c of t.transitions)
        (c.is_global || i) && e.push(c);
    for (var r = t.first; r !== null; ) {
      var n = r.next, s = (r.f & ur) !== 0 || (r.f & me) !== 0;
      zi(r, e, s ? i : false), r = n;
    }
  }
}
function Ii(t) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
let U = null;
function si(t) {
  U = t;
}
function Wi(t, e = false, i) {
  U = {
    p: U,
    c: null,
    e: null,
    m: false,
    s: t,
    x: null,
    l: null
  };
}
function Ki(t) {
  const e = U;
  if (e !== null) {
    t !== void 0 && (e.x = t);
    const c = e.e;
    if (c !== null) {
      var i = $, r = S;
      e.e = null;
      try {
        for (var n = 0; n < c.length; n++) {
          var s = c[n];
          ve(s.effect), pe(s.reaction), Xt(s.fn);
        }
      } finally {
        ve(i), pe(r);
      }
    }
    U = e.p, e.m = true;
  }
  return t || /** @type {T} */
  {};
}
function qi() {
  return true;
}
const tn = ["touchstart", "touchmove"];
function rn(t) {
  return tn.includes(t);
}
function nn(t) {
  var e = S, i = $;
  pe(null), ve(null);
  try {
    return t();
  } finally {
    pe(e), ve(i);
  }
}
const Hi = /* @__PURE__ */ new Set(), Bt = /* @__PURE__ */ new Set();
function sn(t, e, i, r = {}) {
  function n(s) {
    if (r.capture || qe.call(e, s), !s.cancelBubble)
      return nn(() => i == null ? void 0 : i.call(this, s));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? Ht(() => {
    e.addEventListener(t, n, r);
  }) : e.addEventListener(t, n, r), n;
}
function st(t, e, i, r, n) {
  var s = { capture: r, passive: n }, c = sn(t, e, i, s);
  (e === document.body || e === window || e === document) && Hr(() => {
    e.removeEventListener(t, c, s);
  });
}
function on(t) {
  for (var e = 0; e < t.length; e++)
    Hi.add(t[e]);
  for (var i of Bt)
    i(t);
}
function qe(t) {
  var _a2;
  var e = this, i = (
    /** @type {Node} */
    e.ownerDocument
  ), r = t.type, n = ((_a2 = t.composedPath) == null ? void 0 : _a2.call(t)) || [], s = (
    /** @type {null | Element} */
    n[0] || t.target
  ), c = 0, f = t.__root;
  if (f) {
    var h = n.indexOf(f);
    if (h !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t.__root = e;
      return;
    }
    var d = n.indexOf(e);
    if (d === -1)
      return;
    h <= d && (c = h);
  }
  if (s = /** @type {Element} */
  n[c] || t.target, s !== e) {
    vt(t, "currentTarget", {
      configurable: true,
      get() {
        return s || i;
      }
    });
    var p = S, w = $;
    pe(null), ve(null);
    try {
      for (var o, a = []; s !== null; ) {
        var l = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var u = s["__" + r];
          if (u !== void 0 && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === s))
            if (pi(u)) {
              var [b, ...O] = u;
              b.apply(s, [t, ...O]);
            } else
              u.call(s, t);
        } catch (L) {
          o ? a.push(L) : o = L;
        }
        if (t.cancelBubble || l === e || l === null)
          break;
        s = l;
      }
      if (o) {
        for (let L of a)
          queueMicrotask(() => {
            throw L;
          });
        throw o;
      }
    } finally {
      t.__root = e, delete t.currentTarget, pe(p), ve(w);
    }
  }
}
function an(t) {
  var e = document.createElement("template");
  return e.innerHTML = t, e.content;
}
function Ut(t, e) {
  var i = (
    /** @type {Effect} */
    $
  );
  i.nodes_start === null && (i.nodes_start = t, i.nodes_end = e);
}
// @__NO_SIDE_EFFECTS__
function ln(t, e) {
  var i = (e & sr) !== 0, r, n = !t.startsWith("<!>");
  return () => {
    if (Q)
      return Ut(z, null), z;
    r === void 0 && (r = an(n ? t : "<!>" + t), r = /** @type {Node} */
    /* @__PURE__ */ mt(r));
    var s = (
      /** @type {TemplateNode} */
      i || Di ? document.importNode(r, true) : r.cloneNode(true)
    );
    return Ut(s, s), s;
  };
}
function Vi(t, e) {
  if (Q) {
    $.nodes_end = z, Si();
    return;
  }
  t !== null && t.before(
    /** @type {Node} */
    e
  );
}
function ji(t, e) {
  return Gi(t, e);
}
function un(t, e) {
  Pt(), e.intro = e.intro ?? false;
  const i = e.target, r = Q, n = z;
  try {
    for (var s = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ mt(i)
    ); s && (s.nodeType !== 8 || /** @type {Comment} */
    s.data !== or); )
      s = /** @type {TemplateNode} */
      /* @__PURE__ */ kt(s);
    if (!s)
      throw je;
    nt(true), wt(
      /** @type {Comment} */
      s
    ), Si();
    const c = Gi(t, { ...e, anchor: s });
    if (z === null || z.nodeType !== 8 || /** @type {Comment} */
    z.data !== ar)
      throw Vt(), je;
    return nt(false), /**  @type {Exports} */
    c;
  } catch (c) {
    if (c === je)
      return e.recover === false && Cr(), Pt(), Lr(i), nt(false), ji(t, e);
    throw c;
  } finally {
    nt(r), wt(n);
  }
}
const Ae = /* @__PURE__ */ new Map();
function Gi(t, { target: e, anchor: i, props: r = {}, events: n, context: s, intro: c = true }) {
  Pt();
  var f = /* @__PURE__ */ new Set(), h = (w) => {
    for (var o = 0; o < w.length; o++) {
      var a = w[o];
      if (!f.has(a)) {
        f.add(a);
        var l = rn(a);
        e.addEventListener(a, qe, { passive: l });
        var u = Ae.get(a);
        u === void 0 ? (document.addEventListener(a, qe, { passive: l }), Ae.set(a, 1)) : Ae.set(a, u + 1);
      }
    }
  };
  h(hr(Hi)), Bt.add(h);
  var d = void 0, p = Gr(() => {
    var w = i ?? e.appendChild(Ri());
    return Zr(() => {
      if (s) {
        Wi({});
        var o = (
          /** @type {ComponentContext} */
          U
        );
        o.c = s;
      }
      n && (r.$$events = n), Q && Ut(
        /** @type {TemplateNode} */
        w,
        null
      ), d = t(w, r) || {}, Q && ($.nodes_end = z), s && Ki();
    }), () => {
      var _a2;
      for (var o of f) {
        e.removeEventListener(o, qe);
        var a = (
          /** @type {number} */
          Ae.get(o)
        );
        --a === 0 ? (document.removeEventListener(o, qe), Ae.delete(o)) : Ae.set(o, a);
      }
      Bt.delete(h), w !== i && ((_a2 = w.parentNode) == null ? void 0 : _a2.removeChild(w));
    };
  });
  return zt.set(d, p), d;
}
let zt = /* @__PURE__ */ new WeakMap();
function cn(t, e) {
  const i = zt.get(t);
  return i ? (zt.delete(t), i(e)) : Promise.resolve();
}
function dn(t, e) {
  Ht(() => {
    var i = t.getRootNode(), r = (
      /** @type {ShadowRoot} */
      i.host ? (
        /** @type {ShadowRoot} */
        i
      ) : (
        /** @type {Document} */
        i.head ?? /** @type {Document} */
        i.ownerDocument.head
      )
    );
    if (!r.querySelector("#" + e.hash)) {
      const n = document.createElement("style");
      n.id = e.hash, n.textContent = e.code, r.appendChild(n);
    }
  });
}
const oi = [...` 	
\r\f\xA0\v\uFEFF`];
function fn(t, e, i) {
  var r = t == null ? "" : "" + t;
  if (r = r ? r + " " + e : e, i) {
    for (var n in i)
      if (i[n])
        r = r ? r + " " + n : n;
      else if (r.length)
        for (var s = n.length, c = 0; (c = r.indexOf(n, c)) >= 0; ) {
          var f = c + s;
          (c === 0 || oi.includes(r[c - 1])) && (f === r.length || oi.includes(r[f])) ? r = (c === 0 ? "" : r.substring(0, c)) + r.substring(f + 1) : c = f;
        }
  }
  return r === "" ? null : r;
}
function hn(t, e, i, r, n, s) {
  var c = t.__className;
  if (Q || c !== i) {
    var f = fn(i, r, s);
    (!Q || f !== t.getAttribute("class")) && (f == null ? t.removeAttribute("class") : t.className = f), t.__className = i;
  } else if (s)
    for (var h in s) {
      var d = !!s[h];
      (n == null || d !== !!n[h]) && t.classList.toggle(h, d);
    }
  return s;
}
function ai(t, e, i, r) {
  var n = t.__attributes ?? (t.__attributes = {});
  Q && (n[e] = t.getAttribute(e)), n[e] !== (n[e] = i) && ("__styles" in t && (t.__styles = {}), i == null ? t.removeAttribute(e) : typeof i != "string" && bn(t).includes(e) ? t[e] = i : t.setAttribute(e, i));
}
var li = /* @__PURE__ */ new Map();
function bn(t) {
  var e = li.get(t.nodeName);
  if (e) return e;
  li.set(t.nodeName, e = []);
  for (var i, r = t, n = Element.prototype; n !== r; ) {
    i = br(r);
    for (var s in i)
      i[s].set && e.push(s);
    r = vi(r);
  }
  return e;
}
function ui(t, e) {
  return t === e || (t == null ? void 0 : t[at]) === e;
}
function Lt(t = {}, e, i, r) {
  return Xt(() => {
    var n, s;
    return Ni(() => {
      n = s, s = [], Ze(() => {
        t !== i(...s) && (e(t, ...s), n && ui(i(...n), t) && e(null, ...n));
      });
    }), () => {
      Ht(() => {
        s && ui(i(...s), t) && e(null, ...s);
      });
    };
  }), t;
}
function Yi(t) {
  U === null && Ii(), Vr(() => {
    const e = Ze(t);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
function pn(t) {
  U === null && Ii(), Yi(() => () => Ze(t));
}
function vn(t, e, i) {
  if (t == null)
    return e(void 0), lt;
  const r = Ze(
    () => t.subscribe(
      e,
      // @ts-expect-error
      i
    )
  );
  return r.unsubscribe ? () => r.unsubscribe() : r;
}
const Oe = [];
function Xi(t, e = lt) {
  let i = null;
  const r = /* @__PURE__ */ new Set();
  function n(f) {
    if (_i(t, f) && (t = f, i)) {
      const h = !Oe.length;
      for (const d of r)
        d[1](), Oe.push(d, t);
      if (h) {
        for (let d = 0; d < Oe.length; d += 2)
          Oe[d][0](Oe[d + 1]);
        Oe.length = 0;
      }
    }
  }
  function s(f) {
    n(f(
      /** @type {T} */
      t
    ));
  }
  function c(f, h = lt) {
    const d = [f, h];
    return r.add(d), r.size === 1 && (i = e(n, s) || lt), f(
      /** @type {T} */
      t
    ), () => {
      r.delete(d), r.size === 0 && i && (i(), i = null);
    };
  }
  return { set: n, update: s, subscribe: c };
}
function Zi(t) {
  let e;
  return vn(t, (i) => e = i)(), e;
}
function ot(t, e, i, r) {
  var n;
  n = /** @type {V} */
  t[e];
  var s = (
    /** @type {V} */
    r
  ), c = true, f = false, h = () => (f = true, c && (c = false, s = /** @type {V} */
  r), s), d;
  d = () => {
    var a = (
      /** @type {V} */
      t[e]
    );
    return a === void 0 ? h() : (c = true, f = false, a);
  };
  var p = false, w = /* @__PURE__ */ xi(n), o = /* @__PURE__ */ Ci(() => {
    var a = d(), l = B(w);
    return p ? (p = false, l) : w.v = a;
  });
  return function(a, l) {
    if (arguments.length > 0) {
      const u = l ? B(o) : a;
      return o.equals(u) || (p = true, q(w, u), f && s !== void 0 && (s = u), Ze(() => B(o))), a;
    }
    return B(o);
  };
}
function wn(t) {
  return new mn(t);
}
class mn {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(e) {
    /** @type {any} */
    __privateAdd(this, _t2);
    /** @type {Record<string, any>} */
    __privateAdd(this, _e);
    var _a2;
    var i = /* @__PURE__ */ new Map(), r = (s, c) => {
      var f = /* @__PURE__ */ xi(c);
      return i.set(s, f), f;
    };
    const n = new Proxy(
      { ...e.props || {}, $$events: {} },
      {
        get(s, c) {
          return B(i.get(c) ?? r(c, Reflect.get(s, c)));
        },
        has(s, c) {
          return c === dr ? true : (B(i.get(c) ?? r(c, Reflect.get(s, c))), Reflect.has(s, c));
        },
        set(s, c, f) {
          return q(i.get(c) ?? r(c, f), f), Reflect.set(s, c, f);
        }
      }
    );
    __privateSet(this, _e, (e.hydrate ? un : ji)(e.component, {
      target: e.target,
      anchor: e.anchor,
      props: n,
      context: e.context,
      intro: e.intro ?? false,
      recover: e.recover
    })), (!((_a2 = e == null ? void 0 : e.props) == null ? void 0 : _a2.$$host) || e.sync === false) && Ke(), __privateSet(this, _t2, n.$$events);
    for (const s of Object.keys(__privateGet(this, _e)))
      s === "$set" || s === "$destroy" || s === "$on" || vt(this, s, {
        get() {
          return __privateGet(this, _e)[s];
        },
        /** @param {any} value */
        set(c) {
          __privateGet(this, _e)[s] = c;
        },
        enumerable: true
      });
    __privateGet(this, _e).$set = /** @param {Record<string, any>} next */
    (s) => {
      Object.assign(n, s);
    }, __privateGet(this, _e).$destroy = () => {
      cn(__privateGet(this, _e));
    };
  }
  /** @param {Record<string, any>} props */
  $set(e) {
    __privateGet(this, _e).$set(e);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(e, i) {
    __privateGet(this, _t2)[e] = __privateGet(this, _t2)[e] || [];
    const r = (...n) => i.call(this, ...n);
    return __privateGet(this, _t2)[e].push(r), () => {
      __privateGet(this, _t2)[e] = __privateGet(this, _t2)[e].filter(
        /** @param {any} fn */
        (n) => n !== r
      );
    };
  }
  $destroy() {
    __privateGet(this, _e).$destroy();
  }
}
_t2 = new WeakMap();
_e = new WeakMap();
let Qi;
typeof HTMLElement == "function" && (Qi = class extends HTMLElement {
  /**
   * @param {*} $$componentCtor
   * @param {*} $$slots
   * @param {*} use_shadow_dom
   */
  constructor(t, e, i) {
    super();
    /** The Svelte component constructor */
    __publicField(this, "$$ctor");
    /** Slots */
    __publicField(this, "$$s");
    /** @type {any} The Svelte component instance */
    __publicField(this, "$$c");
    /** Whether or not the custom element is connected */
    __publicField(this, "$$cn", false);
    /** @type {Record<string, any>} Component props data */
    __publicField(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    __publicField(this, "$$r", false);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    __publicField(this, "$$p_d", {});
    /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
    __publicField(this, "$$l", {});
    /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
    __publicField(this, "$$l_u", /* @__PURE__ */ new Map());
    /** @type {any} The managed render effect for reflecting attributes */
    __publicField(this, "$$me");
    this.$$ctor = t, this.$$s = e, i && this.attachShadow({ mode: "open" });
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  addEventListener(t, e, i) {
    if (this.$$l[t] = this.$$l[t] || [], this.$$l[t].push(e), this.$$c) {
      const r = this.$$c.$on(t, e);
      this.$$l_u.set(e, r);
    }
    super.addEventListener(t, e, i);
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  removeEventListener(t, e, i) {
    if (super.removeEventListener(t, e, i), this.$$c) {
      const r = this.$$l_u.get(e);
      r && (r(), this.$$l_u.delete(e));
    }
  }
  async connectedCallback() {
    if (this.$$cn = true, !this.$$c) {
      let t = function(r) {
        return (n) => {
          const s = document.createElement("slot");
          r !== "default" && (s.name = r), Vi(n, s);
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const e = {}, i = gn(this);
      for (const r of this.$$s)
        r in i && (r === "default" && !this.$$d.children ? (this.$$d.children = t(r), e.default = true) : e[r] = t(r));
      for (const r of this.attributes) {
        const n = this.$$g_p(r.name);
        n in this.$$d || (this.$$d[n] = dt(n, r.value, this.$$p_d, "toProp"));
      }
      for (const r in this.$$p_d)
        !(r in this.$$d) && this[r] !== void 0 && (this.$$d[r] = this[r], delete this[r]);
      this.$$c = wn({
        component: this.$$ctor,
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: e,
          $$host: this
        }
      }), this.$$me = jr(() => {
        Ni(() => {
          var _a2;
          this.$$r = true;
          for (const r of pt(this.$$c)) {
            if (!((_a2 = this.$$p_d[r]) == null ? void 0 : _a2.reflect)) continue;
            this.$$d[r] = this.$$c[r];
            const n = dt(
              r,
              this.$$d[r],
              this.$$p_d,
              "toAttribute"
            );
            n == null ? this.removeAttribute(this.$$p_d[r].attribute || r) : this.setAttribute(this.$$p_d[r].attribute || r, n);
          }
          this.$$r = false;
        });
      });
      for (const r in this.$$l)
        for (const n of this.$$l[r]) {
          const s = this.$$c.$on(r, n);
          this.$$l_u.set(n, s);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  /**
   * @param {string} attr
   * @param {string} _oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(t, e, i) {
    var _a2;
    this.$$r || (t = this.$$g_p(t), this.$$d[t] = dt(t, i, this.$$p_d, "toProp"), (_a2 = this.$$c) == null ? void 0 : _a2.$set({ [t]: this.$$d[t] }));
  }
  disconnectedCallback() {
    this.$$cn = false, Promise.resolve().then(() => {
      !this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
    });
  }
  /**
   * @param {string} attribute_name
   */
  $$g_p(t) {
    return pt(this.$$p_d).find(
      (e) => this.$$p_d[e].attribute === t || !this.$$p_d[e].attribute && e.toLowerCase() === t
    ) || t;
  }
});
function dt(t, e, i, r) {
  var _a2;
  const n = (_a2 = i[t]) == null ? void 0 : _a2.type;
  if (e = n === "Boolean" && typeof e != "boolean" ? e != null : e, !r || !i[t])
    return e;
  if (r === "toAttribute")
    switch (n) {
      case "Object":
      case "Array":
        return e == null ? null : JSON.stringify(e);
      case "Boolean":
        return e ? "" : null;
      case "Number":
        return e ?? null;
      default:
        return e;
    }
  else
    switch (n) {
      case "Object":
      case "Array":
        return e && JSON.parse(e);
      case "Boolean":
        return e;
      // conversion already handled above
      case "Number":
        return e != null ? +e : e;
      default:
        return e;
    }
}
function gn(t) {
  const e = {};
  return t.childNodes.forEach((i) => {
    e[
      /** @type {Element} node */
      i.slot || "default"
    ] = true;
  }), e;
}
function _n(t, e, i, r, n, s) {
  let c = class extends Qi {
    constructor() {
      super(t, i, n), this.$$p_d = e;
    }
    static get observedAttributes() {
      return pt(e).map(
        (f) => (e[f].attribute || f).toLowerCase()
      );
    }
  };
  return pt(e).forEach((f) => {
    vt(c.prototype, f, {
      get() {
        return this.$$c && f in this.$$c ? this.$$c[f] : this.$$d[f];
      },
      set(h) {
        var _a2;
        h = dt(f, h, e), this.$$d[f] = h;
        var d = this.$$c;
        if (d) {
          var p = (_a2 = Fe(d, f)) == null ? void 0 : _a2.get;
          p ? d[f] = h : d.$set({ [f]: h });
        }
      }
    });
  }), r.forEach((f) => {
    vt(c.prototype, f, {
      get() {
        var _a2;
        return (_a2 = this.$$c) == null ? void 0 : _a2[f];
      }
    });
  }), s && (c = s(c)), t.element = /** @type {any} */
  c, c;
}
class xn {
  constructor() {
    __publicField(this, "verbose", false);
  }
  info(e) {
    this.verbose && console.log(e);
  }
  error(e, i) {
    this.verbose && console.error(e, i);
  }
}
const F = new xn();
function yn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var He = { exports: {} }, Cn = He.exports, ci;
function En() {
  return ci || (ci = 1, function(t, e) {
    (function(i, r) {
      var n = "1.0.40", s = "", c = "?", f = "function", h = "undefined", d = "object", p = "string", w = "major", o = "model", a = "name", l = "type", u = "vendor", b = "version", O = "architecture", L = "console", g = "mobile", _ = "tablet", R = "smarttv", V = "wearable", Be = "embedded", Ue = 500, Se = "Amazon", G = "Apple", Qe = "ASUS", Je = "BlackBerry", De = "Browser", $e = "Chrome", ze = "Edge", Te = "Firefox", _e2 = "Google", et = "Huawei", Ie = "LG", xe = "Microsoft", tt = "Motorola", de = "Opera", J = "Samsung", fe = "Sharp", ye = "Sony", Ce = "Xiaomi", I = "Zebra", v = "Facebook", k = "Chromium OS", A = "Mac OS", T = " Browser", N = function(y, C) {
        var x = {};
        for (var D in y)
          C[D] && C[D].length % 2 === 0 ? x[D] = C[D].concat(y[D]) : x[D] = y[D];
        return x;
      }, M = function(y) {
        for (var C = {}, x = 0; x < y.length; x++)
          C[y[x].toUpperCase()] = y[x];
        return C;
      }, oe = function(y, C) {
        return typeof y === p ? ae(C).indexOf(ae(y)) !== -1 : false;
      }, ae = function(y) {
        return y.toLowerCase();
      }, ir = function(y) {
        return typeof y === p ? y.replace(/[^\d\.]/g, s).split(".")[0] : r;
      }, $t = function(y, C) {
        if (typeof y === p)
          return y = y.replace(/^\s\s*/, s), typeof C === h ? y : y.substring(0, Ue);
      }, We = function(y, C) {
        for (var x = 0, D, le, ee, E, m, te; x < C.length && !m; ) {
          var Tt = C[x], Jt = C[x + 1];
          for (D = le = 0; D < Tt.length && !m && Tt[D]; )
            if (m = Tt[D++].exec(y), m)
              for (ee = 0; ee < Jt.length; ee++)
                te = m[++le], E = Jt[ee], typeof E === d && E.length > 0 ? E.length === 2 ? typeof E[1] == f ? this[E[0]] = E[1].call(this, te) : this[E[0]] = E[1] : E.length === 3 ? typeof E[1] === f && !(E[1].exec && E[1].test) ? this[E[0]] = te ? E[1].call(this, te, E[2]) : r : this[E[0]] = te ? te.replace(E[1], E[2]) : r : E.length === 4 && (this[E[0]] = te ? E[3].call(this, te.replace(E[1], E[2])) : r) : this[E] = te || r;
          x += 2;
        }
      }, it = function(y, C) {
        for (var x in C)
          if (typeof C[x] === d && C[x].length > 0) {
            for (var D = 0; D < C[x].length; D++)
              if (oe(C[x][D], y))
                return x === c ? r : x;
          } else if (oe(C[x], y))
            return x === c ? r : x;
        return C.hasOwnProperty("*") ? C["*"] : y;
      }, rr = {
        "1.0": "/8",
        "1.2": "/1",
        "1.3": "/3",
        "2.0": "/412",
        "2.0.2": "/416",
        "2.0.3": "/417",
        "2.0.4": "/419",
        "?": "/"
      }, Zt = {
        ME: "4.90",
        "NT 3.11": "NT3.51",
        "NT 4.0": "NT4.0",
        2e3: "NT 5.0",
        XP: ["NT 5.1", "NT 5.2"],
        Vista: "NT 6.0",
        7: "NT 6.1",
        8: "NT 6.2",
        "8.1": "NT 6.3",
        10: ["NT 6.4", "NT 10.0"],
        RT: "ARM"
      }, Qt = {
        browser: [
          [
            /\b(?:crmo|crios)\/([\w\.]+)/i
            // Chrome for Android/iOS
          ],
          [b, [a, "Chrome"]],
          [
            /edg(?:e|ios|a)?\/([\w\.]+)/i
            // Microsoft Edge
          ],
          [b, [a, "Edge"]],
          [
            // Presto based
            /(opera mini)\/([-\w\.]+)/i,
            // Opera Mini
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
            // Opera Mobi/Tablet
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
            // Opera
          ],
          [a, b],
          [
            /opios[\/ ]+([\w\.]+)/i
            // Opera mini on iphone >= 8.0
          ],
          [b, [a, de + " Mini"]],
          [
            /\bop(?:rg)?x\/([\w\.]+)/i
            // Opera GX
          ],
          [b, [a, de + " GX"]],
          [
            /\bopr\/([\w\.]+)/i
            // Opera Webkit
          ],
          [b, [a, de]],
          [
            // Mixed
            /\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i
            // Baidu
          ],
          [b, [a, "Baidu"]],
          [
            /\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i
            // Maxthon
          ],
          [b, [a, "Maxthon"]],
          [
            /(kindle)\/([\w\.]+)/i,
            // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,
            // Lunascape/Maxthon/Netfront/Jasmine/Blazer/Sleipnir
            // Trident based
            /(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i,
            // Avant/IEMobile/SlimBrowser/SlimBoat/Slimjet
            /(?:ms|\()(ie) ([\w\.]+)/i,
            // Internet Explorer
            // Blink/Webkit/KHTML based                                         // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w\.]+)/i,
            // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ//Vivaldi/DuckDuckGo/Klar/Helio/Dragon
            /(heytap|ovi|115)browser\/([\d\.]+)/i,
            // HeyTap/Ovi/115
            /(weibo)__([\d\.]+)/i
            // Weibo
          ],
          [a, b],
          [
            /quark(?:pc)?\/([-\w\.]+)/i
            // Quark
          ],
          [b, [a, "Quark"]],
          [
            /\bddg\/([\w\.]+)/i
            // DuckDuckGo
          ],
          [b, [a, "DuckDuckGo"]],
          [
            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
            // UCBrowser
          ],
          [b, [a, "UC" + De]],
          [
            /microm.+\bqbcore\/([\w\.]+)/i,
            // WeChat Desktop for Windows Built-in Browser
            /\bqbcore\/([\w\.]+).+microm/i,
            /micromessenger\/([\w\.]+)/i
            // WeChat
          ],
          [b, [a, "WeChat"]],
          [
            /konqueror\/([\w\.]+)/i
            // Konqueror
          ],
          [b, [a, "Konqueror"]],
          [
            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
            // IE11
          ],
          [b, [a, "IE"]],
          [
            /ya(?:search)?browser\/([\w\.]+)/i
            // Yandex
          ],
          [b, [a, "Yandex"]],
          [
            /slbrowser\/([\w\.]+)/i
            // Smart Lenovo Browser
          ],
          [b, [a, "Smart Lenovo " + De]],
          [
            /(avast|avg)\/([\w\.]+)/i
            // Avast/AVG Secure Browser
          ],
          [[a, /(.+)/, "$1 Secure " + De], b],
          [
            /\bfocus\/([\w\.]+)/i
            // Firefox Focus
          ],
          [b, [a, Te + " Focus"]],
          [
            /\bopt\/([\w\.]+)/i
            // Opera Touch
          ],
          [b, [a, de + " Touch"]],
          [
            /coc_coc\w+\/([\w\.]+)/i
            // Coc Coc Browser
          ],
          [b, [a, "Coc Coc"]],
          [
            /dolfin\/([\w\.]+)/i
            // Dolphin
          ],
          [b, [a, "Dolphin"]],
          [
            /coast\/([\w\.]+)/i
            // Opera Coast
          ],
          [b, [a, de + " Coast"]],
          [
            /miuibrowser\/([\w\.]+)/i
            // MIUI Browser
          ],
          [b, [a, "MIUI" + T]],
          [
            /fxios\/([\w\.-]+)/i
            // Firefox for iOS
          ],
          [b, [a, Te]],
          [
            /\bqihoobrowser\/?([\w\.]*)/i
            // 360
          ],
          [b, [a, "360"]],
          [
            /\b(qq)\/([\w\.]+)/i
            // QQ
          ],
          [[a, /(.+)/, "$1Browser"], b],
          [
            /(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i
          ],
          [[a, /(.+)/, "$1" + T], b],
          [
            // Oculus/Sailfish/HuaweiBrowser/VivoBrowser/PicoBrowser
            /samsungbrowser\/([\w\.]+)/i
            // Samsung Internet
          ],
          [b, [a, J + " Internet"]],
          [
            /metasr[\/ ]?([\d\.]+)/i
            // Sogou Explorer
          ],
          [b, [a, "Sogou Explorer"]],
          [
            /(sogou)mo\w+\/([\d\.]+)/i
            // Sogou Mobile
          ],
          [[a, "Sogou Mobile"], b],
          [
            /(electron)\/([\w\.]+) safari/i,
            // Electron-based App
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
            // Tesla
            /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i
            // QQ/2345
          ],
          [a, b],
          [
            /(lbbrowser|rekonq)/i,
            // LieBao Browser/Rekonq
            /\[(linkedin)app\]/i
            // LinkedIn App for iOS & Android
          ],
          [a],
          [
            /ome\/([\w\.]+) \w* ?(iron) saf/i,
            // Iron
            /ome\/([\w\.]+).+qihu (360)[es]e/i
            // 360
          ],
          [b, a],
          [
            // WebView
            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
            // Facebook App for iOS & Android
          ],
          [[a, v], b],
          [
            /(Klarna)\/([\w\.]+)/i,
            // Klarna Shopping Browser for iOS & Android
            /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
            // Kakao App
            /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
            // Naver InApp
            /safari (line)\/([\w\.]+)/i,
            // Line App for iOS
            /\b(line)\/([\w\.]+)\/iab/i,
            // Line App for Android
            /(alipay)client\/([\w\.]+)/i,
            // Alipay
            /(twitter)(?:and| f.+e\/([\w\.]+))/i,
            // Twitter
            /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i
            // Chromium/Instagram/Snapchat
          ],
          [a, b],
          [
            /\bgsa\/([\w\.]+) .*safari\//i
            // Google Search Appliance on iOS
          ],
          [b, [a, "GSA"]],
          [
            /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
            // TikTok
          ],
          [b, [a, "TikTok"]],
          [
            /headlesschrome(?:\/([\w\.]+)| )/i
            // Chrome Headless
          ],
          [b, [a, $e + " Headless"]],
          [
            / wv\).+(chrome)\/([\w\.]+)/i
            // Chrome WebView
          ],
          [[a, $e + " WebView"], b],
          [
            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
            // Android Browser
          ],
          [b, [a, "Android " + De]],
          [
            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
            // Chrome/OmniWeb/Arora/Tizen/Nokia
          ],
          [a, b],
          [
            /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
            // Mobile Safari
          ],
          [b, [a, "Mobile Safari"]],
          [
            /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
            // Safari & Safari Mobile
          ],
          [b, a],
          [
            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
            // Safari < 3.0
          ],
          [a, [b, it, rr]],
          [
            /(webkit|khtml)\/([\w\.]+)/i
          ],
          [a, b],
          [
            // Gecko based
            /(navigator|netscape\d?)\/([-\w\.]+)/i
            // Netscape
          ],
          [[a, "Netscape"], b],
          [
            /(wolvic|librewolf)\/([\w\.]+)/i
            // Wolvic/LibreWolf
          ],
          [a, b],
          [
            /mobile vr; rv:([\w\.]+)\).+firefox/i
            // Firefox Reality
          ],
          [b, [a, Te + " Reality"]],
          [
            /ekiohf.+(flow)\/([\w\.]+)/i,
            // Flow
            /(swiftfox)/i,
            // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i,
            // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
            // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(firefox)\/([\w\.]+)/i,
            // Other Firefox-based
            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
            // Mozilla
            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
            // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Obigo/Mosaic/Go/ICE/UP.Browser
            /(links) \(([\w\.]+)/i
            // Links
          ],
          [a, [b, /_/g, "."]],
          [
            /(cobalt)\/([\w\.]+)/i
            // Cobalt
          ],
          [a, [b, /master.|lts./, ""]]
        ],
        cpu: [
          [
            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
            // AMD64 (x64)
          ],
          [[O, "amd64"]],
          [
            /(ia32(?=;))/i
            // IA32 (quicktime)
          ],
          [[O, ae]],
          [
            /((?:i[346]|x)86)[;\)]/i
            // IA32 (x86)
          ],
          [[O, "ia32"]],
          [
            /\b(aarch64|arm(v?8e?l?|_?64))\b/i
            // ARM64
          ],
          [[O, "arm64"]],
          [
            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
            // ARMHF
          ],
          [[O, "armhf"]],
          [
            // PocketPC mistakenly identified as PowerPC
            /windows (ce|mobile); ppc;/i
          ],
          [[O, "arm"]],
          [
            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
            // PowerPC
          ],
          [[O, /ower/, s, ae]],
          [
            /(sun4\w)[;\)]/i
            // SPARC
          ],
          [[O, "sparc"]],
          [
            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
            // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
          ],
          [[O, ae]]
        ],
        device: [
          [
            //////////////////////////
            // MOBILES & TABLETS
            /////////////////////////
            // Samsung
            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
          ],
          [o, [u, J], [l, _]],
          [
            /\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
            /samsung[- ]((?!sm-[lr])[-\w]+)/i,
            /sec-(sgh\w+)/i
          ],
          [o, [u, J], [l, g]],
          [
            // Apple
            /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
            // iPod/iPhone
          ],
          [o, [u, G], [l, g]],
          [
            /\((ipad);[-\w\),; ]+apple/i,
            // iPad
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
          ],
          [o, [u, G], [l, _]],
          [
            /(macintosh);/i
          ],
          [o, [u, G]],
          [
            // Sharp
            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
          ],
          [o, [u, fe], [l, g]],
          [
            // Honor
            /(?:honor)([-\w ]+)[;\)]/i
          ],
          [o, [u, "Honor"], [l, g]],
          [
            // Huawei
            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
          ],
          [o, [u, et], [l, _]],
          [
            /(?:huawei)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
          ],
          [o, [u, et], [l, g]],
          [
            // Xiaomi
            /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
            // Xiaomi POCO
            /\b; (\w+) build\/hm\1/i,
            // Xiaomi Hongmi 'numeric' models
            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
            // Xiaomi Hongmi
            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
            // Xiaomi Redmi
            /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
            // Xiaomi Redmi 'numeric' models
            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i
            // Xiaomi Mi
          ],
          [[o, /_/g, " "], [u, Ce], [l, g]],
          [
            /oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,
            // Redmi Pad
            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
            // Mi Pad tablets
          ],
          [[o, /_/g, " "], [u, Ce], [l, _]],
          [
            // OPPO
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
          ],
          [o, [u, "OPPO"], [l, g]],
          [
            /\b(opd2\d{3}a?) bui/i
          ],
          [o, [u, "OPPO"], [l, _]],
          [
            // Vivo
            /vivo (\w+)(?: bui|\))/i,
            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
          ],
          [o, [u, "Vivo"], [l, g]],
          [
            // Realme
            /\b(rmx[1-3]\d{3})(?: bui|;|\))/i
          ],
          [o, [u, "Realme"], [l, g]],
          [
            // Motorola
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
          ],
          [o, [u, tt], [l, g]],
          [
            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
          ],
          [o, [u, tt], [l, _]],
          [
            // LG
            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
          ],
          [o, [u, Ie], [l, _]],
          [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
            /\blg-?([\d\w]+) bui/i
          ],
          [o, [u, Ie], [l, g]],
          [
            // Lenovo
            /(ideatab[-\w ]+)/i,
            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
          ],
          [o, [u, "Lenovo"], [l, _]],
          [
            // Nokia
            /(?:maemo|nokia).*(n900|lumia \d+)/i,
            /nokia[-_ ]?([-\w\.]*)/i
          ],
          [[o, /_/g, " "], [u, "Nokia"], [l, g]],
          [
            // Google
            /(pixel c)\b/i
            // Google Pixel C
          ],
          [o, [u, _e2], [l, _]],
          [
            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
            // Google Pixel
          ],
          [o, [u, _e2], [l, g]],
          [
            // Sony
            /droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
          ],
          [o, [u, ye], [l, g]],
          [
            /sony tablet [ps]/i,
            /\b(?:sony)?sgp\w+(?: bui|\))/i
          ],
          [[o, "Xperia Tablet"], [u, ye], [l, _]],
          [
            // OnePlus
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
          ],
          [o, [u, "OnePlus"], [l, g]],
          [
            // Amazon
            /(alexa)webm/i,
            /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,
            // Kindle Fire without Silk / Echo Show
            /(kf[a-z]+)( bui|\)).+silk\//i
            // Kindle Fire HD
          ],
          [o, [u, Se], [l, _]],
          [
            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
            // Fire Phone
          ],
          [[o, /(.+)/g, "Fire Phone $1"], [u, Se], [l, g]],
          [
            // BlackBerry
            /(playbook);[-\w\),; ]+(rim)/i
            // BlackBerry PlayBook
          ],
          [o, u, [l, _]],
          [
            /\b((?:bb[a-f]|st[hv])100-\d)/i,
            /\(bb10; (\w+)/i
            // BlackBerry 10
          ],
          [o, [u, Je], [l, g]],
          [
            // Asus
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
          ],
          [o, [u, Qe], [l, _]],
          [
            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
          ],
          [o, [u, Qe], [l, g]],
          [
            // HTC
            /(nexus 9)/i
            // HTC Nexus 9
          ],
          [o, [u, "HTC"], [l, _]],
          [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
            // HTC
            // ZTE
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
            // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
          ],
          [u, [o, /_/g, " "], [l, g]],
          [
            // TCL
            /droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])\w*(\)| bui)/i
          ],
          [o, [u, "TCL"], [l, _]],
          [
            // itel
            /(itel) ((\w+))/i
          ],
          [[u, ae], o, [l, it, { tablet: ["p10001l", "w7001"], "*": "mobile" }]],
          [
            // Acer
            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
          ],
          [o, [u, "Acer"], [l, _]],
          [
            // Meizu
            /droid.+; (m[1-5] note) bui/i,
            /\bmz-([-\w]{2,})/i
          ],
          [o, [u, "Meizu"], [l, g]],
          [
            // Ulefone
            /; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i
          ],
          [o, [u, "Ulefone"], [l, g]],
          [
            // Energizer
            /; (energy ?\w+)(?: bui|\))/i,
            /; energizer ([\w ]+)(?: bui|\))/i
          ],
          [o, [u, "Energizer"], [l, g]],
          [
            // Cat
            /; cat (b35);/i,
            /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i
          ],
          [o, [u, "Cat"], [l, g]],
          [
            // Smartfren
            /((?:new )?andromax[\w- ]+)(?: bui|\))/i
          ],
          [o, [u, "Smartfren"], [l, g]],
          [
            // Nothing
            /droid.+; (a(?:015|06[35]|142p?))/i
          ],
          [o, [u, "Nothing"], [l, g]],
          [
            // MIXED
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i,
            // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron/Infinix/Tecno/Micromax/Advan
            /; (imo) ((?!tab)[\w ]+?)(?: bui|\))/i,
            // IMO
            /(hp) ([\w ]+\w)/i,
            // HP iPAQ
            /(asus)-?(\w+)/i,
            // Asus
            /(microsoft); (lumia[\w ]+)/i,
            // Microsoft Lumia
            /(lenovo)[-_ ]?([-\w]+)/i,
            // Lenovo
            /(jolla)/i,
            // Jolla
            /(oppo) ?([\w ]+) bui/i
            // OPPO
          ],
          [u, o, [l, g]],
          [
            /(imo) (tab \w+)/i,
            // IMO
            /(kobo)\s(ereader|touch)/i,
            // Kobo
            /(archos) (gamepad2?)/i,
            // Archos
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
            // HP TouchPad
            /(kindle)\/([\w\.]+)/i,
            // Kindle
            /(nook)[\w ]+build\/(\w+)/i,
            // Nook
            /(dell) (strea[kpr\d ]*[\dko])/i,
            // Dell Streak
            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
            // Le Pan Tablets
            /(trinity)[- ]*(t\d{3}) bui/i,
            // Trinity Tablets
            /(gigaset)[- ]+(q\w{1,9}) bui/i,
            // Gigaset Tablets
            /(vodafone) ([\w ]+)(?:\)| bui)/i
            // Vodafone
          ],
          [u, o, [l, _]],
          [
            /(surface duo)/i
            // Surface Duo
          ],
          [o, [u, xe], [l, _]],
          [
            /droid [\d\.]+; (fp\du?)(?: b|\))/i
            // Fairphone
          ],
          [o, [u, "Fairphone"], [l, g]],
          [
            /(u304aa)/i
            // AT&T
          ],
          [o, [u, "AT&T"], [l, g]],
          [
            /\bsie-(\w*)/i
            // Siemens
          ],
          [o, [u, "Siemens"], [l, g]],
          [
            /\b(rct\w+) b/i
            // RCA Tablets
          ],
          [o, [u, "RCA"], [l, _]],
          [
            /\b(venue[\d ]{2,7}) b/i
            // Dell Venue Tablets
          ],
          [o, [u, "Dell"], [l, _]],
          [
            /\b(q(?:mv|ta)\w+) b/i
            // Verizon Tablet
          ],
          [o, [u, "Verizon"], [l, _]],
          [
            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
            // Barnes & Noble Tablet
          ],
          [o, [u, "Barnes & Noble"], [l, _]],
          [
            /\b(tm\d{3}\w+) b/i
          ],
          [o, [u, "NuVision"], [l, _]],
          [
            /\b(k88) b/i
            // ZTE K Series Tablet
          ],
          [o, [u, "ZTE"], [l, _]],
          [
            /\b(nx\d{3}j) b/i
            // ZTE Nubia
          ],
          [o, [u, "ZTE"], [l, g]],
          [
            /\b(gen\d{3}) b.+49h/i
            // Swiss GEN Mobile
          ],
          [o, [u, "Swiss"], [l, g]],
          [
            /\b(zur\d{3}) b/i
            // Swiss ZUR Tablet
          ],
          [o, [u, "Swiss"], [l, _]],
          [
            /\b((zeki)?tb.*\b) b/i
            // Zeki Tablets
          ],
          [o, [u, "Zeki"], [l, _]],
          [
            /\b([yr]\d{2}) b/i,
            /\b(dragon[- ]+touch |dt)(\w{5}) b/i
            // Dragon Touch Tablet
          ],
          [[u, "Dragon Touch"], o, [l, _]],
          [
            /\b(ns-?\w{0,9}) b/i
            // Insignia Tablets
          ],
          [o, [u, "Insignia"], [l, _]],
          [
            /\b((nxa|next)-?\w{0,9}) b/i
            // NextBook Tablets
          ],
          [o, [u, "NextBook"], [l, _]],
          [
            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
            // Voice Xtreme Phones
          ],
          [[u, "Voice"], o, [l, g]],
          [
            /\b(lvtel\-)?(v1[12]) b/i
            // LvTel Phones
          ],
          [[u, "LvTel"], o, [l, g]],
          [
            /\b(ph-1) /i
            // Essential PH-1
          ],
          [o, [u, "Essential"], [l, g]],
          [
            /\b(v(100md|700na|7011|917g).*\b) b/i
            // Envizen Tablets
          ],
          [o, [u, "Envizen"], [l, _]],
          [
            /\b(trio[-\w\. ]+) b/i
            // MachSpeed Tablets
          ],
          [o, [u, "MachSpeed"], [l, _]],
          [
            /\btu_(1491) b/i
            // Rotor Tablets
          ],
          [o, [u, "Rotor"], [l, _]],
          [
            /(shield[\w ]+) b/i
            // Nvidia Shield Tablets
          ],
          [o, [u, "Nvidia"], [l, _]],
          [
            /(sprint) (\w+)/i
            // Sprint Phones
          ],
          [u, o, [l, g]],
          [
            /(kin\.[onetw]{3})/i
            // Microsoft Kin
          ],
          [[o, /\./g, " "], [u, xe], [l, g]],
          [
            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
            // Zebra
          ],
          [o, [u, I], [l, _]],
          [
            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
          ],
          [o, [u, I], [l, g]],
          [
            ///////////////////
            // SMARTTVS
            ///////////////////
            /smart-tv.+(samsung)/i
            // Samsung
          ],
          [u, [l, R]],
          [
            /hbbtv.+maple;(\d+)/i
          ],
          [[o, /^/, "SmartTV"], [u, J], [l, R]],
          [
            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
            // LG SmartTV
          ],
          [[u, Ie], [l, R]],
          [
            /(apple) ?tv/i
            // Apple TV
          ],
          [u, [o, G + " TV"], [l, R]],
          [
            /crkey/i
            // Google Chromecast
          ],
          [[o, $e + "cast"], [u, _e2], [l, R]],
          [
            /droid.+aft(\w+)( bui|\))/i
            // Fire TV
          ],
          [o, [u, Se], [l, R]],
          [
            /\(dtv[\);].+(aquos)/i,
            /(aquos-tv[\w ]+)\)/i
            // Sharp
          ],
          [o, [u, fe], [l, R]],
          [
            /(bravia[\w ]+)( bui|\))/i
            // Sony
          ],
          [o, [u, ye], [l, R]],
          [
            /(mitv-\w{5}) bui/i
            // Xiaomi
          ],
          [o, [u, Ce], [l, R]],
          [
            /Hbbtv.*(technisat) (.*);/i
            // TechniSAT
          ],
          [u, o, [l, R]],
          [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
            // Roku
            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
            // HbbTV devices
          ],
          [[u, $t], [o, $t], [l, R]],
          [
            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
            // SmartTV from Unidentified Vendors
          ],
          [[l, R]],
          [
            ///////////////////
            // CONSOLES
            ///////////////////
            /(ouya)/i,
            // Ouya
            /(nintendo) ([wids3utch]+)/i
            // Nintendo
          ],
          [u, o, [l, L]],
          [
            /droid.+; (shield) bui/i
            // Nvidia
          ],
          [o, [u, "Nvidia"], [l, L]],
          [
            /(playstation [345portablevi]+)/i
            // Playstation
          ],
          [o, [u, ye], [l, L]],
          [
            /\b(xbox(?: one)?(?!; xbox))[\); ]/i
            // Microsoft Xbox
          ],
          [o, [u, xe], [l, L]],
          [
            ///////////////////
            // WEARABLES
            ///////////////////
            /\b(sm-[lr]\d\d[05][fnuw]?s?)\b/i
            // Samsung Galaxy Watch
          ],
          [o, [u, J], [l, V]],
          [
            /((pebble))app/i
            // Pebble
          ],
          [u, o, [l, V]],
          [
            /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
            // Apple Watch
          ],
          [o, [u, G], [l, V]],
          [
            /droid.+; (glass) \d/i
            // Google Glass
          ],
          [o, [u, _e2], [l, V]],
          [
            /droid.+; (wt63?0{2,3})\)/i
          ],
          [o, [u, I], [l, V]],
          [
            ///////////////////
            // XR
            ///////////////////
            /droid.+; (glass) \d/i
            // Google Glass
          ],
          [o, [u, _e2], [l, V]],
          [
            /(pico) (4|neo3(?: link|pro)?)/i
            // Pico
          ],
          [u, o, [l, V]],
          [
            /; (quest( \d| pro)?)/i
            // Oculus Quest
          ],
          [o, [u, v], [l, V]],
          [
            ///////////////////
            // EMBEDDED
            ///////////////////
            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
            // Tesla
          ],
          [u, [l, Be]],
          [
            /(aeobc)\b/i
            // Echo Dot
          ],
          [o, [u, Se], [l, Be]],
          [
            ////////////////////
            // MIXED (GENERIC)
            ///////////////////
            /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i
            // Android Phones from Unidentified Vendors
          ],
          [o, [l, g]],
          [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
            // Android Tablets from Unidentified Vendors
          ],
          [o, [l, _]],
          [
            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
            // Unidentifiable Tablet
          ],
          [[l, _]],
          [
            /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
            // Unidentifiable Mobile
          ],
          [[l, g]],
          [
            /(android[-\w\. ]{0,9});.+buil/i
            // Generic Android Device
          ],
          [o, [u, "Generic"]]
        ],
        engine: [
          [
            /windows.+ edge\/([\w\.]+)/i
            // EdgeHTML
          ],
          [b, [a, ze + "HTML"]],
          [
            /(arkweb)\/([\w\.]+)/i
            // ArkWeb
          ],
          [a, b],
          [
            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
            // Blink
          ],
          [b, [a, "Blink"]],
          [
            /(presto)\/([\w\.]+)/i,
            // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i,
            // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna/Servo
            /ekioh(flow)\/([\w\.]+)/i,
            // Flow
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
            // KHTML/Tasman/Links
            /(icab)[\/ ]([23]\.[\d\.]+)/i,
            // iCab
            /\b(libweb)/i
          ],
          [a, b],
          [
            /rv\:([\w\.]{1,9})\b.+(gecko)/i
            // Gecko
          ],
          [b, a]
        ],
        os: [
          [
            // Windows
            /microsoft (windows) (vista|xp)/i
            // Windows (iTunes)
          ],
          [a, b],
          [
            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i
            // Windows Phone
          ],
          [a, [b, it, Zt]],
          [
            /windows nt 6\.2; (arm)/i,
            // Windows RT
            /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
            /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i
          ],
          [[b, it, Zt], [a, "Windows"]],
          [
            // iOS/macOS
            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
            // iOS
            /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
            /cfnetwork\/.+darwin/i
          ],
          [[b, /_/g, "."], [a, "iOS"]],
          [
            /(mac os x) ?([\w\. ]*)/i,
            /(macintosh|mac_powerpc\b)(?!.+haiku)/i
            // Mac OS
          ],
          [[a, A], [b, /_/g, "."]],
          [
            // Mobile OSes
            /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
            // Android-x86/HarmonyOS
          ],
          [b, a],
          [
            // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS/OpenHarmony
            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish|openharmony)[-\/ ]?([\w\.]*)/i,
            /(blackberry)\w*\/([\w\.]*)/i,
            // Blackberry
            /(tizen|kaios)[\/ ]([\w\.]+)/i,
            // Tizen/KaiOS
            /\((series40);/i
            // Series 40
          ],
          [a, b],
          [
            /\(bb(10);/i
            // BlackBerry 10
          ],
          [b, [a, Je]],
          [
            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
            // Symbian
          ],
          [b, [a, "Symbian"]],
          [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
            // Firefox OS
          ],
          [b, [a, Te + " OS"]],
          [
            /web0s;.+rt(tv)/i,
            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
            // WebOS
          ],
          [b, [a, "webOS"]],
          [
            /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
            // watchOS
          ],
          [b, [a, "watchOS"]],
          [
            // Google Chromecast
            /crkey\/([\d\.]+)/i
            // Google Chromecast
          ],
          [b, [a, $e + "cast"]],
          [
            /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
            // Chromium OS
          ],
          [[a, k], b],
          [
            // Smart TVs
            /panasonic;(viera)/i,
            // Panasonic Viera
            /(netrange)mmh/i,
            // Netrange
            /(nettv)\/(\d+\.[\w\.]+)/i,
            // NetTV
            // Console
            /(nintendo|playstation) ([wids345portablevuch]+)/i,
            // Nintendo/Playstation
            /(xbox); +xbox ([^\);]+)/i,
            // Microsoft Xbox (360, One, X, S, Series X, Series S)
            // Other
            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
            // Joli/Palm
            /(mint)[\/\(\) ]?(\w*)/i,
            // Mint
            /(mageia|vectorlinux)[; ]/i,
            // Mageia/VectorLinux
            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
            // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
            /(hurd|linux) ?([\w\.]*)/i,
            // Hurd/Linux
            /(gnu) ?([\w\.]*)/i,
            // GNU
            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
            // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
            /(haiku) (\w+)/i
            // Haiku
          ],
          [a, b],
          [
            /(sunos) ?([\w\.\d]*)/i
            // Solaris
          ],
          [[a, "Solaris"], b],
          [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
            // Solaris
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
            // AIX
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
            // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX/SerenityOS
            /(unix) ?([\w\.]*)/i
            // UNIX
          ],
          [a, b]
        ]
      }, Y = function(y, C) {
        if (typeof y === d && (C = y, y = r), !(this instanceof Y))
          return new Y(y, C).getResult();
        var x = typeof i !== h && i.navigator ? i.navigator : r, D = y || (x && x.userAgent ? x.userAgent : s), le = x && x.userAgentData ? x.userAgentData : r, ee = C ? N(Qt, C) : Qt, E = x && x.userAgent == D;
        return this.getBrowser = function() {
          var m = {};
          return m[a] = r, m[b] = r, We.call(m, D, ee.browser), m[w] = ir(m[b]), E && x && x.brave && typeof x.brave.isBrave == f && (m[a] = "Brave"), m;
        }, this.getCPU = function() {
          var m = {};
          return m[O] = r, We.call(m, D, ee.cpu), m;
        }, this.getDevice = function() {
          var m = {};
          return m[u] = r, m[o] = r, m[l] = r, We.call(m, D, ee.device), E && !m[l] && le && le.mobile && (m[l] = g), E && m[o] == "Macintosh" && x && typeof x.standalone !== h && x.maxTouchPoints && x.maxTouchPoints > 2 && (m[o] = "iPad", m[l] = _), m;
        }, this.getEngine = function() {
          var m = {};
          return m[a] = r, m[b] = r, We.call(m, D, ee.engine), m;
        }, this.getOS = function() {
          var m = {};
          return m[a] = r, m[b] = r, We.call(m, D, ee.os), E && !m[a] && le && le.platform && le.platform != "Unknown" && (m[a] = le.platform.replace(/chrome os/i, k).replace(/macos/i, A)), m;
        }, this.getResult = function() {
          return {
            ua: this.getUA(),
            browser: this.getBrowser(),
            engine: this.getEngine(),
            os: this.getOS(),
            device: this.getDevice(),
            cpu: this.getCPU()
          };
        }, this.getUA = function() {
          return D;
        }, this.setUA = function(m) {
          return D = typeof m === p && m.length > Ue ? $t(m, Ue) : m, this;
        }, this.setUA(D), this;
      };
      Y.VERSION = n, Y.BROWSER = M([a, b, w]), Y.CPU = M([O]), Y.DEVICE = M([o, u, l, L, g, R, _, V, Be]), Y.ENGINE = Y.OS = M([a, b]), t.exports && (e = t.exports = Y), e.UAParser = Y;
      var Re = typeof i !== h && (i.jQuery || i.Zepto);
      if (Re && !Re.ua) {
        var rt = new Y();
        Re.ua = rt.getResult(), Re.ua.get = function() {
          return rt.getUA();
        }, Re.ua.set = function(y) {
          rt.setUA(y);
          var C = rt.getResult();
          for (var x in C)
            Re.ua[x] = C[x];
        };
      }
    })(typeof window == "object" ? window : Cn);
  }(He, He.exports)), He.exports;
}
var kn = En();
const Sn = /* @__PURE__ */ yn(kn), Dn = new Sn(), Ji = Dn.getResult(), $n = (_a = Ji.engine.name) == null ? void 0 : _a.toLowerCase(), di = Number((_b = Ji.engine.version) == null ? void 0 : _b.split(".")[0]), Mt = {
  "0x0001": "Escape",
  "0x0002": "Digit1",
  "0x0003": "Digit2",
  "0x0004": "Digit3",
  "0x0005": "Digit4",
  "0x0006": "Digit5",
  "0x0007": "Digit6",
  "0x0008": "Digit7",
  "0x0009": "Digit8",
  "0x000A": "Digit9",
  "0x000B": "Digit0",
  "0x000C": "Minus",
  "0x000D": "Equal",
  "0x000E": "Backspace",
  "0x000F": "Tab",
  "0x0010": "KeyQ",
  "0x0011": "KeyW",
  "0x0012": "KeyE",
  "0x0013": "KeyR",
  "0x0014": "KeyT",
  "0x0015": "KeyY",
  "0x0016": "KeyU",
  "0x0017": "KeyI",
  "0x0018": "KeyO",
  "0x0019": "KeyP",
  "0x001A": "BracketLeft",
  "0x001B": "BracketRight",
  "0x001C": "Enter",
  "0x001D": "ControlLeft",
  "0x001E": "KeyA",
  "0x001F": "KeyS",
  "0x0020": "KeyD",
  "0x0021": "KeyF",
  "0x0022": "KeyG",
  "0x0023": "KeyH",
  "0x0024": "KeyJ",
  "0x0025": "KeyK",
  "0x0026": "KeyL",
  "0x0027": "Semicolon",
  "0x0028": "Quote",
  "0x0029": "Backquote",
  "0x002A": "ShiftLeft",
  "0x002B": "Backslash",
  "0x002C": "KeyZ",
  "0x002D": "KeyX",
  "0x002E": "KeyC",
  "0x002F": "KeyV",
  "0x0030": "KeyB",
  "0x0031": "KeyN",
  "0x0032": "KeyM",
  "0x0033": "Comma",
  "0x0034": "Period",
  "0x0035": "Slash",
  "0x0036": "ShiftRight",
  "0x0037": "NumpadMultiply",
  "0x0038": "AltLeft",
  "0x0039": "Space",
  "0x003A": "CapsLock",
  "0x003B": "F1",
  "0x003C": "F2",
  "0x003D": "F3",
  "0x003E": "F4",
  "0x003F": "F5",
  "0x0040": "F6",
  "0x0041": "F7",
  "0x0042": "F8",
  "0x0043": "F9",
  "0x0044": "F10",
  "0x0045": "Pause",
  "0x0046": "ScrollLock",
  "0x0047": "Numpad7",
  "0x0048": "Numpad8",
  "0x0049": "Numpad9",
  "0x004A": "NumpadSubtract",
  "0x004B": "Numpad4",
  "0x004C": "Numpad5",
  "0x004D": "Numpad6",
  "0x004E": "NumpadAdd",
  "0x004F": "Numpad1",
  "0x0050": "Numpad2",
  "0x0051": "Numpad3",
  "0x0052": "Numpad0",
  "0x0053": "NumpadDecimal",
  "0x0056": "IntlBackslash",
  "0x0057": "F11",
  "0x0058": "F12",
  "0x0059": "NumpadEqual",
  "0x0064": "F13",
  "0x0065": "F14",
  "0x0066": "F15",
  "0x0067": "F16",
  "0x0068": "F17",
  "0x0069": "F18",
  "0x006A": "F19",
  "0x006B": "F20",
  "0x006C": "F21",
  "0x006D": "F22",
  "0x006E": "F23",
  "0x0070": "KanaMode",
  "0x0071": "Lang2",
  "0x0072": "Lang1",
  "0x0073": "IntlRo",
  "0x0076": "F24",
  "0x0079": "Convert",
  "0x007B": "NonConvert",
  "0x007D": "IntlYen",
  "0x007E": "NumpadComma",
  "0xE010": "MediaTrackPrevious",
  "0xE019": "MediaTrackNext",
  "0xE01C": "NumpadEnter",
  "0xE01D": "ControlRight",
  "0xE021": "LaunchApp2",
  "0xE022": "MediaPlayPause",
  "0xE024": "MediaStop",
  "0xE032": "BrowserHome",
  "0xE035": "NumpadDivide",
  "0xE037": "PrintScreen",
  "0xE038": "AltRight",
  "0xE045": "NumLock",
  "0xE046": "Pause",
  "0xE047": "Home",
  "0xE048": "ArrowUp",
  "0xE049": "PageUp",
  "0xE04B": "ArrowLeft",
  "0xE04D": "ArrowRight",
  "0xE04F": "End",
  "0xE050": "ArrowDown",
  "0xE051": "PageDown",
  "0xE052": "Insert",
  "0xE053": "Delete",
  "0xE05D": "ContextMenu",
  "0xE05E": "Power",
  "0xE065": "BrowserSearch",
  "0xE066": "BrowserFavorites",
  "0xE067": "BrowserRefresh",
  "0xE068": "BrowserStop",
  "0xE069": "BrowserForward",
  "0xE06A": "BrowserBack",
  "0xE06B": "LaunchApp1",
  "0xE06C": "LaunchMail",
  "0xE06D": "MediaSelect"
}, Tn = {
  "0x0077": "Lang4",
  "0x0078": "Lang3",
  "0xE008": "Undo",
  "0xE00A": "Paste",
  "0xE017": "Cut",
  "0xE018": "Copy",
  "0xE020": "AudioVolumeMute",
  "0xE02C": "Eject",
  "0xE02E": "AudioVolumeDown",
  "0xE030": "AudioVolumeUp",
  "0xE03B": "Help",
  "0xE05B": "MetaLeft",
  "0xE05C": "MetaRight",
  "0xE05F": "Sleep",
  "0xE063": "WakeUp"
}, Rn = {
  "0x0054": "PrintScreen",
  "0xE020": "VolumeMute",
  // The documentation says it's 'AudioVolumeMute', but the actual test shows that it's 'VolumeMute'.
  "0xE02E": "VolumeDown",
  "0xE030": "VolumeUp",
  "0xE05B": di > 117 ? "MetaLeft" : "OSLeft",
  "0xE05C": di > 117 ? "MetaRight" : "OSRight"
}, An = {
  blink: Ft({ ...Mt, ...Tn }),
  gecko: Ft({ ...Mt, ...Rn }),
  webkit: Ft(Mt)
};
function Ft(t) {
  const e = {};
  for (const [i, r] of Object.entries(t))
    e[r] = i;
  return e;
}
const fi = function(t) {
  const e = An[$n];
  return parseInt(e[t], 16);
};
var It = /* @__PURE__ */ ((t) => (t.CTRL_LEFT = "ControlLeft", t.SHIFT_LEFT = "ShiftLeft", t.SHIFT_RIGHT = "ShiftRight", t.ALT_LEFT = "AltLeft", t.CTRL_RIGHT = "ControlRight", t.ALT_RIGHT = "AltRight", t.ControlLeft = "ControlLeft", t.ShiftLeft = "ShiftLeft", t.ShiftRight = "ShiftRight", t.AltLeft = "AltLeft", t.ControlRight = "ControlRight", t.AltRight = "AltRight", t))(It || {}), Me = /* @__PURE__ */ ((t) => (t.CAPS_LOCK = "CapsLock", t.NUM_LOCK = "NumLock", t.SCROLL_LOCK = "ScrollLock", t.KANA_MODE = "KanaMode", t.CapsLock = "CapsLock", t.ScrollLock = "ScrollLock", t.NumLock = "NumLock", t.KanaMode = "KanaMode", t))(Me || {}), Xe = /* @__PURE__ */ ((t) => (t[t.CTRL_ALT_DEL = 0] = "CTRL_ALT_DEL", t[t.META = 1] = "META", t))(Xe || {}), he = /* @__PURE__ */ ((t) => (t[t.Fit = 1] = "Fit", t[t.Full = 2] = "Full", t[t.Real = 3] = "Real", t))(he || {}), Ve = /* @__PURE__ */ ((t) => (t[t.Pixel = 0] = "Pixel", t[t.Line = 1] = "Line", t[t.Page = 2] = "Page", t))(Ve || {});
class On {
  constructor(e, i, r) {
    __publicField(this, "username");
    __publicField(this, "password");
    __publicField(this, "destination");
    __publicField(this, "proxyAddress");
    __publicField(this, "serverDomain");
    __publicField(this, "authToken");
    __publicField(this, "desktopSize");
    __publicField(this, "extensions");
    this.username = e.username, this.password = e.password, this.proxyAddress = i.address, this.authToken = i.authToken, this.destination = r.destination, this.serverDomain = r.serverDomain, this.extensions = r.extensions, this.desktopSize = r.desktopSize;
  }
}
class Ln {
  /**
   * Creates a new ConfigBuilder instance.
   */
  constructor() {
    __publicField(this, "username", "");
    __publicField(this, "password", "");
    __publicField(this, "destination", "");
    __publicField(this, "proxyAddress", "");
    __publicField(this, "serverDomain", "");
    __publicField(this, "authToken", "");
    __publicField(this, "desktopSize");
    __publicField(this, "extensions", []);
  }
  /**
   * Optional parameter
   *
   * @param username - The username to use for authentication
   * @returns The builder instance for method chaining
   */
  withUsername(e) {
    return this.username = e, this;
  }
  /**
   * Optional parameter
   *
   * @param password - The password for authentication
   * @returns The builder instance for method chaining
   */
  withPassword(e) {
    return this.password = e, this;
  }
  /**
   * Required parameter
   *
   * @param destination - The destination address to connect to
   * @returns The builder instance for method chaining
   */
  withDestination(e) {
    return this.destination = e, this;
  }
  /**
   * Required parameter
   *
   * @param proxyAddress - The address of the proxy server
   * @returns The builder instance for method chaining
   */
  withProxyAddress(e) {
    return this.proxyAddress = e, this;
  }
  /**
   * Optional parameter
   *
   * @param serverDomain - The server domain to connect to
   * @returns The builder instance for method chaining
   */
  withServerDomain(e) {
    return this.serverDomain = e, this;
  }
  /**
   * Required parameter
   *
   * @param authToken - JWT token to connect to the proxy
   * @returns The builder instance for method chaining
   */
  withAuthToken(e) {
    return this.authToken = e, this;
  }
  /**
   * Optional parameter
   *
   * @param ext - The extension
   * @returns The builder instance for method chaining
   */
  withExtension(e) {
    return this.extensions.push(e), this;
  }
  /**
   * Optional
   *
   * @param desktopSize - The desktop size configuration object
   * @returns The builder instance for method chaining
   */
  withDesktopSize(e) {
    return this.desktopSize = e, this;
  }
  /**
   * Builds a new Config instance.
   *
   * @throws {Error} If required parameters (destination, proxyAddress, authToken) are not set
   * @returns A new Config instance with the configured values
   */
  build() {
    if (this.destination === "")
      throw new Error("destination has to be specified");
    if (this.proxyAddress === "")
      throw new Error("proxy address has to be specified");
    if (this.authToken === "")
      throw new Error("authentication token has to be specified");
    const e = { username: this.username, password: this.password }, i = { address: this.proxyAddress, authToken: this.authToken }, r = {
      destination: this.destination,
      serverDomain: this.serverDomain,
      extensions: this.extensions,
      desktopSize: this.desktopSize
    };
    return new On(e, i, r);
  }
}
class Le {
  constructor() {
    __publicField(this, "subscribers");
    this.subscribers = [];
  }
  subscribe(e) {
    this.subscribers.push(e);
  }
  publish(e) {
    for (const i of this.subscribers)
      i(e);
  }
}
class Mn {
  constructor(e) {
    __publicField(this, "module");
    __publicField(this, "canvas");
    __publicField(this, "keyboardUnicodeMode", false);
    __publicField(this, "backendSupportsUnicodeKeyboardShortcuts");
    __publicField(this, "onRemoteClipboardChanged");
    __publicField(this, "onRemoteReceivedFormatList");
    __publicField(this, "onForceClipboardUpdate");
    __publicField(this, "onCanvasResized");
    __publicField(this, "onWarningCallback");
    __publicField(this, "onClipboardRemoteUpdate");
    __publicField(this, "cursorHasOverride", false);
    __publicField(this, "lastCursorStyle", "default");
    __publicField(this, "enableClipboard", true);
    __publicField(this, "_autoClipboard", true);
    __publicField(this, "sessionStartedObservable", new Le());
    __publicField(this, "resizeObservable", new Le());
    __publicField(this, "session");
    __publicField(this, "modifierKeyPressed", []);
    __publicField(this, "mousePositionObservable", new Le());
    __publicField(this, "changeVisibilityObservable", new Le());
    __publicField(this, "scaleObservable", new Le());
    __publicField(this, "dynamicResizeObservable", new Le());
    this.module = e, F.info("Web bridge initialized.");
  }
  get autoClipboard() {
    return this._autoClipboard;
  }
  // If set to false, the clipboard will not be enabled and the callbacks will not be registered to the Rust side
  setEnableClipboard(e) {
    this.enableClipboard = e;
  }
  // If set to true, automatic clipboard synchronization with the server is enabled.
  //
  // If set to false, then the client must invoke `PublicAPI.saveRemoteClipboardData` and
  // `PublicAPI.sendClipboardData` to write to clipboard and to send clipboard data to the server.
  setEnableAutoClipboard(e) {
    this._autoClipboard = e;
  }
  /// Callback to set the local clipboard content to data received from the remote.
  setOnRemoteClipboardChanged(e) {
    this.onRemoteClipboardChanged = e;
  }
  /// Callback which is called when the remote requests a forced clipboard update (e.g. on
  /// clipboard initialization sequence)
  setOnForceClipboardUpdate(e) {
    this.onForceClipboardUpdate = e;
  }
  /// Callback which is called when the canvas is resized.
  setOnCanvasResized(e) {
    this.onCanvasResized = e;
  }
  /// Callback which is called when the warning event is emitted.
  setOnWarningCallback(e) {
    this.onWarningCallback = e;
  }
  /// Callback which is called when the clipboard remote update event is emitted.
  setOnClipboardRemoteUpdate(e) {
    this.onClipboardRemoteUpdate = e;
  }
  mouseIn(e) {
    this.syncModifier(e);
  }
  mouseOut(e) {
    this.releaseAllInputs();
  }
  sendKeyboardEvent(e) {
    this.sendKeyboard(e);
  }
  shutdown() {
    var _a2;
    (_a2 = this.session) == null ? void 0 : _a2.shutdown();
  }
  mouseButtonState(e, i, r) {
    r && e.preventDefault();
    const n = i ? this.module.DeviceEvent.mouseButtonPressed : this.module.DeviceEvent.mouseButtonReleased;
    this.doTransactionFromDeviceEvents([n(e.button)]);
  }
  updateMousePosition(e) {
    this.doTransactionFromDeviceEvents([this.module.DeviceEvent.mouseMove(e.x, e.y)]), this.mousePositionObservable.publish(e);
  }
  configBuilder() {
    return new Ln();
  }
  async connect(e) {
    const i = new this.module.SessionBuilder();
    i.proxyAddress(e.proxyAddress), i.destination(e.destination), i.serverDomain(e.serverDomain), i.password(e.password), i.authToken(e.authToken), i.username(e.username), i.renderCanvas(this.canvas), i.setCursorStyleCallbackContext(this), i.setCursorStyleCallback(this.setCursorStyleCallback), e.extensions.forEach((s) => {
      i.extension(s);
    }), this.onRemoteClipboardChanged != null && this.enableClipboard && i.remoteClipboardChangedCallback(this.onRemoteClipboardChanged), this.onRemoteReceivedFormatList != null && this.enableClipboard && i.remoteReceivedFormatListCallback(this.onRemoteReceivedFormatList), this.onForceClipboardUpdate != null && this.enableClipboard && i.forceClipboardUpdateCallback(this.onForceClipboardUpdate), this.onCanvasResized != null && i.canvasResizedCallback(this.onCanvasResized), e.desktopSize != null && i.desktopSize(
      new this.module.DesktopSize(e.desktopSize.width, e.desktopSize.height)
    );
    const r = await i.connect();
    this.session = r, this.resizeObservable.publish({
      desktopSize: r.desktopSize(),
      sessionId: 0
    }), this.sessionStartedObservable.publish(null);
    const n = async () => {
      try {
        return F.info("Starting the session."), await r.run();
      } finally {
        this.setVisibility(false);
      }
    };
    return {
      sessionId: 0,
      initialDesktopSize: r.desktopSize(),
      websocketPort: 0,
      run: n
    };
  }
  sendSpecialCombination(e) {
    switch (e) {
      case Xe.CTRL_ALT_DEL:
        this.ctrlAltDel();
        break;
      case Xe.META:
        this.sendMeta();
        break;
    }
  }
  rotation_unit_from_wheel_event(e) {
    switch (e.deltaMode) {
      case e.DOM_DELTA_PIXEL:
        return Ve.Pixel;
      case e.DOM_DELTA_LINE:
        return Ve.Line;
      case e.DOM_DELTA_PAGE:
        return Ve.Page;
      default:
        return Ve.Pixel;
    }
  }
  mouseWheel(e) {
    const i = e.deltaY !== 0, r = i ? e.deltaY : e.deltaX, n = this.rotation_unit_from_wheel_event(e);
    this.doTransactionFromDeviceEvents([
      this.module.DeviceEvent.wheelRotations(i, -r, n)
    ]);
  }
  emitWarningEvent(e) {
    var _a2;
    (_a2 = this.onWarningCallback) == null ? void 0 : _a2.call(this, e);
  }
  emitClipboardRemoteUpdateEvent() {
    var _a2;
    (_a2 = this.onClipboardRemoteUpdate) == null ? void 0 : _a2.call(this);
  }
  setVisibility(e) {
    this.changeVisibilityObservable.publish(e);
  }
  setScale(e) {
    this.scaleObservable.publish(e);
  }
  setCanvas(e) {
    this.canvas = e;
  }
  resizeDynamic(e, i, r) {
    var _a2;
    this.dynamicResizeObservable.publish({ width: e, height: i }), (_a2 = this.session) == null ? void 0 : _a2.resize(e, i, r);
  }
  /// Triggered by the browser when local clipboard is updated. Clipboard backend should
  /// cache the content and send it to the server when it is requested.
  onClipboardChanged(e) {
    return (async () => {
      var _a2;
      await ((_a2 = this.session) == null ? void 0 : _a2.onClipboardPaste(e));
    })();
  }
  onClipboardChangedEmpty() {
    return (async () => {
      var _a2;
      await ((_a2 = this.session) == null ? void 0 : _a2.onClipboardPaste(new this.module.ClipboardData()));
    })();
  }
  setKeyboardUnicodeMode(e) {
    this.keyboardUnicodeMode = e;
  }
  setCursorStyleOverride(e) {
    e == null ? (this.canvas.style.cursor = this.lastCursorStyle, this.cursorHasOverride = false) : (this.canvas.style.cursor = e, this.cursorHasOverride = true);
  }
  invokeExtension(e) {
    var _a2;
    (_a2 = this.session) == null ? void 0 : _a2.invokeExtension(e);
  }
  releaseAllInputs() {
    var _a2;
    (_a2 = this.session) == null ? void 0 : _a2.releaseAllInputs();
  }
  supportsUnicodeKeyboardShortcuts() {
    var _a2, _b2;
    return this.backendSupportsUnicodeKeyboardShortcuts !== void 0 ? this.backendSupportsUnicodeKeyboardShortcuts : ((_a2 = this.session) == null ? void 0 : _a2.supportsUnicodeKeyboardShortcuts) ? (this.backendSupportsUnicodeKeyboardShortcuts = (_b2 = this.session) == null ? void 0 : _b2.supportsUnicodeKeyboardShortcuts(), this.backendSupportsUnicodeKeyboardShortcuts) : true;
  }
  sendKeyboard(e) {
    e.preventDefault();
    let i, r;
    e.type === "keydown" ? (i = this.module.DeviceEvent.keyPressed, r = this.module.DeviceEvent.unicodePressed) : e.type === "keyup" && (i = this.module.DeviceEvent.keyReleased, r = this.module.DeviceEvent.unicodeReleased);
    let n = true;
    if (!this.supportsUnicodeKeyboardShortcuts()) {
      for (const f of ["Alt", "Control", "Meta", "AltGraph", "OS"])
        if (e.getModifierState(f)) {
          n = false;
          break;
        }
    }
    const s = e.code in It, c = e.code in Me;
    if (s && this.updateModifierKeyState(e), c && this.syncModifier(e), !e.repeat || !s && !c) {
      const f = fi(e.code), h = Number.isNaN(f);
      if (!this.keyboardUnicodeMode && i && !h) {
        this.doTransactionFromDeviceEvents([i(f)]);
        return;
      }
      if (this.keyboardUnicodeMode && r && i) {
        if (["Dead", "Unidentified"].indexOf(e.key) != -1)
          return;
        const d = fi(e.key);
        Number.isNaN(d) && e.key.length === 1 && !s && n ? this.doTransactionFromDeviceEvents([r(e.key)]) : h || this.doTransactionFromDeviceEvents([i(f)]);
        return;
      }
    }
  }
  setCursorStyleCallback(e, i, r, n) {
    let s;
    switch (e) {
      case "hidden": {
        s = "none";
        break;
      }
      case "default": {
        s = "default";
        break;
      }
      case "url": {
        if (i == null || r == null || n == null) {
          console.error("Invalid custom cursor parameters.");
          return;
        }
        const c = new Image();
        c.src = i;
        const f = Math.round(r), h = Math.round(n);
        s = `url(${i}) ${f} ${h}, default`;
        break;
      }
      default: {
        console.error(`Unsupported cursor style: ${e}.`);
        return;
      }
    }
    this.lastCursorStyle = s, this.cursorHasOverride || (this.canvas.style.cursor = s);
  }
  syncModifier(e) {
    var _a2;
    const i = e.getModifierState(Me.CAPS_LOCK), r = e.getModifierState(Me.NUM_LOCK), n = e.getModifierState(Me.SCROLL_LOCK), s = e.getModifierState(Me.KANA_MODE);
    (_a2 = this.session) == null ? void 0 : _a2.synchronizeLockKeys(
      n,
      r,
      i,
      s
    );
  }
  updateModifierKeyState(e) {
    const i = It[e.code];
    this.modifierKeyPressed.indexOf(i) === -1 ? this.modifierKeyPressed.push(i) : e.type === "keyup" && this.modifierKeyPressed.splice(this.modifierKeyPressed.indexOf(i), 1);
  }
  doTransactionFromDeviceEvents(e) {
    var _a2;
    const i = new this.module.InputTransaction();
    e.forEach((r) => i.addEvent(r)), (_a2 = this.session) == null ? void 0 : _a2.applyInputs(i);
  }
  ctrlAltDel() {
    const e = parseInt("0x001D", 16), i = parseInt("0x0038", 16), r = parseInt("0xE053", 16);
    this.doTransactionFromDeviceEvents([
      this.module.DeviceEvent.keyPressed(e),
      this.module.DeviceEvent.keyPressed(i),
      this.module.DeviceEvent.keyPressed(r),
      this.module.DeviceEvent.keyReleased(e),
      this.module.DeviceEvent.keyReleased(i),
      this.module.DeviceEvent.keyReleased(r)
    ]);
  }
  sendMeta() {
    const e = parseInt("0xE05B", 16);
    this.doTransactionFromDeviceEvents([
      this.module.DeviceEvent.keyPressed(e),
      this.module.DeviceEvent.keyReleased(e)
    ]);
  }
}
class Fn {
  constructor(e, i) {
    __publicField(this, "remoteDesktopService");
    __publicField(this, "clipboardService");
    this.remoteDesktopService = e, this.clipboardService = i;
  }
  configBuilder() {
    return this.remoteDesktopService.configBuilder();
  }
  connect(e) {
    return F.info("Initializing connection."), this.remoteDesktopService.connect(e);
  }
  ctrlAltDel() {
    this.remoteDesktopService.sendSpecialCombination(Xe.CTRL_ALT_DEL);
  }
  metaKey() {
    this.remoteDesktopService.sendSpecialCombination(Xe.META);
  }
  setVisibility(e) {
    F.info(`Change component visibility to: ${e}`), this.remoteDesktopService.setVisibility(e);
  }
  setScale(e) {
    this.remoteDesktopService.setScale(e);
  }
  shutdown() {
    this.remoteDesktopService.shutdown();
  }
  setKeyboardUnicodeMode(e) {
    this.remoteDesktopService.setKeyboardUnicodeMode(e);
  }
  setCursorStyleOverride(e) {
    this.remoteDesktopService.setCursorStyleOverride(e);
  }
  resize(e, i, r) {
    this.remoteDesktopService.resizeDynamic(e, i, r);
  }
  setEnableClipboard(e) {
    this.remoteDesktopService.setEnableClipboard(e);
  }
  setEnableAutoClipboard(e) {
    this.remoteDesktopService.setEnableAutoClipboard(e);
  }
  setOnWarningCallback(e) {
    this.remoteDesktopService.setOnWarningCallback(e);
  }
  setOnClipboardRemoteUpdateCallback(e) {
    this.remoteDesktopService.setOnClipboardRemoteUpdate(e);
  }
  async saveRemoteClipboardData() {
    return await this.clipboardService.saveRemoteClipboardData();
  }
  async sendClipboardData() {
    return await this.clipboardService.sendClipboardData();
  }
  invokeExtension(e) {
    this.remoteDesktopService.invokeExtension(e);
  }
  getExposedFunctions() {
    return {
      setVisibility: this.setVisibility.bind(this),
      configBuilder: this.configBuilder.bind(this),
      connect: this.connect.bind(this),
      onWarningCallback: this.setOnWarningCallback.bind(this),
      onClipboardRemoteUpdateCallback: this.setOnClipboardRemoteUpdateCallback.bind(this),
      setScale: this.setScale.bind(this),
      ctrlAltDel: this.ctrlAltDel.bind(this),
      metaKey: this.metaKey.bind(this),
      shutdown: this.shutdown.bind(this),
      setKeyboardUnicodeMode: this.setKeyboardUnicodeMode.bind(this),
      setCursorStyleOverride: this.setCursorStyleOverride.bind(this),
      resize: this.resize.bind(this),
      setEnableClipboard: this.setEnableClipboard.bind(this),
      setEnableAutoClipboard: this.setEnableAutoClipboard.bind(this),
      saveRemoteClipboardData: this.saveRemoteClipboardData.bind(this),
      sendClipboardData: this.sendClipboardData.bind(this),
      invokeExtension: this.invokeExtension.bind(this)
    };
  }
}
const Wt = Xi(false);
function Nn() {
  const t = Xi([]);
  return {
    subscribe: t.subscribe,
    enqueue(e) {
      t.update((i) => [...i, e]);
    },
    shift() {
      let e;
      return t.update((i) => i.length == 0 ? i : (e = i[0], i.slice(1))), e;
    },
    length() {
      return Zi(t).length;
    }
  };
}
const Kt = Nn();
var re = /* @__PURE__ */ ((t) => (t[t.Full = 0] = "Full", t[t.TextOnly = 1] = "TextOnly", t[t.TextOnlyServerOnly = 2] = "TextOnlyServerOnly", t[t.None = 3] = "None", t))(re || {}), er = /* @__PURE__ */ ((t) => (t[t.General = 0] = "General", t[t.WrongPassword = 1] = "WrongPassword", t[t.LogonFailure = 2] = "LogonFailure", t[t.AccessDenied = 3] = "AccessDenied", t[t.RDCleanPath = 4] = "RDCleanPath", t[t.ProxyConnect = 5] = "ProxyConnect", t[t.NegotiationFailure = 6] = "NegotiationFailure", t))(er || {});
const Pn = 100;
function ie(t) {
  throw {
    kind: () => er.General,
    backtrace: () => t
  };
}
class Bn {
  constructor(e, i) {
    __publicField(this, "remoteDesktopService");
    __publicField(this, "module");
    __publicField(this, "ClipboardApiSupported", re.None);
    __publicField(this, "lastClientClipboardItems", {});
    __publicField(this, "lastReceivedClipboardData", {});
    __publicField(this, "lastSentClipboardData", null);
    __publicField(this, "clipboardDataToSave", null);
    __publicField(this, "lastClipboardMonitorLoopError", null);
    // Firefox v126 and below does not support `navigator.clipboard.read` and `navigator.clipboard.write`.
    // So, we need to define specific methods to handle text-only clipboard.
    //
    // Also, Firefox v124 and below does not support `navigator.clipboard.readText`.
    // Because of this, we cannot read the data from the clipboard at all.
    __publicField(this, "ffClipboardDataToSave", null);
    this.remoteDesktopService = e, this.module = i;
  }
  initClipboard() {
    if (!window.isSecureContext) {
      this.remoteDesktopService.emitWarningEvent("Clipboard is available only in secure contexts (HTTPS).");
      return;
    }
    if (navigator.clipboard != null && (navigator.clipboard.read != null && navigator.clipboard.write != null ? this.ClipboardApiSupported = re.Full : navigator.clipboard.readText != null ? (this.ClipboardApiSupported = re.TextOnly, this.remoteDesktopService.emitWarningEvent(
      "Clipboard is limited to text-only data types due to an outdated browser version!"
    )) : navigator.clipboard.writeText != null && (this.ClipboardApiSupported = re.TextOnlyServerOnly, this.remoteDesktopService.emitWarningEvent(
      "Clipboard reading is not supported and writing is limited to text-only data types due to an outdated browser version!"
    ))), this.ClipboardApiSupported === re.None) {
      this.remoteDesktopService.emitWarningEvent(
        "Clipboard is not supported due to an outdated browser version!"
      );
      return;
    }
    this.remoteDesktopService.setOnForceClipboardUpdate(this.onForceClipboardUpdate.bind(this)), this.ClipboardApiSupported === re.Full ? this.remoteDesktopService.autoClipboard ? (this.remoteDesktopService.setOnRemoteClipboardChanged(this.onRemoteClipboardChangedAutoMode.bind(this)), this.remoteDesktopService.sessionStartedObservable.subscribe((e) => {
      this.scheduleOnMonitorClipboardUpdate();
    })) : this.remoteDesktopService.setOnRemoteClipboardChanged(
      this.onRemoteClipboardChangedManualMode.bind(this)
    ) : this.remoteDesktopService.setOnRemoteClipboardChanged(this.ffOnRemoteClipboardChanged.bind(this));
  }
  // Copies clipboard content received from the server to the local clipboard.
  // Returns the result of the operation. On failure, it additionally raises an error session event.
  async saveRemoteClipboardData() {
    if (this.ClipboardApiSupported !== re.Full)
      return await this.ffSaveRemoteClipboardData();
    this.clipboardDataToSave == null && ie("The server did not send the clipboard data.");
    try {
      const e = this.clipboardDataToRecord(this.clipboardDataToSave), i = new ClipboardItem(e);
      await navigator.clipboard.write([i]), this.clipboardDataToSave = null;
    } catch (e) {
      ie("Failed to write to the clipboard: " + e);
    }
  }
  // Sends local clipboard's content to the server.
  // Returns the result of the operation. On failure, it additionally raises an error session event.
  async sendClipboardData() {
    if (this.ClipboardApiSupported !== re.Full)
      return await this.ffSendClipboardData();
    const e = await navigator.clipboard.read().catch((n) => {
      ie("Failed to read from the clipboard: " + n);
    });
    e.length == 0 && ie("The clipboard has no data.");
    const i = e[0];
    i.types.some((n) => n.startsWith("text/") || n.startsWith("image/png")) || ie("The clipboard has no data of supported type (text or image).");
    const r = new this.module.ClipboardData();
    for (const n of i.types) {
      const s = n.startsWith("text/"), c = await i.getType(n);
      s ? r.addText(n, await c.text()) : r.addBinary(n, new Uint8Array(await c.arrayBuffer()));
    }
    r.isEmpty() || (this.lastSentClipboardData = r, await this.remoteDesktopService.onClipboardChanged(r));
  }
  scheduleOnMonitorClipboardUpdate() {
    setTimeout(this.onMonitorClipboard.bind(this), Pn);
  }
  runWhenWindowFocused(e) {
    document.hasFocus() ? e() : Kt.enqueue(e);
  }
  // This function is required to convert `ClipboardData` to an object that can be used
  // with `ClipboardItem` API.
  clipboardDataToRecord(e) {
    const i = {};
    for (const r of e.items()) {
      const n = r.mimeType();
      i[n] = new Blob([r.value()], { type: n });
    }
    return i;
  }
  clipboardDataToClipboardItemsRecord(e) {
    const i = {};
    for (const r of e.items()) {
      const n = r.mimeType();
      i[n] = r.value();
    }
    return i;
  }
  // This callback is required to send initial clipboard state if available.
  onForceClipboardUpdate() {
    try {
      this.lastSentClipboardData ? this.remoteDesktopService.onClipboardChanged(this.lastSentClipboardData) : this.remoteDesktopService.onClipboardChangedEmpty();
    } catch (e) {
      console.error("Failed to send initial clipboard state: " + e);
    }
  }
  // This callback is required to update client clipboard state when remote side has changed.
  onRemoteClipboardChangedManualMode(e) {
    this.clipboardDataToSave = e, this.remoteDesktopService.emitClipboardRemoteUpdateEvent();
  }
  // This callback is required to update client clipboard state when remote side has changed.
  onRemoteClipboardChangedAutoMode(e) {
    try {
      const i = this.clipboardDataToRecord(e), r = new ClipboardItem(i);
      this.runWhenWindowFocused(() => {
        this.lastReceivedClipboardData = this.clipboardDataToClipboardItemsRecord(e), navigator.clipboard.write([r]);
      });
    } catch (i) {
      console.error("Failed to set client clipboard: " + i);
    }
  }
  // Called periodically to monitor clipboard changes
  async onMonitorClipboard() {
    try {
      if (!document.hasFocus())
        return;
      const e = await navigator.clipboard.read();
      if (e.length == 0)
        return;
      const i = e[0];
      if (!i.types.some((s) => s.startsWith("text/") || s.startsWith("image/png")))
        return;
      const r = {};
      let n = true;
      for (const s of i.types) {
        const c = s.startsWith("text/"), f = await i.getType(s), h = c ? await f.text() : new Uint8Array(await f.arrayBuffer()), d = c ? function(w, o) {
          return w === o;
        } : function(w, o) {
          return !(w instanceof Uint8Array) || !(o instanceof Uint8Array) ? false : w.length === o.length && w.every((a, l) => a === o[l]);
        }, p = this.lastClientClipboardItems[s];
        d(p, h) || (d(this.lastReceivedClipboardData[s], h) ? this.lastClientClipboardItems[s] = this.lastReceivedClipboardData[s] : n = false), r[s] = h;
      }
      if (!n) {
        this.lastClientClipboardItems = r;
        const s = new this.module.ClipboardData();
        Object.entries(r).forEach(([c, f]) => {
          f != null && (c.startsWith("text/") && typeof f == "string" ? s.addText(c, f) : c.startsWith("image/") && f instanceof Uint8Array && s.addBinary(c, f));
        }), s.isEmpty() || (this.lastSentClipboardData = s, await this.remoteDesktopService.onClipboardChanged(s));
      }
    } catch (e) {
      e instanceof Error && ((this.lastClipboardMonitorLoopError === null || this.lastClipboardMonitorLoopError.toString() !== e.toString()) && console.error("Clipboard monitoring error: " + e), this.lastClipboardMonitorLoopError = e);
    } finally {
      Zi(Wt) || this.scheduleOnMonitorClipboardUpdate();
    }
  }
  // This function is required to retrieve the text data from the `ClipboardData`.
  ffRetrieveTextData(e) {
    for (const i of e.items())
      if (i.mimeType().startsWith("text/")) {
        const r = i.value();
        if (typeof r == "string") return r;
      }
    return "";
  }
  // Firefox specific function.
  // This callback is required to update client clipboard state when remote side has changed.
  ffOnRemoteClipboardChanged(e) {
    const i = this.ffRetrieveTextData(e);
    i !== "" && (this.ffClipboardDataToSave = i, this.remoteDesktopService.emitClipboardRemoteUpdateEvent());
  }
  // Firefox specific function. We are using text-only clipboard API here.
  //
  // Copies clipboard content received from the server to the local clipboard.
  // Returns the result of the operation. On failure, it additionally raises an error session event.
  async ffSaveRemoteClipboardData() {
    this.ffClipboardDataToSave == null && ie("The server did not send the clipboard data.");
    try {
      await navigator.clipboard.writeText(this.ffClipboardDataToSave), this.ffClipboardDataToSave = null;
    } catch (e) {
      ie("Failed to write to the clipboard: " + e);
    }
  }
  // Firefox specific function. We are using text-only clipboard API here.
  //
  // Sends local clipboard's content to the server.
  // Returns the result of the operation. On failure, it additionally raises an error session event.
  async ffSendClipboardData() {
    this.ClipboardApiSupported !== re.TextOnly && ie("The browser does not support clipboard read.");
    const e = await navigator.clipboard.readText().catch((r) => {
      ie("Failed to read from the clipboard: " + r);
    });
    e.length == 0 && ie("The clipboard has no data.");
    const i = new this.module.ClipboardData();
    i.addText("text/plain", e), i.isEmpty() || (this.lastSentClipboardData = i, await this.remoteDesktopService.onClipboardChanged(i));
  }
}
var Un = (t, e) => e(t, true), zn = (t, e) => e(t, false), In = (t) => t.preventDefault(), Wn = /* @__PURE__ */ ln('<div class="svelte-1103xra"><div><div class="screen-viewer svelte-1103xra"><canvas id="renderer" tabindex="0" class="svelte-1103xra"></canvas></div></div></div>');
const Kn = {
  hash: "svelte-1103xra",
  code: ".screen-wrapper.svelte-1103xra {position:relative;}.capturing-inputs.svelte-1103xra {outline:1px solid rgba(0, 97, 166, 0.7);outline-offset:-1px;}canvas.svelte-1103xra {width:100%;height:100%;}.svelte-1103xra::selection {background-color:transparent;}.screen-wrapper.hidden.svelte-1103xra {pointer-events:none !important;position:absolute !important;visibility:hidden;height:100%;width:100%;transform:translate(-100%, -100%);}"
};
function tr(t, e) {
  Wi(e, true), dn(t, Kn);
  let i = ot(e, "scale"), r = ot(e, "verbose"), n = ot(e, "flexcenter"), s = ot(e, "module"), c = Rt(false), f = () => {
    var _a2, _b2;
    return F.info(`
            capturingInputs: ${document.activeElement === p}
            current active element: ${document.activeElement}
        `), ((_b2 = (_a2 = document.activeElement) == null ? void 0 : _a2.shadowRoot) == null ? void 0 : _b2.firstElementChild) === h;
  }, h, d, p, w = Rt(""), o = Rt(""), a = new Mn(s()), l = new Bn(a, s()), u = new Fn(a, l), b = he.Fit;
  function O() {
    Be(), Ue();
    function v(k) {
      f() && Ie(k);
    }
    window.addEventListener("keydown", v, false), window.addEventListener("keyup", v, false), window.addEventListener("focus", de);
  }
  function L() {
    n() === "true" && (h.style.flexGrow = "", h.style.display = "", h.style.justifyContent = "", h.style.alignItems = "");
  }
  function g(v) {
    n() === "true" && (h.style.flexGrow = "1", h.style.display = "flex", h.style.justifyContent = "center", h.style.alignItems = "center");
  }
  function _(v, k, A) {
    let T = `height: ${v}; width: ${k}`;
    T = `${T}; max-height: ${v}; max-width: ${k}; min-height: ${v}; min-width: ${k}`, q(w, Ee(T));
  }
  function R(v, k, A) {
    q(o, `height: ${v}; width: ${k}; overflow: ${A}`);
  }
  const V = (v) => {
    G(i());
  };
  function Be() {
    a.resizeObservable.subscribe((v) => {
      F.info(`Resize canvas to: ${v.desktopSize.width}x${v.desktopSize.height}`), p.width = v.desktopSize.width, p.height = v.desktopSize.height, G(i());
    });
  }
  function Ue() {
    window.addEventListener("resize", V), a.scaleObservable.subscribe((v) => {
      F.info("Change scale!"), G(v);
    }), a.dynamicResizeObservable.subscribe((v) => {
      F.info(`Dynamic resize!, width: ${v.width}, height: ${v.height}`), _(v.height.toString() + "px", v.width.toString() + "px");
    }), a.changeVisibilityObservable.subscribe((v) => {
      q(c, Ee(v)), v && (R("100%", "100%", "hidden"), setTimeout(() => G(i()), 150));
    });
  }
  function Se() {
    G(b);
  }
  function G(v) {
    if (L(), B(c))
      switch (v) {
        case "fit":
        case he.Fit:
          F.info("Size to fit"), b = he.Fit, i("fit"), Je();
          break;
        case "full":
        case he.Full:
          F.info("Size to full"), b = he.Full, Qe(), i("full");
          break;
        case "real":
        case he.Real:
          F.info("Size to real"), b = he.Real, De(), i("real");
          break;
      }
  }
  function Qe() {
    const v = xe(), k = v.x, A = v.y;
    let T = p.width, N = p.height;
    const M = Math.min(k / p.width, A / p.height);
    T = T * M, N = N * M, R(`${A}px`, `${k}px`, "hidden"), T = T > 0 ? T : 0, N = N > 0 ? N : 0, _(`${N}px`, `${T}px`);
  }
  function Je(v = false) {
    const k = xe(), A = d.getBoundingClientRect(), T = k.x - A.x, N = k.y - A.y;
    let M = p.width, oe = p.height;
    if (!v || T < p.width || N < p.height) {
      const ae = Math.min(T / p.width, N / p.height);
      M = M * ae, oe = oe * ae;
    }
    M = M > 0 ? M : 0, oe = oe > 0 ? oe : 0, R("initial", "initial", "hidden"), _(`${oe}px`, `${M}px`), g();
  }
  function De() {
    const v = xe(), k = d.getBoundingClientRect(), A = v.x - k.x, T = v.y - k.y;
    A < p.width || T < p.height ? R(`${Math.min(T, p.height)}px`, `${Math.min(A, p.width)}px`, "auto") : R("initial", "initial", "initial"), _(`${p.height}px`, `${p.width}px`), g();
  }
  function $e(v) {
    const k = p == null ? void 0 : p.getBoundingClientRect(), A = (p == null ? void 0 : p.width) / k.width, T = (p == null ? void 0 : p.height) / k.height, N = {
      x: Math.round((v.clientX - k.left) * A),
      y: Math.round((v.clientY - k.top) * T)
    };
    a.updateMousePosition(N);
  }
  function ze(v, k) {
    a.mouseButtonState(v, k, true);
  }
  function Te(v) {
    a.mouseWheel(v);
  }
  function _e2(v) {
    p.focus({ preventScroll: true }), a.mouseIn(v);
  }
  function et(v) {
    a.mouseOut(v);
  }
  function Ie(v) {
    return a.sendKeyboardEvent(v), true;
  }
  function xe() {
    const v = window, k = document, A = k.documentElement, T = k.getElementsByTagName("body")[0], N = v.innerWidth ?? A.clientWidth ?? T.clientWidth, M = v.innerHeight ?? A.clientHeight ?? T.clientHeight;
    return { x: N, y: M };
  }
  async function tt() {
    F.info("Start canvas initialization..."), p.width = 800, p.height = 600, a.setCanvas(p), a.setOnCanvasResized(Se), O();
    let v = {
      irgUserInteraction: u.getExposedFunctions()
    };
    F.info("Component ready"), F.info("Dispatching ready event"), h.dispatchEvent(new CustomEvent("ready", {
      detail: v,
      bubbles: true,
      composed: true
    }));
  }
  function de() {
    var _a2;
    try {
      for (; Kt.length() > 0; )
        (_a2 = Kt.shift()) == null ? void 0 : _a2();
    } catch (v) {
      console.error("Failed to run the function queued for execution when the window received focus: " + v);
    }
  }
  Yi(async () => {
    Wt.set(false), F.verbose = r() === "true", F.info("Dom ready"), await tt(), l.initClipboard();
  }), pn(() => {
    window.removeEventListener("resize", V), window.removeEventListener("focus", de), Wt.set(true);
  });
  var J = Wn(), fe = Ot(J);
  let ye;
  var Ce = Ot(fe), I = Ot(Ce);
  return I.__mousemove = $e, I.__mousedown = [Un, ze], I.__mouseup = [zn, ze], I.__contextmenu = [In], Lt(I, (v) => p = v, () => p), At(Ce), At(fe), Lt(fe, (v) => d = v, () => d), At(J), Lt(J, (v) => h = v, () => h), Yr(() => {
    ye = hn(fe, 1, `screen-wrapper scale-${i() ?? ""}`, "svelte-1103xra", ye, {
      hidden: !B(c),
      "capturing-inputs": f
    }), ai(fe, "style", B(o)), ai(Ce, "style", B(w));
  }), st("mouseleave", I, (v) => {
    ze(v, false), et(v);
  }), st("mouseenter", I, (v) => {
    _e2(v);
  }), st("wheel", I, Te), st("selectstart", I, (v) => {
    v.preventDefault();
  }), Vi(t, J), Ki({
    get scale() {
      return i();
    },
    set scale(v) {
      i(v), Ke();
    },
    get verbose() {
      return r();
    },
    set verbose(v) {
      r(v), Ke();
    },
    get flexcenter() {
      return n();
    },
    set flexcenter(v) {
      n(v), Ke();
    },
    get module() {
      return s();
    },
    set module(v) {
      s(v), Ke();
    }
  });
}
on([
  "mousemove",
  "mousedown",
  "mouseup",
  "contextmenu"
]);
customElements.define("iron-remote-desktop", _n(
  tr,
  {
    scale: {},
    verbose: {},
    flexcenter: {},
    module: {}
  },
  [],
  [],
  false,
  (t) => class extends t {
    constructor() {
      super(), this.attachShadow({ mode: "open", delegatesFocus: true });
    }
  }
));
const qn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tr
}, Symbol.toStringTag, { value: "Module" }));
export {
  qn as default
};
