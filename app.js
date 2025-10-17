class ExamApp {
    constructor() {
        this.questions = this.initializeQuestions();
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.selectedAnswers = [];
        this.score = 0;
        this.wrongAnswers = [];
        this.currentSubject = '';
        this.isReviewMode = false;

        this.initializeElements();
        this.setupEventListeners();
        this.loadWrongAnswers();
        this.updateReviewButton();
    }

    initializeElements() {
        // Screens
        this.subjectSelectionScreen = document.getElementById('subject-selection');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultScreen = document.getElementById('result-screen');

        // Quiz elements
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.nextBtn = document.getElementById('next-btn');
        this.finishBtn = document.getElementById('finish-btn');
        this.currentQuestionSpan = document.getElementById('current-question');
        this.totalQuestionsSpan = document.getElementById('total-questions');
        this.currentSubjectSpan = document.getElementById('current-subject');
        this.progressFill = document.querySelector('.progress-fill');

        // Result elements
        this.scorePercentageSpan = document.getElementById('score-percentage');
        this.correctCountSpan = document.getElementById('correct-count');
        this.totalAnsweredSpan = document.getElementById('total-answered');
        this.resultCorrectSpan = document.getElementById('result-correct');
        this.resultIncorrectSpan = document.getElementById('result-incorrect');
        this.resultPercentageSpan = document.getElementById('result-percentage');
        this.wrongAnswersSection = document.getElementById('wrong-answers-section');
        this.wrongAnswersList = document.getElementById('wrong-answers-list');

        // Buttons
        this.restartBtn = document.getElementById('restart-btn');
        this.reviewMistakesBtn = document.getElementById('review-mistakes-btn');
        this.reviewWrongBtn = document.getElementById('review-wrong-btn');
    }

    setupEventListeners() {
        // Subject selection buttons
        document.querySelectorAll('.subject-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const subject = e.target.getAttribute('data-subject');
                this.startQuiz(subject);
            });
        });

        // Quiz navigation buttons
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.finishBtn.addEventListener('click', () => this.finishQuiz());

        // Result buttons
        this.restartBtn.addEventListener('click', () => this.restart());
        this.reviewMistakesBtn.addEventListener('click', () => this.startReviewMode());
        this.reviewWrongBtn.addEventListener('click', () => this.startReviewMode());
    }

    initializeQuestions() {
        return {
            '関係法規・制度': [
                {
                    question: "美容師法において、美容師の免許を与える権限を有するのはどれか。",
                    options: ["都道府県知事", "厚生労働大臣", "市町村長", "保健所長"],
                    correct: 1
                },
                {
                    question: "美容師法で定められた美容所の構造設備基準で、作業面の照度として適切なのはどれか。",
                    options: ["100ルクス以上", "150ルクス以上", "200ルクス以上", "300ルクス以上"],
                    correct: 2
                },
                {
                    question: "美容師免許の有効期間はどれか。",
                    options: ["5年間", "10年間", "15年間", "無期限"],
                    correct: 3
                },
                {
                    question: "美容所開設の届出を行う期限として正しいのはどれか。",
                    options: ["開設前", "開設後1週間以内", "開設後10日以内", "開設後1ヶ月以内"],
                    correct: 2
                },
                {
                    question: "美容師法で定められた美容所の面積基準として正しいのはどれか。",
                    options: ["13平方メートル以上", "15平方メートル以上", "18平方メートル以上", "20平方メートル以上"],
                    correct: 0
                },
                {
                    question: "美容師の業務として法的に認められていないのはどれか。",
                    options: ["パーマネントウェーブ", "毛染め", "まつげエクステンション", "眉毛のカット"],
                    correct: 2
                },
                {
                    question: "美容所の管理者となることができないのはどれか。",
                    options: ["美容師免許取得者", "理容師免許取得者", "美容師養成施設卒業者", "医師免許取得者"],
                    correct: 2
                },
                {
                    question: "美容師免許の登録を行う機関はどれか。",
                    options: ["厚生労働省", "理容師美容師試験研修センター", "都道府県", "保健所"],
                    correct: 1
                },
                {
                    question: "美容所における洗髪設備の基準として正しいのはどれか。",
                    options: ["従業者1人につき1個以上", "作業いす2台につき1個以上", "作業いす3台につき1個以上", "美容所1箇所につき1個以上"],
                    correct: 2
                },
                {
                    question: "美容師法において、美容の定義に含まれないのはどれか。",
                    options: ["パーマネントウェーブ", "結髪", "化粧", "まつ毛パーマ"],
                    correct: 3
                },
                {
                    question: "美容所の開設者が変更となった場合の届出期限はどれか。",
                    options: ["直ちに", "3日以内", "1週間以内", "10日以内"],
                    correct: 3
                },
                {
                    question: "美容師試験の受験資格として正しいのはどれか。",
                    options: ["高校卒業以上", "美容師養成施設卒業", "実務経験3年以上", "年齢18歳以上"],
                    correct: 1
                },
                {
                    question: "美容所における器具の消毒方法として認められていないのはどれか。",
                    options: ["煮沸消毒", "紫外線消毒", "アルコール消毒", "石鹸による洗浄"],
                    correct: 3
                },
                {
                    question: "美容師免許証の再交付を受ける場合に必要な手続きはどれか。",
                    options: ["申請のみ", "申請と手数料", "申請と診断書", "申請と身元保証書"],
                    correct: 1
                },
                {
                    question: "美容所の構造設備で義務付けられていないのはどれか。",
                    options: ["待合設備", "消毒設備", "採光設備", "駐車場"],
                    correct: 3
                },
                {
                    question: "美容師法の罰則で最も重い処分はどれか。",
                    options: ["業務停止", "免許取消", "罰金", "営業停止"],
                    correct: 1
                },
                {
                    question: "美容所における作業室の天井の高さの基準はどれか。",
                    options: ["2.1メートル以上", "2.3メートル以上", "2.5メートル以上", "規定なし"],
                    correct: 0
                },
                {
                    question: "美容師の義務として法定されていないのはどれか。",
                    options: ["免許証の携帯", "清潔保持", "技術向上", "伝染性疾患の予防"],
                    correct: 2
                },
                {
                    question: "美容所開設に必要な資格者はどれか。",
                    options: ["美容師のみ", "理容師のみ", "美容師又は理容師", "特に規定なし"],
                    correct: 2
                },
                {
                    question: "美容師養成施設の修業年限として正しいのはどれか。",
                    options: ["1年以上", "2年以上", "3年以上", "規定なし"],
                    correct: 1
                }
            ],
            '衛生管理': [
                {
                    question: "美容器具の消毒に最も効果的な方法はどれか。",
                    options: ["水洗い", "アルコール消毒", "紫外線照射", "煮沸消毒"],
                    correct: 3
                },
                {
                    question: "手指の消毒に適した消毒薬の濃度はどれか。",
                    options: ["エタノール50%", "エタノール70%", "エタノール85%", "エタノール95%"],
                    correct: 1
                },
                {
                    question: "美容所における消毒設備として必要でないのはどれか。",
                    options: ["消毒液容器", "紫外線消毒器", "蒸気消毒器", "オゾン消毒器"],
                    correct: 3
                },
                {
                    question: "器具の保管方法として適切でないのはどれか。",
                    options: ["清潔な容器に保管", "直射日光を避ける", "湿気の多い場所に保管", "密閉容器に保管"],
                    correct: 2
                },
                {
                    question: "タオルの消毒方法として最も適切なのはどれか。",
                    options: ["水洗いのみ", "洗濯後乾燥", "洗濯後煮沸消毒", "アルコール噴霧"],
                    correct: 2
                },
                {
                    question: "美容所の清掃頻度として適切なのはどれか。",
                    options: ["週1回", "月1回", "営業日毎日", "汚れた時のみ"],
                    correct: 2
                },
                {
                    question: "消毒薬の希釈濃度を維持するために重要なのはどれか。",
                    options: ["温度管理", "定期的な交換", "密閉保存", "全て重要"],
                    correct: 3
                },
                {
                    question: "血液が付着した器具の処理として最初に行うべきことはどれか。",
                    options: ["アルコール消毒", "水洗い", "血液の除去", "煮沸消毒"],
                    correct: 2
                },
                {
                    question: "美容所における廃棄物の処理で適切でないのはどれか。",
                    options: ["分別回収", "密閉容器に保管", "一般ごみと混合", "定期的な処理"],
                    correct: 2
                },
                {
                    question: "消毒効果を高めるために重要な要因でないのはどれか。",
                    options: ["温度", "時間", "濃度", "容器の材質"],
                    correct: 3
                },
                {
                    question: "美容器具の材質で消毒方法を選択する際の考慮点はどれか。",
                    options: ["価格", "耐熱性", "色", "重量"],
                    correct: 1
                },
                {
                    question: "作業後の手洗いの順序として正しいのはどれか。",
                    options: ["石鹸→水→アルコール", "水→石鹸→アルコール", "アルコール→石鹸→水", "石鹸→アルコール→水"],
                    correct: 1
                },
                {
                    question: "美容所の換気設備の目的として適切でないのはどれか。",
                    options: ["空気の浄化", "湿度の調節", "騒音の防止", "化学物質の除去"],
                    correct: 2
                },
                {
                    question: "消毒薬の保管場所として不適切なのはどれか。",
                    options: ["冷暗所", "直射日光の当たる場所", "換気の良い場所", "子供の手の届かない場所"],
                    correct: 1
                },
                {
                    question: "美容所における衛生検査の頻度として適切なのはどれか。",
                    options: ["年1回", "年2回", "月1回", "週1回"],
                    correct: 1
                },
                {
                    question: "器具の消毒後の確認事項として重要でないのはどれか。",
                    options: ["外観の清潔性", "消毒薬の臭い", "乾燥状態", "購入年月日"],
                    correct: 3
                },
                {
                    question: "美容所の床材として衛生的に不適切なのはどれか。",
                    options: ["タイル", "リノリウム", "カーペット", "塩化ビニル"],
                    correct: 2
                },
                {
                    question: "感染症予防のために最も重要な基本原則はどれか。",
                    options: ["器具の消毒", "手指の清潔", "環境の整備", "全て等しく重要"],
                    correct: 3
                },
                {
                    question: "美容所における水質検査の項目として含まれないのはどれか。",
                    options: ["大腸菌", "一般細菌", "pH値", "水温"],
                    correct: 3
                },
                {
                    question: "消毒の3原則に含まれないのはどれか。",
                    options: ["洗浄", "消毒", "保管", "検査"],
                    correct: 3
                }
            ],
            '保健': [
                {
                    question: "皮膚の最外層を構成するのはどれか。",
                    options: ["真皮", "皮下組織", "表皮", "筋膜"],
                    correct: 2
                },
                {
                    question: "毛髪の主成分はどれか。",
                    options: ["コラーゲン", "ケラチン", "エラスチン", "ヒアルロン酸"],
                    correct: 1
                },
                {
                    question: "毛周期の段階に含まれないのはどれか。",
                    options: ["成長期", "退行期", "休止期", "分裂期"],
                    correct: 3
                },
                {
                    question: "皮脂腺が最も多く分布する部位はどれか。",
                    options: ["頭部", "顔面のTゾーン", "背中", "腕"],
                    correct: 1
                },
                {
                    question: "毛髪の色を決定する主要因はどれか。",
                    options: ["血流量", "メラニン色素", "ケラチン濃度", "水分含有量"],
                    correct: 1
                },
                {
                    question: "皮膚のpH値として正常なのはどれか。",
                    options: ["pH4.5-6.5", "pH7.0", "pH7.5-8.5", "pH9.0-10.0"],
                    correct: 0
                },
                {
                    question: "毛髪の断面で最も外側にあるのはどれか。",
                    options: ["毛皮質", "毛髄質", "毛小皮", "毛根"],
                    correct: 2
                },
                {
                    question: "皮膚の機能として含まれないのはどれか。",
                    options: ["保護機能", "体温調節", "感覚機能", "消化機能"],
                    correct: 3
                },
                {
                    question: "毛髪の成長速度として正しいのはどれか。",
                    options: ["1日約0.3mm", "1日約0.5mm", "1日約1mm", "1日約2mm"],
                    correct: 0
                },
                {
                    question: "皮膚の再生周期（ターンオーバー）はどれくらいか。",
                    options: ["約14日", "約28日", "約42日", "約56日"],
                    correct: 1
                },
                {
                    question: "頭皮の毛穴数として正しいのはどれか。",
                    options: ["約5万個", "約10万個", "約15万個", "約20万個"],
                    correct: 1
                },
                {
                    question: "毛髪の水分含有量として正常なのはどれか。",
                    options: ["5-8%", "10-13%", "15-18%", "20-23%"],
                    correct: 1
                },
                {
                    question: "皮膚の厚さが最も薄い部位はどれか。",
                    options: ["手のひら", "足の裏", "まぶた", "頭皮"],
                    correct: 2
                },
                {
                    question: "毛髪の弾性に関与する結合はどれか。",
                    options: ["水素結合", "塩結合", "ジスルフィド結合", "全て関与"],
                    correct: 3
                },
                {
                    question: "皮膚の感覚受容器でないのはどれか。",
                    options: ["痛点", "圧点", "温点", "光点"],
                    correct: 3
                },
                {
                    question: "毛髪の形状を決定する要因はどれか。",
                    options: ["毛包の形", "毛母細胞の活動", "血流量", "ホルモンバランス"],
                    correct: 0
                },
                {
                    question: "皮膚のバリア機能で重要な成分はどれか。",
                    options: ["セラミド", "コラーゲン", "エラスチン", "ヒアルロン酸"],
                    correct: 0
                },
                {
                    question: "毛髪の老化現象として現れないのはどれか。",
                    options: ["白髪化", "毛髪の細化", "成長速度の低下", "毛穴の拡大"],
                    correct: 3
                },
                {
                    question: "皮膚の血管分布で正しいのはどれか。",
                    options: ["表皮に豊富", "真皮に豊富", "皮下組織のみ", "均等に分布"],
                    correct: 1
                },
                {
                    question: "毛髪の成長に必要な栄養素でないのはどれか。",
                    options: ["タンパク質", "ビタミンB群", "亜鉛", "炭水化物のみ"],
                    correct: 3
                }
            ],
            '香粧品化学': [
                {
                    question: "シャンプーの主要洗浄成分はどれか。",
                    options: ["界面活性剤", "防腐剤", "香料", "色素"],
                    correct: 0
                },
                {
                    question: "パーマネントウェーブ剤の第1剤の主成分はどれか。",
                    options: ["過酸化水素", "チオグリコール酸", "アンモニア", "過硫酸塩"],
                    correct: 1
                },
                {
                    question: "ヘアカラー剤の酸化剤として使用されるのはどれか。",
                    options: ["過酸化水素", "アンモニア", "フェニレンジアミン", "レゾルシン"],
                    correct: 0
                },
                {
                    question: "界面活性剤の分類に含まれないのはどれか。",
                    options: ["アニオン系", "カチオン系", "ノニオン系", "プロトン系"],
                    correct: 3
                },
                {
                    question: "化粧品の防腐剤として使用されないのはどれか。",
                    options: ["パラベン", "フェノキシエタノール", "ソルビン酸", "乳酸"],
                    correct: 3
                },
                {
                    question: "リンス・コンディショナーの主要成分はどれか。",
                    options: ["アニオン界面活性剤", "カチオン界面活性剤", "ノニオン界面活性剤", "両性界面活性剤"],
                    correct: 1
                },
                {
                    question: "ヘアスプレーの噴射剤として使用されるのはどれか。",
                    options: ["エタノール", "LPG", "グリセリン", "シリコーン"],
                    correct: 1
                },
                {
                    question: "化粧品のpH調整剤として使用されないのはどれか。",
                    options: ["クエン酸", "乳酸", "水酸化ナトリウム", "塩化ナトリウム"],
                    correct: 3
                },
                {
                    question: "パーマネントウェーブの原理で関与する結合はどれか。",
                    options: ["水素結合", "イオン結合", "ジスルフィド結合", "ファンデルワールス結合"],
                    correct: 2
                },
                {
                    question: "ヘアワックスの主要成分として使用されないのはどれか。",
                    options: ["ワックス", "油脂", "アルコール", "界面活性剤"],
                    correct: 3
                },
                {
                    question: "化粧品の安定化剤として使用されるのはどれか。",
                    options: ["酸化防止剤", "紫外線吸収剤", "キレート剤", "全て使用される"],
                    correct: 3
                },
                {
                    question: "ブリーチ剤の主成分はどれか。",
                    options: ["過酸化水素のみ", "過硫酸塩のみ", "アンモニアのみ", "過酸化水素と過硫酸塩"],
                    correct: 3
                },
                {
                    question: "化粧品の粘度調整剤として使用されないのはどれか。",
                    options: ["カルボマー", "キサンタンガム", "ヒアルロン酸", "メチルパラベン"],
                    correct: 3
                },
                {
                    question: "ヘアカラーの色素前駆体として使用されるのはどれか。",
                    options: ["酸性染料", "塩基性染料", "酸化染料中間体", "直接染料"],
                    correct: 2
                },
                {
                    question: "シャンプーの泡立ちを良くする成分はどれか。",
                    options: ["泡安定剤", "起泡剤", "界面活性剤", "全て関与"],
                    correct: 3
                },
                {
                    question: "化粧品の保湿成分として使用されないのはどれか。",
                    options: ["グリセリン", "ヒアルロン酸", "セラミド", "サリチル酸"],
                    correct: 3
                },
                {
                    question: "パーマネントウェーブ剤の第2剤の役割はどれか。",
                    options: ["還元", "酸化", "中和", "洗浄"],
                    correct: 1
                },
                {
                    question: "化粧品の香料として使用される成分の分類に含まれないのはどれか。",
                    options: ["天然香料", "合成香料", "調合香料", "薬用香料"],
                    correct: 3
                },
                {
                    question: "ヘアムースの発泡剤として使用されるのはどれか。",
                    options: ["窒素ガス", "二酸化炭素", "LPG", "全て使用可能"],
                    correct: 3
                },
                {
                    question: "化粧品の品質保持のために重要でない要因はどれか。",
                    options: ["温度管理", "光の遮断", "空気の遮断", "容器の色"],
                    correct: 3
                }
            ],
            '文化論': [
                {
                    question: "日本の伝統的な髪型「島田髷」が最も栄えた時代はいつか。",
                    options: ["平安時代", "鎌倉時代", "江戸時代", "明治時代"],
                    correct: 2
                },
                {
                    question: "西洋から日本にパーマネントウェーブが伝来したのはいつ頃か。",
                    options: ["明治初期", "大正時代", "昭和初期", "戦後"],
                    correct: 1
                },
                {
                    question: "美容師制度が法制化されたのはいつか。",
                    options: ["明治時代", "大正時代", "昭和22年", "昭和32年"],
                    correct: 2
                },
                {
                    question: "江戸時代の髪結いの職業で女性専門だったのはどれか。",
                    options: ["髪結い", "床屋", "湯女", "かもじ屋"],
                    correct: 3
                },
                {
                    question: "「美容」という言葉が初めて法令で使用されたのはいつか。",
                    options: ["明治時代", "大正時代", "昭和初期", "戦後"],
                    correct: 2
                },
                {
                    question: "平安時代の女性の理想的な髪の長さはどれくらいとされていたか。",
                    options: ["肩まで", "腰まで", "膝まで", "床まで"],
                    correct: 3
                },
                {
                    question: "江戸時代の男性の髪型で一般的だったのはどれか。",
                    options: ["ちょんまげ", "丁髷", "月代", "全て該当"],
                    correct: 3
                },
                {
                    question: "明治時代の散髪脱刀令が出されたのはいつか。",
                    options: ["明治4年", "明治6年", "明治8年", "明治10年"],
                    correct: 1
                },
                {
                    question: "戦時中の国民服装令により禁止された髪型はどれか。",
                    options: ["パーマネントウェーブ", "おかっぱ", "三つ編み", "全て禁止"],
                    correct: 0
                },
                {
                    question: "美容技術の近代化に大きく貢献したのはどの国の技術か。",
                    options: ["フランス", "イギリス", "ドイツ", "アメリカ"],
                    correct: 0
                },
                {
                    question: "江戸時代の化粧文化で「白粉」の主原料は何か。",
                    options: ["米粉", "鉛", "石灰", "真珠"],
                    correct: 1
                },
                {
                    question: "大正時代のモダンガールの髪型として流行したのはどれか。",
                    options: ["島田髷", "ボブカット", "ポニーテール", "アップスタイル"],
                    correct: 1
                },
                {
                    question: "美容業界の職業組合が初めて結成されたのはいつか。",
                    options: ["明治時代", "大正時代", "昭和初期", "戦後"],
                    correct: 1
                },
                {
                    question: "江戸時代の髪型で「兵庫髷」を結う対象となったのは誰か。",
                    options: ["未婚女性", "既婚女性", "武家女性", "町人女性"],
                    correct: 0
                },
                {
                    question: "戦後復興期に流行した髪型はどれか。",
                    options: ["勝山髷", "ボブカット", "ベリーショート", "ビクトリアロール"],
                    correct: 3
                },
                {
                    question: "美容文化の発展において重要な役割を果たした階層はどれか。",
                    options: ["武士階級", "商人階級", "農民階級", "職人階級"],
                    correct: 1
                },
                {
                    question: "昭和30年代に普及した美容技術はどれか。",
                    options: ["コールドパーマ", "ヘアカラー", "ドライヤー", "全て該当"],
                    correct: 3
                },
                {
                    question: "江戸時代の美容文化の中心地はどこか。",
                    options: ["江戸", "京都", "大阪", "全て重要"],
                    correct: 3
                },
                {
                    question: "明治時代の洋髪の普及に貢献した人物はどれか。",
                    options: ["鹿鳴館の貴婦人", "女子教育者", "外国人妻", "全て貢献"],
                    correct: 3
                },
                {
                    question: "現代美容業界の特徴として該当しないのはどれか。",
                    options: ["技術の多様化", "国際化の進展", "男性客の増加", "手作業への回帰のみ"],
                    correct: 3
                }
            ],
            '運営管理': [
                {
                    question: "美容所の経営において最も重要な要素はどれか。",
                    options: ["立地条件", "技術力", "接客サービス", "全て重要"],
                    correct: 3
                },
                {
                    question: "顧客管理システムで記録すべき最優先事項はどれか。",
                    options: ["氏名・連絡先", "施術履歴", "アレルギー情報", "全て記録すべき"],
                    correct: 3
                },
                {
                    question: "美容室の適正な座席稼働率はどれくらいか。",
                    options: ["60%", "70%", "80%", "90%"],
                    correct: 1
                },
                {
                    question: "スタッフの労働時間管理で重要でないのはどれか。",
                    options: ["実働時間", "休憩時間", "残業時間", "通勤時間"],
                    correct: 3
                },
                {
                    question: "美容室の在庫管理で最も重要な商品はどれか。",
                    options: ["シャンプー", "カラー剤", "パーマ液", "全て重要"],
                    correct: 3
                },
                {
                    question: "顧客の予約管理で避けるべきことはどれか。",
                    options: ["ダブルブッキング", "キャンセル待ち", "時間調整", "施術時間の短縮"],
                    correct: 0
                },
                {
                    question: "美容室の売上向上策として効果的でないのはどれか。",
                    options: ["メニューの多様化", "技術向上", "接客改善", "価格の大幅値下げ"],
                    correct: 3
                },
                {
                    question: "スタッフ教育で最も重要な要素はどれか。",
                    options: ["技術指導", "接客指導", "安全指導", "全て重要"],
                    correct: 3
                },
                {
                    question: "美容室の衛生管理責任者の要件はどれか。",
                    options: ["美容師資格", "管理者講習修了", "実務経験5年", "特に規定なし"],
                    correct: 1
                },
                {
                    question: "顧客満足度向上のために最も重要なのはどれか。",
                    options: ["技術の提供", "接客態度", "店舗環境", "全て重要"],
                    correct: 3
                },
                {
                    question: "美容室の事故防止対策として適切でないのはどれか。",
                    options: ["保険加入", "安全教育", "事故隠蔽", "マニュアル作成"],
                    correct: 2
                },
                {
                    question: "効果的な販売促進活動はどれか。",
                    options: ["割引サービス", "ポイントカード", "紹介制度", "全て効果的"],
                    correct: 3
                },
                {
                    question: "美容室の経営分析で重要な指標でないのはどれか。",
                    options: ["売上高", "客単価", "リピート率", "スタッフの年齢"],
                    correct: 3
                },
                {
                    question: "クレーム対応の基本原則として不適切なのはどれか。",
                    options: ["迅速な対応", "真摯な態度", "責任転嫁", "再発防止策"],
                    correct: 2
                },
                {
                    question: "美容室の人事管理で重要でない要素はどれか。",
                    options: ["能力開発", "評価制度", "働き方改革", "個人的趣味"],
                    correct: 3
                },
                {
                    question: "美容室の設備投資計画で考慮すべき要素はどれか。",
                    options: ["投資効果", "減価償却", "メンテナンス", "全て考慮"],
                    correct: 3
                },
                {
                    question: "顧客データの管理で最も注意すべきことはどれか。",
                    options: ["正確性", "最新性", "機密性", "全て重要"],
                    correct: 3
                },
                {
                    question: "美容室の競合分析で調査すべき項目でないのはどれか。",
                    options: ["価格設定", "サービス内容", "スタッフ数", "経営者の出身地"],
                    correct: 3
                },
                {
                    question: "効率的な予約システムの特徴として適切でないのはどれか。",
                    options: ["24時間受付", "変更可能", "確認機能", "複雑な操作"],
                    correct: 3
                },
                {
                    question: "美容室の経営理念として不適切なのはどれか。",
                    options: ["顧客第一", "技術向上", "利益最優先のみ", "社会貢献"],
                    correct: 2
                }
            ],
            '技術理論': [
                {
                    question: "カットの基本技法に含まれないのはどれか。",
                    options: ["ブラントカット", "レイヤーカット", "グラデーションカット", "パーマカット"],
                    correct: 3
                },
                {
                    question: "パーマネントウェーブの基本巻きで、毛束を90度に引き出して巻く方法はどれか。",
                    options: ["アンダーワインド", "オーバーワインド", "スパイラル巻き", "オンベース巻き"],
                    correct: 3
                },
                {
                    question: "ヘアカラーの基本的な色相環で、オレンジの補色はどれか。",
                    options: ["赤", "黄", "青", "紫"],
                    correct: 2
                },
                {
                    question: "ブローの基本技術で、髪にツヤを出すために重要なのはどれか。",
                    options: ["温度", "風量", "ブラシの角度", "全て重要"],
                    correct: 3
                },
                {
                    question: "シャンプーの基本手技で避けるべきことはどれか。",
                    options: ["爪を立てる", "マッサージ", "十分な泡立て", "お湯の温度調節"],
                    correct: 0
                },
                {
                    question: "セットローションの主な効果はどれか。",
                    options: ["保湿", "固定", "艶出し", "全ての効果"],
                    correct: 3
                },
                {
                    question: "カットの基本姿勢で正しいのはどれか。",
                    options: ["客を見下ろす", "客と同じ高さ", "客を見上げる", "角度は無関係"],
                    correct: 1
                },
                {
                    question: "パーマネントウェーブのテスト巻きの目的はどれか。",
                    options: ["カール状態確認", "毛髪診断", "薬剤選択", "全ての目的"],
                    correct: 3
                },
                {
                    question: "ヘアカラーのリタッチ施術で注意すべきことはどれか。",
                    options: ["既染部への薬剤付着", "根元の塗布不足", "放置時間の不足", "全て注意すべき"],
                    correct: 3
                },
                {
                    question: "ヘアスタイルの基本構成要素に含まれないのはどれか。",
                    options: ["シルエット", "質感", "動き", "価格"],
                    correct: 3
                },
                {
                    question: "ドライヤーの基本的な使用法で正しいのはどれか。",
                    options: ["高温で短時間", "低温で長時間", "温度と時間の調整", "温度は関係ない"],
                    correct: 2
                },
                {
                    question: "カットラインの種類で基本的でないのはどれか。",
                    options: ["ワンレングス", "グラデーション", "レイヤー", "ランダム"],
                    correct: 3
                },
                {
                    question: "パーマネントウェーブの薬剤塗布で重要なのはどれか。",
                    options: ["均一な塗布", "適量の使用", "迅速な作業", "全て重要"],
                    correct: 3
                },
                {
                    question: "ヘアカラーの明度を表す単位はどれか。",
                    options: ["トーン", "レベル", "彩度", "色相"],
                    correct: 1
                },
                {
                    question: "美容技術における安全管理で最も重要なのはどれか。",
                    options: ["器具の点検", "薬剤の管理", "皮膚の保護", "全て重要"],
                    correct: 3
                },
                {
                    question: "ヘアスタイルのデザイン要素として含まれないのはどれか。",
                    options: ["プロポーション", "バランス", "リズム", "価格"],
                    correct: 3
                },
                {
                    question: "シャンプー後のタオルドライで注意すべきことはどれか。",
                    options: ["強く擦らない", "十分な水分除去", "髪の保護", "全て注意すべき"],
                    correct: 3
                },
                {
                    question: "パーマネントウェーブの仕上がりに影響する要因でないのはどれか。",
                    options: ["ロッドの太さ", "薬剤の種類", "巻き方", "客の年齢"],
                    correct: 3
                },
                {
                    question: "ヘアカラーの色持ちを良くする方法として効果的でないのはどれか。",
                    options: ["アフターケア指導", "適切な薬剤選択", "頻繁な洗髪", "UV対策"],
                    correct: 2
                },
                {
                    question: "美容技術の上達のために最も重要なことはどれか。",
                    options: ["理論の学習", "実技の練習", "経験の蓄積", "全て重要"],
                    correct: 3
                }
            ],
            '実習理論': [
                {
                    question: "シャンプー実習で最初に確認すべきことはどれか。",
                    options: ["お湯の温度", "シャンプーの種類", "顧客の頭皮状態", "全て確認"],
                    correct: 3
                },
                {
                    question: "カット実習でのセクショニングの目的はどれか。",
                    options: ["作業効率化", "正確性向上", "安全確保", "全ての目的"],
                    correct: 3
                },
                {
                    question: "パーマ実習で最も重要な安全対策はどれか。",
                    options: ["皮膚テスト", "毛髪診断", "薬剤管理", "全て重要"],
                    correct: 3
                },
                {
                    question: "カラー実習前の毛髪診断で確認すべき項目でないのはどれか。",
                    options: ["毛髪の太さ", "既染歴", "ダメージ度", "顧客の趣味"],
                    correct: 3
                },
                {
                    question: "ブロー実習でのブラシ選択基準として適切でないのはどれか。",
                    options: ["毛髪の長さ", "仕上がりイメージ", "ブラシの価格", "毛髪の量"],
                    correct: 2
                },
                {
                    question: "セット実習でのヘアピンの使用方法として正しいのはどれか。",
                    options: ["見える位置に使用", "隠れる位置に使用", "どこでも良い", "使用しない"],
                    correct: 1
                },
                {
                    question: "実習中の事故防止で最も重要なのはどれか。",
                    options: ["器具の点検", "薬剤の確認", "安全な作業姿勢", "全て重要"],
                    correct: 3
                },
                {
                    question: "顧客対応実習で身につけるべきスキルでないのはどれか。",
                    options: ["コミュニケーション", "カウンセリング", "クレーム処理", "個人情報の詮索"],
                    correct: 3
                },
                {
                    question: "器具の消毒実習で学ぶべき内容として含まれないのはどれか。",
                    options: ["消毒方法", "消毒薬の種類", "器具の材質", "器具の購入価格"],
                    correct: 3
                },
                {
                    question: "実習評価の基準として適切でないのはどれか。",
                    options: ["技術の正確性", "作業時間", "安全性", "学生の外見"],
                    correct: 3
                },
                {
                    question: "シャンプー実習での適切な水圧はどれか。",
                    options: ["強い水圧", "弱い水圧", "顧客に合わせた調整", "一定の水圧"],
                    correct: 2
                },
                {
                    question: "カット実習でのハサミの持ち方として正しいのはどれか。",
                    options: ["親指と人差し指", "親指と中指", "人差し指と中指", "持ち方は自由"],
                    correct: 1
                },
                {
                    question: "パーマ実習でのロッド選択基準として重要でないのはどれか。",
                    options: ["毛髪の長さ", "希望のカール", "ロッドの色", "毛髪の太さ"],
                    correct: 2
                },
                {
                    question: "実習室の環境整備で重要でないのはどれか。",
                    options: ["清潔性", "安全性", "作業効率", "装飾性"],
                    correct: 3
                },
                {
                    question: "カラー実習での薬剤混合で注意すべきことはどれか。",
                    options: ["正確な分量", "十分な攪拌", "時間管理", "全て注意"],
                    correct: 3
                },
                {
                    question: "実習指導者の役割として適切でないのはどれか。",
                    options: ["技術指導", "安全管理", "評価", "代行作業"],
                    correct: 3
                },
                {
                    question: "ブロー実習でのドライヤーの温度設定として適切なのはどれか。",
                    options: ["常に高温", "常に低温", "毛髪状態に応じて調整", "温度は関係ない"],
                    correct: 2
                },
                {
                    question: "実習における時間管理で重要なのはどれか。",
                    options: ["速さ優先", "正確性優先", "バランス", "時間は無関係"],
                    correct: 2
                },
                {
                    question: "実習記録で記載すべき内容として不適切なのはどれか。",
                    options: ["技術内容", "使用薬剤", "反省点", "他の学生の批判"],
                    correct: 3
                },
                {
                    question: "実習の目標として最も重要なのはどれか。",
                    options: ["速度向上", "技術習得", "美的センス", "全ての向上"],
                    correct: 3
                }
            ]
        };
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    startQuiz(subject) {
        this.currentSubject = subject;

        if (subject === 'all') {
            // All subjects: select 55 questions randomly from all subjects
            const allQuestions = [];
            Object.keys(this.questions).forEach(subjectKey => {
                this.questions[subjectKey].forEach(q => {
                    allQuestions.push({...q, subject: subjectKey});
                });
            });
            this.currentQuestions = this.shuffleArray(allQuestions).slice(0, 55);
        } else {
            // Specific subject: use all 20 questions
            this.currentQuestions = this.shuffleArray(this.questions[subject].map(q => ({...q, subject})));
        }

        this.currentQuestionIndex = 0;
        this.selectedAnswers = [];
        this.score = 0;
        this.isReviewMode = false;

        this.showScreen(this.quizScreen);
        this.updateQuizHeader();
        this.displayQuestion();
    }

    startReviewMode() {
        const wrongAnswers = this.getWrongAnswers();
        if (wrongAnswers.length === 0) {
            alert('復習する問題がありません');
            return;
        }

        this.currentQuestions = wrongAnswers;
        this.currentQuestionIndex = 0;
        this.selectedAnswers = [];
        this.score = 0;
        this.isReviewMode = true;
        this.currentSubject = '復習モード';

        this.showScreen(this.quizScreen);
        this.updateQuizHeader();
        this.displayQuestion();
    }

    updateQuizHeader() {
        this.totalQuestionsSpan.textContent = this.currentQuestions.length;
        this.currentSubjectSpan.textContent = this.isReviewMode ? '復習モード' : 
            (this.currentSubject === 'all' ? '全科目ランダム' : this.currentSubject);
    }

    displayQuestion() {
        const question = this.currentQuestions[this.currentQuestionIndex];

        this.questionText.textContent = question.question;
        this.currentQuestionSpan.textContent = this.currentQuestionIndex + 1;

        const progress = ((this.currentQuestionIndex + 1) / this.currentQuestions.length) * 100;
        this.progressFill.style.width = progress + '%';

        this.optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = `${index + 1}. ${option}`;
            button.onclick = () => this.selectAnswer(index);
            this.optionsContainer.appendChild(button);
        });

        this.nextBtn.disabled = true;
        this.finishBtn.style.display = 'none';
        this.nextBtn.style.display = 'inline-block';
    }

    selectAnswer(selectedIndex) {
        const question = this.currentQuestions[this.currentQuestionIndex];
        const options = this.optionsContainer.querySelectorAll('.option-btn');

        options.forEach(btn => btn.disabled = true);

        // Show correct/incorrect styling
        options.forEach((btn, index) => {
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correct) {
                btn.classList.add('incorrect');
            }
        });

        const isCorrect = selectedIndex === question.correct;
        this.selectedAnswers[this.currentQuestionIndex] = {
            selected: selectedIndex,
            correct: question.correct,
            isCorrect: isCorrect
        };

        if (isCorrect) {
            this.score++;
        } else if (!this.isReviewMode) {
            this.addToWrongAnswers(question);
        }

        if (this.currentQuestionIndex === this.currentQuestions.length - 1) {
            this.finishBtn.style.display = 'inline-block';
            this.nextBtn.style.display = 'none';
        } else {
            this.nextBtn.disabled = false;
        }
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.displayQuestion();
    }

    finishQuiz() {
        this.showResult();
    }

    showResult() {
        const percentage = Math.round((this.score / this.currentQuestions.length) * 100);
        const incorrect = this.currentQuestions.length - this.score;

        this.scorePercentageSpan.textContent = percentage;
        this.correctCountSpan.textContent = this.score;
        this.totalAnsweredSpan.textContent = this.currentQuestions.length;
        this.resultCorrectSpan.textContent = this.score;
        this.resultIncorrectSpan.textContent = incorrect;
        this.resultPercentageSpan.textContent = percentage + '%';

        // Show wrong answers if any
        if (incorrect > 0) {
            this.displayWrongAnswers();
            this.wrongAnswersSection.style.display = 'block';
            this.reviewMistakesBtn.style.display = 'inline-block';
        } else {
            this.wrongAnswersSection.style.display = 'none';
            this.reviewMistakesBtn.style.display = 'none';
        }

        this.showScreen(this.resultScreen);
    }

    displayWrongAnswers() {
        this.wrongAnswersList.innerHTML = '';

        this.selectedAnswers.forEach((answer, index) => {
            if (!answer.isCorrect) {
                const question = this.currentQuestions[index];
                const div = document.createElement('div');
                div.className = 'wrong-answer-item';
                div.innerHTML = `
                    <div class="wrong-answer-question">${question.question}</div>
                    <div class="wrong-answer-details">
                        あなたの答え: ${question.options[answer.selected]}<br>
                        正解: ${question.options[answer.correct]}
                    </div>
                `;
                this.wrongAnswersList.appendChild(div);
            }
        });
    }

    addToWrongAnswers(question) {
        const wrongAnswers = this.getWrongAnswers();

        // Check if question already exists
        const exists = wrongAnswers.some(q => q.question === question.question);
        if (!exists) {
            wrongAnswers.push(question);
            localStorage.setItem('examWrongAnswers', JSON.stringify(wrongAnswers));
            this.updateReviewButton();
        }
    }

    getWrongAnswers() {
        const stored = localStorage.getItem('examWrongAnswers');
        return stored ? JSON.parse(stored) : [];
    }

    updateReviewButton() {
        const wrongAnswers = this.getWrongAnswers();
        if (wrongAnswers.length > 0) {
            this.reviewWrongBtn.style.display = 'inline-block';
        } else {
            this.reviewWrongBtn.style.display = 'none';
        }
    }

    loadWrongAnswers() {
        this.updateReviewButton();
    }

    restart() {
        // Clear wrong answers if in review mode
        if (this.isReviewMode) {
            localStorage.removeItem('examWrongAnswers');
            this.updateReviewButton();
        }

        this.showScreen(this.subjectSelectionScreen);
    }

    showScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ExamApp();
});