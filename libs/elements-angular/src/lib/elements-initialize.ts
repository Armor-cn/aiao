import { IAiaoElementsConfig } from '@aiao/elements';
import { applyPolyfills, defineCustomElements } from '@aiao/elements/loader';
import { NgZone } from '@angular/core';

import { raf } from './util/util';

let didInitialize = false;

export function initialize(config: IAiaoElementsConfig, doc: Document, zone: NgZone) {
  return (): any => {
    const win = doc.defaultView as any;
    if (win) {
      if (didInitialize) {
        console.warn('Make sure AiaoElementsModule.forRoot() is just called once.');
      }
      didInitialize = true;
      const aiao = (win.aiao = win.aiao || {});
      const elements: any = (aiao['elements'] = aiao['elements'] || {});

      elements.config = {
        ...config,
        _zoneGate: (h: any) => zone.run(h)
      };

      const aelFn =
        '__zone_symbol__addEventListener' in (doc.body as any) ? '__zone_symbol__addEventListener' : 'addEventListener';

      return applyPolyfills().then(() => {
        return defineCustomElements(win, {
          exclude: ['ion-tabs', 'ion-tab'],
          syncQueue: true,
          raf,
          jmp: (h: any) => zone.runOutsideAngular(h),
          ael(elm, eventName, cb, opts) {
            (elm as any)[aelFn](eventName, cb, opts);
          },
          rel(elm, eventName, cb, opts) {
            elm.removeEventListener(eventName, cb, opts);
          }
        });
      });
    }
  };
}
