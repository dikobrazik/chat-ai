"use client";

import Script from "next/script";
import { useIsMetricaEnabled } from "./useIsMetricaEnabled";

export const Metrica = () => {
  const isMetricaEnabled = useIsMetricaEnabled();

  if (!isMetricaEnabled) return null;

  return (
    <Script id="yandex-metrica" type="text/javascript">
      {`(function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=112550340', 'ym');

    ym(112550340, 'init', {ssr:true, webvisor:false, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: (function(u){u.searchParams.delete('query');return u.href})(new URL(location.href)), accurateTrackBounce:true, trackLinks:false, sendTitle:false});`}
    </Script>
  );
};
