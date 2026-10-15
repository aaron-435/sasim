// AI 그림 매니페스트. 키 = IMAGE_PROMPTS_2026-10-14.md의 파일 이름(확장자 제외).
// 그림이 없는 키는 비워 두고, ArtImage가 코드 그림(fallback)을 그린다.
// ENTRIES 블록은 scripts/art-process.mts가 다시 쓴다. 손으로 고치지 않는다.

export const ART_KEYS = [
  // A. 일간 10 (큰 그림, 서버)
  "daymaster-gap", "daymaster-eul", "daymaster-byeong", "daymaster-jeong", "daymaster-mu",
  "daymaster-gi", "daymaster-gyeong", "daymaster-sin", "daymaster-im", "daymaster-gye",
  // B. 오행 5 (번들)
  "element-wood", "element-fire", "element-earth", "element-metal", "element-water",
  // C. 12지 12 (번들)
  "zodiac-rat", "zodiac-ox", "zodiac-tiger", "zodiac-rabbit", "zodiac-dragon", "zodiac-snake",
  "zodiac-horse", "zodiac-goat", "zodiac-monkey", "zodiac-rooster", "zodiac-dog", "zodiac-pig",
  // D. 모듈 표지 12 (서버)
  "module1-love", "module2-money", "module3-burnout", "module4-mask", "module5-followthrough",
  "module6-anger", "module7-sensitivity", "module8-sleep", "module9-family", "module10-focus",
  "module11-expression", "module12-freshstart",
  // E. 24절기 (서버)
  "term-01-ipchun", "term-02-usu", "term-03-gyeongchip", "term-04-chunbun", "term-05-cheongmyeong",
  "term-06-gogu", "term-07-ipha", "term-08-soman", "term-09-mangjong", "term-10-haji",
  "term-11-soseo", "term-12-daeseo", "term-13-ipchu", "term-14-cheoseo", "term-15-baengno",
  "term-16-chubun", "term-17-hallo", "term-18-sanggang", "term-19-ipdong", "term-20-soseol",
  "term-21-daeseol", "term-22-dongji", "term-23-sohan", "term-24-daehan",
  // F. 빈 화면·오류·로딩 (번들)
  "empty-journal", "empty-compat", "empty-reports", "error-network", "error-generic", "loading-calc",
  // G. 질감 (번들)
  "texture-hanji", "texture-celadon", "texture-ink",
] as const;

export type ArtKey = (typeof ART_KEYS)[number];

export type ArtEntry = {
  /** 번들이면 require() 결과(number), 서버면 { uri }. */
  source: number | { uri: string };
  width: number;
  height: number;
  blurhash?: string;
};

// ENTRIES-START
export const ART_MANIFEST: Partial<Record<ArtKey, ArtEntry>> = {
  "daymaster-gap": { source: { uri: "https://www.fatesaidapp.com/art/daymaster-gap.webp" }, width: 1024, height: 1024, blurhash: "U297X;9H00^*UFWU=GogXTbtHs%14WM|Rjxa" },
  "daymaster-eul": { source: { uri: "https://www.fatesaidapp.com/art/daymaster-eul.webp" }, width: 1024, height: 1024, blurhash: "U37w.uM|00-.nkNHWV-o01xt~nD+x@%1Mz57" },
  "daymaster-byeong": { source: { uri: "https://www.fatesaidapp.com/art/daymaster-byeong.webp" }, width: 1024, height: 1024, blurhash: "UKFFKNxt01R*9Hayt7fP00Rk~Ua|_1j@Rjof" },
  "daymaster-jeong": { source: { uri: "https://www.fatesaidapp.com/art/daymaster-jeong.webp" }, width: 1024, height: 1024, blurhash: "UHEx^Ht600Rk4=R*-nxZ00WB~UbH-.xZIpIp" },
  "daymaster-mu": { source: { uri: "https://www.fatesaidapp.com/art/daymaster-mu.webp" }, width: 1024, height: 1024, blurhash: "UED9*ES200xa01ofbIR*00ae-:R+~pWV%Ls:" },
  "daymaster-gi": { source: { uri: "https://www.fatesaidapp.com/art/daymaster-gi.webp" }, width: 1024, height: 1024, blurhash: "UADlyAoy02jG0M-.xZIV00Rk?ZR+~UD*kB%L" },
  "daymaster-gyeong": { source: { uri: "https://www.fatesaidapp.com/art/daymaster-gyeong.webp" }, width: 1024, height: 1024, blurhash: "UCE.^94:00~VE2jaRjWB00%L-:E2-.s:xaW;" },
  "daymaster-sin": { source: { uri: "https://www.fatesaidapp.com/art/daymaster-sin.webp" }, width: 1024, height: 1024, blurhash: "UABWYkj[00RkD+t6s.WV00Rk~os.~BIpS4oe" },
  "daymaster-im": { source: { uri: "https://www.fatesaidapp.com/art/daymaster-im.webp" }, width: 1024, height: 1024, blurhash: "U3AAgW-U0157D*%2f+IV00Iq_2-o~o9anO^%" },
  "daymaster-gye": { source: { uri: "https://www.fatesaidapp.com/art/daymaster-gye.webp" }, width: 1024, height: 1024, blurhash: "U37UL%?Y0001%LD+xs?s02D+?s_KE1-.RlIW" },
  "element-wood": { source: require("../../assets/art/element-wood.webp"), width: 512, height: 512, blurhash: "U79tMkRk00%KRkt6bFM|00WW~oaxD*ja-obH" },
  "element-fire": { source: require("../../assets/art/element-fire.webp"), width: 512, height: 512, blurhash: "UCBg3coe00R+9GjZ%ebb00R*~oxZ?aofIVV[" },
  "element-earth": { source: require("../../assets/art/element-earth.webp"), width: 512, height: 512, blurhash: "U76[5Co102W;IVfjt6ay00WV~on+_1f7M{oe" },
  "element-metal": { source: require("../../assets/art/element-metal.webp"), width: 512, height: 512, blurhash: "UBBM-z?F000g^%xZ9bIp00E3~o?F0MIp^j={" },
  "element-water": { source: require("../../assets/art/element-water.webp"), width: 512, height: 512, blurhash: "UA9jx_s.00R+M{t6t7M|00R*~ot6%fM|RQ%2" },
  "zodiac-rat": { source: require("../../assets/art/zodiac-rat.webp"), width: 512, height: 512, blurhash: "UME.C94:02~VRjNHtQaK0M-o={E1t7%1IVg3" },
  "zodiac-ox": { source: require("../../assets/art/zodiac-ox.webp"), width: 512, height: 512, blurhash: "UNGkdl4;9uad4:WCoft701xt%1t6~VxZWBIo" },
  "zodiac-tiger": { source: require("../../assets/art/zodiac-tiger.webp"), width: 512, height: 512, blurhash: "U9F#mt010ME2wuIpI=xZ00-:~AxuE+-:=]bI" },
  "zodiac-rabbit": { source: require("../../assets/art/zodiac-rabbit.webp"), width: 512, height: 512, blurhash: "UHFhnl9a01~U02Na%2%10fxu%1IV~UxYE2NJ" },
  "zodiac-dragon": { source: require("../../assets/art/zodiac-dragon.webp"), width: 512, height: 512, blurhash: "U7IEqV0200~p4oE3-:s,00M|t5?Zt6M{oc?G" },
  "zodiac-snake": { source: require("../../assets/art/zodiac-snake.webp"), width: 512, height: 512, blurhash: "ULEx^MD*4;%L9aNGfk%20Mof%1t6~Ut7WBM|" },
  "zodiac-horse": { source: require("../../assets/art/zodiac-horse.webp"), width: 512, height: 512, blurhash: "U9FYA9010M%1-o4;I;%100o#^*ax4:~U?FRk" },
  "zodiac-goat": { source: require("../../assets/art/zodiac-goat.webp"), width: 512, height: 512, blurhash: "UFGuR99Z00?G9GIV%L%100WV~VxZ9G-ot6M{" },
  "zodiac-monkey": { source: require("../../assets/art/zodiac-monkey.webp"), width: 512, height: 512, blurhash: "U8C?119a00~V={NG0g~B00t7~BIB9tNI~BD*" },
  "zodiac-rooster": { source: require("../../assets/art/zodiac-rooster.webp"), width: 512, height: 512, blurhash: "UADlWS0M02}@?GNu$%RQ00%L^%NH9as.NGxu" },
  "zodiac-dog": { source: require("../../assets/art/zodiac-dog.webp"), width: 512, height: 512, blurhash: "UPF}$K9a02~V9aM|xt%19axu-nIV-nxtRkIp" },
  "zodiac-pig": { source: require("../../assets/art/zodiac-pig.webp"), width: 512, height: 512, blurhash: "UBFE[cxE01RkWY%1s.ay00tR~UWBr=9bNdoe" },
  "module1-love": { source: { uri: "https://www.fatesaidapp.com/art/module1-love.webp" }, width: 1024, height: 1280, blurhash: "U67B7Vt6RjWE~o%LjZRk00%LxtRk00M{t7tQ" },
  "module2-money": { source: { uri: "https://www.fatesaidapp.com/art/module2-money.webp" }, width: 1024, height: 1280, blurhash: "U89jcJof02j[~oayD*s:00M|^%xt01Rk^*W;" },
  "module3-burnout": { source: { uri: "https://www.fatesaidapp.com/art/module3-burnout.webp" }, width: 1024, height: 1280, blurhash: "UHCs53-;D+9a~U%2IpE102M{axRk4:E2kBxt" },
  "module4-mask": { source: { uri: "https://www.fatesaidapp.com/art/module4-mask.webp" }, width: 1024, height: 1280, blurhash: "UBA^5cxt0MNc~VxtIpR+00oy?GjF01Ip%1n$" },
  "module5-followthrough": { source: { uri: "https://www.fatesaidapp.com/art/module5-followthrough.webp" }, width: 1024, height: 1280, blurhash: "UFB:$*WY9GMx~p-;IoMx01?ax[R+9GRPxtbv" },
  "module6-anger": { source: { uri: "https://www.fatesaidapp.com/art/module6-anger.webp" }, width: 1024, height: 1280, blurhash: "U897Rt~o9a4o~o?aR*9Z04s=%LM|NJRlt7s:" },
  "module7-sensitivity": { source: { uri: "https://www.fatesaidapp.com/art/module7-sensitivity.webp" }, width: 1024, height: 1280, blurhash: "U9Ad7Rx@01xa~oxuNGRk00s:~VIo00IV-UkB" },
  "module8-sleep": { source: { uri: "https://www.fatesaidapp.com/art/module8-sleep.webp" }, width: 1024, height: 1280, blurhash: "U897U+%29GD*~oxaIVE100jZt7Rk01Rjxtxu" },
  "module9-family": { source: { uri: "https://www.fatesaidapp.com/art/module9-family.webp" }, width: 1024, height: 1280, blurhash: "U89QERaf03kC~noLD+Wp0Nof-UR*NHkBV@ni" },
  "module10-focus": { source: { uri: "https://www.fatesaidapp.com/art/module10-focus.webp" }, width: 1024, height: 1280, blurhash: "U35Eyx-:9GD*~o-:D+IV4oaeofof019G-:%M" },
  "module11-expression": { source: { uri: "https://www.fatesaidapp.com/art/module11-expression.webp" }, width: 1024, height: 1280, blurhash: "UE9@6B%L9HNG~UxtE2M|9Ha}ofM|0MNH%LRk" },
  "module12-freshstart": { source: { uri: "https://www.fatesaidapp.com/art/module12-freshstart.webp" }, width: 1024, height: 1280, blurhash: "UBB:c=oy01%2?ZoeIos:00jZ~VNG4pay%MNH" },
  "term-01-ipchun": { source: { uri: "https://www.fatesaidapp.com/art/term-01-ipchun.webp" }, width: 1536, height: 1024, blurhash: "U68;b:?G^*az009a9at6~V-:%2Rkb@IVNGt6" },
  "term-02-usu": { source: { uri: "https://www.fatesaidapp.com/art/term-02-usu.webp" }, width: 1536, height: 1024, blurhash: "UEBpd*^%-Uoe01E2IpofE2WCxZRk~UxZRka|" },
  "term-03-gyeongchip": { source: { uri: "https://www.fatesaidapp.com/art/term-03-gyeongchip.webp" }, width: 1536, height: 1024, blurhash: "U77-frR*Rk-o03t6xZNHIVWCRkRk~nRkWCxZ" },
  "term-04-chunbun": { source: { uri: "https://www.fatesaidapp.com/art/term-04-chunbun.webp" }, width: 1536, height: 1024, blurhash: "U78||Z%Lja-o01WC%1RkE2V[E2NH~UNHkBxZ" },
  "term-05-cheongmyeong": { source: { uri: "https://www.fatesaidapp.com/art/term-05-cheongmyeong.webp" }, width: 1536, height: 1024, blurhash: "U79juy~U^%?F0057E3E2%1%1eos:?ZE3WVbH" },
  "term-06-gogu": { source: { uri: "https://www.fatesaidapp.com/art/term-06-gogu.webp" }, width: 1536, height: 1024, blurhash: "U68}3o%KjZ-:01Rkt6M|4;oeWBM|~nIVM|xt" },
  "term-07-ipha": { source: { uri: "https://www.fatesaidapp.com/art/term-07-ipha.webp" }, width: 1536, height: 1024, blurhash: "U68ql}--bu%L01kCxtM|4qRRMzWV~oIVM|xt" },
  "term-08-soman": { source: { uri: "https://www.fatesaidapp.com/art/term-08-soman.webp" }, width: 1536, height: 1024, blurhash: "U67nm#xsafxt02M}t6WCIVt6M|R*~nxZt6oe" },
  "term-09-mangjong": { source: { uri: "https://www.fatesaidapp.com/art/term-09-mangjong.webp" }, width: 1536, height: 1024, blurhash: "UA9H5*oeIpxt02ofxaRkIVRjbHj[~Us.Rkof" },
  "term-10-haji": { source: { uri: "https://www.fatesaidapp.com/art/term-10-haji.webp" }, width: 1536, height: 1024, blurhash: "U58Xdq%1M}-.01NHxZn%9HjZRkD+_K%1xsxt" },
  "term-11-soseo": { source: { uri: "https://www.fatesaidapp.com/art/term-11-soseo.webp" }, width: 1536, height: 1024, blurhash: "U68#Aw%eNaIp00NGxZxtD+M|V[oe~o-.R*E2" },
  "term-12-daeseo": { source: { uri: "https://www.fatesaidapp.com/art/term-12-daeseo.webp" }, width: 1536, height: 1024, blurhash: "U684uI--W-t601NHxtf6M|WBM|WC~UV[RkjZ" },
  "term-13-ipchu": { source: { uri: "https://www.fatesaidapp.com/art/term-13-ipchu.webp" }, width: 1536, height: 1024, blurhash: "U35OsNx@t6X903j]j@jsD+M|V[sm~nf5WCR-" },
  "term-14-cheoseo": { source: { uri: "https://www.fatesaidapp.com/art/term-14-cheoseo.webp" }, width: 1536, height: 1024, blurhash: "U36*,D_1t6x[00D*xZjZMybbD+M|~oxZ%Kf6" },
  "term-15-baengno": { source: { uri: "https://www.fatesaidapp.com/art/term-15-baengno.webp" }, width: 1536, height: 1024, blurhash: "UD97h9t6bHkC4;WCt6oL9HfRM|Rk~UWBkBj[" },
  "term-16-chubun": { source: { uri: "https://www.fatesaidapp.com/art/term-16-chubun.webp" }, width: 1536, height: 1024, blurhash: "U98;l7%eWXoy02RkxZafD+RkM|az~no0oLay" },
  "term-17-hallo": { source: { uri: "https://www.fatesaidapp.com/art/term-17-hallo.webp" }, width: 1536, height: 1024, blurhash: "U697kHnh%1x[00x[oeM|E3D+IWt6~UxtafR+" },
  "term-18-sanggang": { source: { uri: "https://www.fatesaidapp.com/art/term-18-sanggang.webp" }, width: 1536, height: 1024, blurhash: "U69%w_%1M|-.00W.-.RkRRWE9aM|~oM|xaxt" },
  "term-19-ipdong": { source: { uri: "https://www.fatesaidapp.com/art/term-19-ipdong.webp" }, width: 1536, height: 1024, blurhash: "U56RfDRkod%L02t6ofIpNHbbNHt6~UIpn%t6" },
  "term-20-soseol": { source: { uri: "https://www.fatesaidapp.com/art/term-20-soseol.webp" }, width: 1536, height: 1024, blurhash: "U57-fv^*t6R*01E2t6%1MzWCE2Ip~oxZ%1t6" },
  "term-21-daeseol": { source: { uri: "https://www.fatesaidapp.com/art/term-21-daeseol.webp" }, width: 1536, height: 1024, blurhash: "U8Amn.^%%L-.00E2NGRkM|%1s:M|~oE2Ipt6" },
  "term-22-dongji": { source: { uri: "https://www.fatesaidapp.com/art/term-22-dongji.webp" }, width: 1536, height: 1024, blurhash: "UA9QgI~B-oxt024;IpRk$%-oxZoe%eM|RkWC" },
  "term-23-sohan": { source: { uri: "https://www.fatesaidapp.com/art/term-23-sohan.webp" }, width: 1536, height: 1024, blurhash: "U6A^UG-:n%-:00E2t6Ip^*%1Ipfk~oWB-ns:" },
  "term-24-daehan": { source: { uri: "https://www.fatesaidapp.com/art/term-24-daehan.webp" }, width: 1536, height: 1024, blurhash: "UCB3[@WBRk%200R*oeWBt7%Lt6M|~oIVM|%1" },
  "empty-journal": { source: require("../../assets/art/empty-journal.webp"), width: 512, height: 512, blurhash: "UMC$=ext01M{WBWCfjt600NG~Vxat6offRRj" },
  "empty-compat": { source: require("../../assets/art/empty-compat.webp"), width: 512, height: 512, blurhash: "U98X5ut602ayRkayofay00Rk~okBx@j[Rkj[" },
  "empty-reports": { source: require("../../assets/art/empty-reports.webp"), width: 512, height: 512, blurhash: "UFAAHxof01WBRkWBoft700WC~Vj[xtt7RkIV" },
  "error-network": { source: require("../../assets/art/error-network.webp"), width: 512, height: 512, blurhash: "U99tAI9G00~pRjozM|n$4p%L-:IVIpae?GIW" },
  "error-generic": { source: require("../../assets/art/error-generic.webp"), width: 512, height: 512, blurhash: "UA8D^Faf01t6M|NGt6%L02of~VM}%L%LM|4;" },
  "loading-calc": { source: require("../../assets/art/loading-calc.webp"), width: 512, height: 512, blurhash: "UABz2lW=00xFM{j@t6WV00n%~pNb%2ayRjof" },
  "texture-hanji": { source: require("../../assets/art/texture-hanji.webp"), width: 1024, height: 1024, blurhash: "U02?KQtQoftQozj[j[ayfjj[fjj[tQj[ayj[" },
  "texture-celadon": { source: require("../../assets/art/texture-celadon.webp"), width: 1024, height: 1024, blurhash: "U01pt{o|f6o|o|fkfQfjjbf7fQfQo|fjfQfj" },
  "texture-ink": { source: require("../../assets/art/texture-ink.webp"), width: 1024, height: 1024, blurhash: "U039iBtja|yBtjoyj[fjj[jtj[kBtkafkBoy" },
};
// ENTRIES-END
