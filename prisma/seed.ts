import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const PEPPER = process.env.PASSWORD_PEPPER ?? "";
const SALT_ROUNDS = 12;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password + PEPPER, SALT_ROUNDS);
}

const DUMMY_USERS = [
  { accountId: "tanaka_taro", name: "田中太郎" },
  { accountId: "suzuki_hana", name: "鈴木花子" },
  { accountId: "sato_ken", name: "佐藤健" },
  { accountId: "takahashi_ai", name: "高橋愛" },
  { accountId: "yamamoto_yui", name: "山本結衣" },
  { accountId: "nakamura_ryo", name: "中村涼" },
  { accountId: "kobayashi_mei", name: "小林芽衣" },
  { accountId: "watanabe_sho", name: "渡辺翔" },
  { accountId: "ito_mika", name: "伊藤美香" },
  { accountId: "kato_daisuke", name: "加藤大輔" },
  { accountId: "yoshida_rin", name: "吉田凛" },
  { accountId: "yamada_haruto", name: "山田陽翔" },
  { accountId: "sasaki_yuki", name: "佐々木雪" },
  { accountId: "matsumoto_sora", name: "松本空" },
  { accountId: "inoue_kaede", name: "井上楓" },
  { accountId: "kimura_ren", name: "木村蓮" },
  { accountId: "hayashi_mio", name: "林澪" },
  { accountId: "shimizu_aoi", name: "清水葵" },
  { accountId: "morita_nao", name: "森田尚" },
  { accountId: "fujita_sakura", name: "藤田桜" },
  { accountId: "ogawa_haruki", name: "小川春樹" },
  { accountId: "ikeda_nana", name: "池田奈々" },
  { accountId: "hashimoto_sota", name: "橋本颯太" },
  { accountId: "nishimura_risa", name: "西村莉沙" },
  { accountId: "maeda_takumi", name: "前田匠" },
  { accountId: "abe_yuna", name: "阿部結奈" },
  { accountId: "goto_shun", name: "後藤駿" },
  { accountId: "miyamoto_kana", name: "宮本花奈" },
  { accountId: "ishida_ryota", name: "石田涼太" },
  { accountId: "sakamoto_yuka", name: "坂本由佳" },
  { accountId: "okada_tomoki", name: "岡田友樹" },
  { accountId: "taniguchi_ami", name: "谷口亜美" },
  { accountId: "ueda_keita", name: "上田慶太" },
  { accountId: "nagata_shiori", name: "永田栞" },
  { accountId: "sugiyama_riku", name: "杉山陸" },
  { accountId: "kondo_moe", name: "近藤萌" },
  { accountId: "mori_daiki", name: "森大輝" },
  { accountId: "mizuno_saki", name: "水野咲" },
  { accountId: "naito_yusei", name: "内藤悠生" },
  { accountId: "kawashima_hina", name: "川島陽菜" },
  { accountId: "fukuda_kazuki", name: "福田一輝" },
  { accountId: "tani_manami", name: "谷愛南" },
  { accountId: "sekine_kosei", name: "関根光生" },
  { accountId: "kubo_aya", name: "久保彩" },
  { accountId: "shimada_naoto", name: "島田直人" },
  { accountId: "hasegawa_rina", name: "長谷川里奈" },
  { accountId: "makino_yuto", name: "牧野勇斗" },
  { accountId: "yamaguchi_sena", name: "山口世南" },
  { accountId: "ohara_tatsuya", name: "大原達也" },
  { accountId: "kuwabara_koharu", name: "桑原こはる" },
  { accountId: "aoki_nobuhiro", name: "青木信宏" },
  { accountId: "sudo_hikari", name: "須藤光" },
  { accountId: "chiba_masaya", name: "千葉雅也" },
  { accountId: "endo_asuka", name: "遠藤飛鳥" },
  { accountId: "takamatsu_jin", name: "高松仁" },
  { accountId: "noda_haruka", name: "野田春花" },
  { accountId: "iwata_shunsuke", name: "岩田俊介" },
  { accountId: "tsuchiya_yuri", name: "土屋ゆり" },
  { accountId: "koyama_taishi", name: "小山泰士" },
  { accountId: "saito_misaki", name: "齋藤美咲" },
  { accountId: "hirano_ryusei", name: "平野龍生" },
  { accountId: "oishi_natsuki", name: "大石夏輝" },
  { accountId: "murata_koki", name: "村田晃希" },
  { accountId: "takeda_fuka", name: "武田風香" },
  { accountId: "nakajima_soshi", name: "中島奏士" },
  { accountId: "kawai_minori", name: "河合みのり" },
  { accountId: "tsuji_ryoma", name: "辻龍馬" },
  { accountId: "oyama_kasumi", name: "大山かすみ" },
  { accountId: "harada_daisuke", name: "原田大輔" },
  { accountId: "kinoshita_rio", name: "木下莉緒" },
  { accountId: "ozaki_takahiro", name: "尾崎貴博" },
  { accountId: "tomita_mei", name: "富田芽衣" },
  { accountId: "nishio_yuya", name: "西尾優也" },
  { accountId: "fujimoto_kotone", name: "藤本琴音" },
  { accountId: "wada_akira", name: "和田晃" },
  { accountId: "ota_nanase", name: "太田七瀬" },
  { accountId: "kuroki_shinnosuke", name: "黒木新之介" },
  { accountId: "araki_miyu", name: "荒木美夕" },
  { accountId: "ueno_sosuke", name: "上野宗輔" },
  { accountId: "hara_kanon", name: "原花音" },
  { accountId: "tamura_hiroki", name: "田村広樹" },
  { accountId: "yoshimura_yuna", name: "吉村優奈" },
  { accountId: "miyazaki_rentaro", name: "宮崎蓮太郎" },
  { accountId: "konno_chihiro", name: "今野千尋" },
  { accountId: "taguchi_masaki", name: "田口雅樹" },
  { accountId: "imai_kotomi", name: "今井琴美" },
  { accountId: "kitamura_yuichiro", name: "北村裕一郎" },
  { accountId: "mitsui_rina", name: "三井里奈" },
  { accountId: "toyoda_kazuma", name: "豊田和馬" },
  { accountId: "ogata_airi", name: "緒方愛里" },
  { accountId: "maehara_tsubasa", name: "前原翼" },
  { accountId: "shibata_yuka", name: "柴田由加" },
  { accountId: "hoshi_tomoya", name: "星友哉" },
  { accountId: "fukushima_nozomi", name: "福島希" },
  { accountId: "uchida_shota", name: "内田翔太" },
  { accountId: "yano_miharu", name: "矢野美晴" },
  { accountId: "nomura_ryuichi", name: "野村龍一" },
  { accountId: "hirose_yuna", name: "広瀬結奈" },
];

// 有名アニメTMDB ID
const ANIME_IDS = [
  1429, // 進撃の巨人
  85937, // 鬼滅の刃
  95479, // 呪術廻戦
  31911, // 鋼の錬金術師FULLMETAL ALCHEMIST
  13916, // DEATH NOTE
  46298, // HUNTER×HUNTER (2011)
  42509, // Steins;Gate
  75214, // ヴァイオレット・エヴァーガーデン
  65942, // Re:ゼロから始める異世界生活
  61663, // 四月は君の嘘
  61374, // 東京喰種
  30991, // カウボーイビバップ
  63926, // ワンパンマン
  65930, // 僕のヒーローアカデミア
  120089, // SPY×FAMILY
  114410, // チェンソーマン
  65249, // 僕だけがいない街
  39218, // 魔法少女まどか☆マギカ
  65336, // 3月のライオン
  74091, // 宝石の国
];

// 有名映画TMDB ID
const MOVIE_IDS = [
  550, // ファイト・クラブ
  238, // ゴッドファーザー
  155, // ダークナイト
  680, // パルプ・フィクション
  13, // フォレスト・ガンプ
  278, // ショーシャンクの空に
  424, // シンドラーのリスト
  240, // ゴッドファーザーPART II
  20453, // きっとうまくいく
  122, // ロード・オブ・ザ・リング王の帰還
  637, // ライフ・イズ・ビューティフル
  489, // グッド・ウィル・ハンティング
  372058, // 君の名は。
  129, // 千と千尋の神隠し
  508442, // ソウルフル・ワールド
  490132, // グリーンブック
  100, // ロック、ストック&トゥー・スモーキング・バレルズ
  15, // 市民ケーン
  769, // グッドフェローズ
  603, // マトリックス
];

// 有名TVドラマTMDB ID
const TV_IDS = [
  1396, // ブレイキング・バッド
  66732, // ストレンジャー・シングス未知の世界
  1399, // ゲーム・オブ・スローンズ
  60735, // THE FLASH／フラッシュ
  44217, // ヴァイキング～海の覇者たち～
  63333, // ラスト・キングダム
  61222, // ボージャック・ホースマン
  62560, // MR. ROBOT / ミスター・ロボット
];

// mediaTypeのint値（1:アニメ, 2:映画, 3:ドラマ）
const MEDIA_TYPE_INT = { anime: 1, movie: 2, drama: 3 } as const;

type MediaEntry = {
  workId: number;
  mediaType: number;
};

const ALL_WORKS: MediaEntry[] = [
  ...ANIME_IDS.map((id) => ({ workId: id, mediaType: MEDIA_TYPE_INT.anime })),
  ...MOVIE_IDS.map((id) => ({ workId: id, mediaType: MEDIA_TYPE_INT.movie })),
  ...TV_IDS.map((id) => ({ workId: id, mediaType: MEDIA_TYPE_INT.drama })),
];

// 配列からランダムにcount件を選択する（Fisher-Yatesシャッフル）
function pickRandom<T>(array: T[], count: number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // indexの入れ替え
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

// stateのint値（1:見たい, 2:見てる, 3:見た）
const STATES = [1, 2, 3] as const;

const DESCRIPTIONS = [
  "面白かった！続きが気になる",
  "神作品。何度でも見返したい",
  "友達に勧められて見始めた。ハマってる",
  "泣いた...感動が止まらない",
  "作画がとにかくすごい",
  "原作も読みたくなった",
  "OPとEDが最高すぎる",
  "2周目突入。細かい伏線に気づく",
  "キャラクターが全員好き",
  "ストーリーの構成が秀逸",
  "",
  "",
  "",
];

// ratingのint値（100:最高, 10:好き, 1:普通）
const RATINGS = [100, 10, 1] as const;

const REVIEWS = [
  "最初から最後まで楽しめた作品。キャラクターの成長が素晴らしく、見終わった後の余韻が心地よい。",
  "作画と音楽が最高レベル。何度見ても新しい発見があり、飽きることがない傑作。",
  "ストーリーは良いが、中盤のテンポが少し遅く感じた。それでも総合的には満足。",
  "友達に勧めたくなる作品。一緒に語り合いたい内容が詰まっている。",
  "原作ファンも納得のクオリティ。アニメ化・映像化として非常に丁寧な仕上がり。",
  "伏線の回収が見事で、2周目はまた違う楽しみ方ができる。脚本の質が高い。",
  "キャラクター一人ひとりに深みがあり、感情移入しやすかった。特に主人公の成長が感動的。",
  "世界観の作り込みが素晴らしい。設定資料集も読みたいと思わせる密度がある。",
  "テンポが良くて、一気見してしまった。次の展開が気になって止まらなかった。",
  "感動のラストだった。制作陣への敬意を感じる作品。長い時間をかけて見る価値がある。",
];

async function main() {
  console.log("既存データを削除中...");

  // 削除順序:外部キー参照先を後に削除する
  await prisma.userWorkReview.deleteMany({});
  await prisma.userWorkState.deleteMany({});
  await prisma.follow.deleteMany({});
  await prisma.userAccount.deleteMany({});

  console.log("Seeding...");

  const seedPassword = process.env.SEED_PASSWORD;
  if (seedPassword == null) {
    throw new Error("環境変数SEED_PASSWORDが設定されていません");
  }
  const passwordHash = await hashPassword(seedPassword);

  // ダミーユーザー作成
  const users = await Promise.all(
    DUMMY_USERS.map((dummy) =>
      prisma.userAccount.create({
        data: {
          accountId: dummy.accountId,
          name: dummy.name,
          passwordHash,
          description: `${dummy.name}です。映画・アニメ・ドラマが大好きです！`,
        },
      }),
    ),
  );

  console.log(`${users.length}人のユーザーを作成しました。`);

  // フォロー関係を生成（各ユーザーが先頭FOLLOW_COUNT人をフォロー）
  const FOLLOW_COUNT = 10;
  const followData: { userId: string; followingId: string }[] = [];

  for (let i = 0; i < users.length; i++) {
    let count = 0;
    for (let j = 0; j < users.length && count < FOLLOW_COUNT; j++) {
      if (j !== i) {
        followData.push({
          userId: users[i].userId,
          followingId: users[j].userId,
        });
        count++;
      }
    }
  }

  await prisma.follow.createMany({ data: followData });
  console.log(`${followData.length}件のフォロー関係を作成しました。`);

  // 作品状態とレビューのダミーデータ作成
  const WORKS_PER_USER = 10;
  const now = Date.now();

  const workStateData: Prisma.UserWorkStateCreateManyInput[] = [];
  const reviewData: Prisma.UserWorkReviewCreateManyInput[] = [];

  for (const user of users) {
    // ALL_WORKSからランダムにWORKS_PER_USER件を選択する
    const selected = pickRandom(ALL_WORKS, WORKS_PER_USER);

    for (let i = 0; i < selected.length; i++) {
      const work = selected[i];
      // 過去30日間の中で均等な間隔の時刻を生成する
      const hoursAgo = Math.floor((i * 30 * 24) / WORKS_PER_USER);
      const updatedAt = new Date(now - hoursAgo * 60 * 60 * 1000);

      workStateData.push({
        userId: user.userId,
        workId: work.workId,
        mediaType: work.mediaType,
        state: STATES[i % STATES.length],
        description: DESCRIPTIONS[i % DESCRIPTIONS.length],
        createdAt: updatedAt,
        updatedAt,
      });

      reviewData.push({
        userId: user.userId,
        workId: work.workId,
        mediaType: work.mediaType,
        rating: RATINGS[i % RATINGS.length],
        review: REVIEWS[i % REVIEWS.length],
        createdAt: updatedAt,
        updatedAt,
      });
    }
  }

  await prisma.userWorkState.createMany({ data: workStateData });
  console.log(`${workStateData.length}件の作品状態データを作成しました。`);

  await prisma.userWorkReview.createMany({ data: reviewData });
  console.log(`${reviewData.length}件のレビューデータを作成しました。`);

  console.log(
    `Seeded ${users.length} users, ${followData.length} follows, ${workStateData.length} work states, ${reviewData.length} reviews.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
