#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Yene 제품 이미지 다운로드 스크립트
# 이 파일을 실행하면 image/products/ 폴더에 이미지가 저장됩니다.

import urllib.request, os

SAVE_DIR = os.path.join(os.path.dirname(__file__), 'image', 'products')
os.makedirs(SAVE_DIR, exist_ok=True)

IMAGES = [
    "https://yene.co.kr/_data/product/201511/27/01375fc329a157c9b0e6825a80912c5f.jpg",
    "https://yene.co.kr/_data/product/201511/27/10e059a091e606c6fce5be8aeced36a2.jpg",
    "https://yene.co.kr/_data/product/201511/27/324de3a92567b4b798f2c62f7bb41590.jpg",
    "https://yene.co.kr/_data/product/201511/27/44f5a2b397a722f01ec7d32be998135f.jpg",
    "https://yene.co.kr/_data/product/201512/01/b248e029e0704d305e9d5f56dfe11eb1.jpg",
    "https://yene.co.kr/_data/product/201512/09/1adc19551473acaaae87819b47b13ba8.jpg",
    "https://yene.co.kr/_data/product/201512/09/9d1d26928ae8319621b473f26f9f2c88.jpg",
    "https://yene.co.kr/_data/product/201512/10/047b6637e71430593eb33927e09366a8.jpg",
    "https://yene.co.kr/_data/product/201512/10/1ce77e94d8dcad974381421241c5cb22.jpg",
    "https://yene.co.kr/_data/product/201512/10/2b3089cabc48627f9cd34d9917725810.jpg",
    "https://yene.co.kr/_data/product/201512/10/4cea803626a4703869c643f531134c64.jpg",
    "https://yene.co.kr/_data/product/201512/10/52a5e126e6c2d87a356980aa443b808e.jpg",
    "https://yene.co.kr/_data/product/201512/10/70555005d301bd2501a49698c0798689.jpg",
    "https://yene.co.kr/_data/product/201512/10/82b86748e7dd37201f500de2c4c64c31.jpg",
    "https://yene.co.kr/_data/product/201512/10/b0a036b080cd411360bdeabc622191a2.jpg",
    "https://yene.co.kr/_data/product/201512/10/ebcf9f794aabf23a1e1483934428dfd9.jpg",
    "https://yene.co.kr/_data/product/201601/06/7af8f06a14b6459270d94de3240d3c72.jpg",
    "https://yene.co.kr/_data/product/201901/31/a31a984fe2c85fe7beeecaf371f16aee.jpg",
    "https://yene.co.kr/_data/product/201902/07/1d0881a32b95758d2554e4a79c90b0ef.jpg",
    "https://yene.co.kr/_data/product/201902/07/3108419929baf69a536580731a3aa04d.jpg",
    "https://yene.co.kr/_data/product/201902/07/32a77d0cec0d62ff6df1b1bb54edb303.jpg",
    "https://yene.co.kr/_data/product/201902/07/9d773768e5c3d195408f2823597f6332.jpg",
    "https://yene.co.kr/_data/product/201902/07/bf421cd93c4d91666c70baa17ab375b1.jpg",
    "https://yene.co.kr/_data/product/201902/07/eebf50129bade6c8bb8a15f13c07004d.jpg",
    "https://yene.co.kr/_data/product/201904/22/bb89ec717c5d5046a11ddc45848c9c7a.jpg",
    "https://yene.co.kr/_data/product/201904/23/480062951d98f9eeb0acea1c292ad62a.jpg",
    "https://yene.co.kr/_data/product/201904/24/3224bdd974dc186696fe6b7c4e748b51.jpg",
    "https://yene.co.kr/_data/product/201907/25/12010d7be302effdfbbe13ae6a910df8.jpg",
    "https://yene.co.kr/_data/product/201904/25/16e761d6e23a887bb728e7f488063124.jpg",
    "https://yene.co.kr/_data/product/201904/25/5f095d9b9e2a303f67e14732780f3fce.jpg",
    "https://yene.co.kr/_data/product/201904/25/e0fae02e076cda864df8a34c06b98443.jpg",
    "https://yene.co.kr/_data/product/201904/25/e9289e050ea617c7154966adaedb4635.jpg",
    "https://yene.co.kr/_data/product/201907/29/141888d9e2a30c375f4641af4f6c0cdb.jpg",
    "https://yene.co.kr/_data/product/201907/29/50c069d9eb87199534019360308939ca.jpg",
    "https://yene.co.kr/_data/product/201907/29/b3151e1744c2cc4f759af55293677ad5.jpg",
    "https://yene.co.kr/_data/product/201908/13/0cd2519f5ecefa57005205a536f353a3.jpg",
    "https://yene.co.kr/_data/product/201908/13/f4da7aa25a6e8122a9e6d9cb3ad33915.jpg",
    "https://yene.co.kr/_data/product/202109/01/2c756c50823b318aafafde9d5e3dc3a5.jpg",
    "https://yene.co.kr/_data/product/202109/01/88fa19ea9e3da976d3c23eaa2894337c.jpg",
    "https://yene.co.kr/_data/product/202109/01/c447e845e488995bebd0b76c8fe01870.jpg",
    "https://yene.co.kr/_data/product/202109/03/0a813535368d984dcd68ad437110262c.jpg",
    "https://yene.co.kr/_data/product/202109/03/79819afbd7abb2d86843a0a77d133579.jpg",
    "https://yene.co.kr/_data/product/202109/03/9df1cdc61f55e6fe479eeaa7058c9d6b.jpg",
    "https://yene.co.kr/_data/product/202109/03/a66465ee9bafd090c54ea724c4898814.jpg",
    "https://yene.co.kr/_data/product/202109/03/e1bbc9de08bd9e103cf99524054fede9.jpg",
    "https://yene.co.kr/_data/product/202109/03/f7a77927909c8679b9f0eafb6a45d4a8.jpg",
    "https://yene.co.kr/_data/product/202203/04/51e8026471ef87ea3074ebc146eaea6f.jpg",
    "https://yene.co.kr/_data/product/202203/04/7323ad0a9a1b162d0095160c1f4d35fd.jpg",
    "https://yene.co.kr/_data/product/202203/04/f5664cf85a321bbdb4cb9f9d366ede3e.jpg",
    "https://yene.co.kr/_data/product/202211/01/5ead4eed8b57ae7d8c248f6d262f6c98.jpg",
    "https://yene.co.kr/_data/product/202211/01/9f01fffde25c6572714ed7862307acf4.jpg",
    "https://yene.co.kr/_data/product/202211/01/adf0570f5094efeca9d3f21d58fdd2b4.jpg",
    "https://yene.co.kr/_data/product/202211/01/c940d7ef43e67ffdbacb8913e8c19e60.jpg",
    "https://yene.co.kr/_data/product/202211/01/e3432398ef3b8a72e77c5366cf0033de.jpg",
    # 소모품 / 별매 무선리모컨
    "https://yene.co.kr/_data/product/201909/23/c66c4b5f70ada3073849a5dffb591f40.jpg",
    "https://yene.co.kr/_data/product/201909/23/86df9d6239bde5f64b7588caffc1d43f.png",
    "https://yene.co.kr/_data/product/201909/23/2c0258013b25272a553cf0a8ba83de06.png",
    "https://yene.co.kr/_data/product/201710/31/81534f3d95c5fa886e5ff96ad62a162d.jpg",
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Referer': 'https://yene.co.kr/'
}

ok, fail = 0, 0
for url in IMAGES:
    fname = url.split('/')[-1]
    dest = os.path.join(SAVE_DIR, fname)
    if os.path.exists(dest):
        print(f'SKIP: {fname}')
        ok += 1
        continue
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as r:
            with open(dest, 'wb') as f:
                f.write(r.read())
        print(f'OK: {fname}')
        ok += 1
    except Exception as e:
        print(f'FAIL: {fname} - {e}')
        fail += 1

print(f'\n완료: 성공 {ok} / 실패 {fail} / 총 {len(IMAGES)}')
