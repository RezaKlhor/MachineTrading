const axios = require("axios");
const static = require("./all_preds");
const lastWeek = require("./lastWeek.json");
const aiObserve = require("./ai-observe");
const lastMonth = require("./lastMonth.json");
const fs= require('fs')
const path= require('path')
const {
  TableReportProviderServerAddress,
  AiReportResolverServerAddress,
} = require("../appconfig.json");
const serverAddress =
  require("../appconfig.json").AiReportResolverServerAddress;
const stocks = require("../Database/stocks.json");
const { ReturnDocument } = require("mongodb");
const { json } = require("sequelize");
async function getAiData() {
  // const result = await axios.get(`${AiReportResolverServerAddress}/get_all`, {
  //   headers: {
  //     accept: "application/json",
  //     "accept-language": "en-US,en;q=0.9,fa;q=0.8",
  //     "proxy-connection": "keep-alive",
  //     "upgrade-insecure-requests": "1",
  //     cookie: "csrftoken=f8K3nPDeXeMN2spRhiwM7pxxqYZ9tJH7",
  //   },
  // });
  // return result.data;
  return {
    "68203878405672734": {
      weekly: {
        trend: 0,
        sureness: 0.8453624844551086,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 58.54479706121655,
      },
      monthly: {
        trend: 1,
        sureness: 0.861574649810791,
      },
    },
    10120557300120078: {
      weekly: {
        trend: 0,
        sureness: 0.8765794634819031,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 54.40553841141927,
      },
      monthly: {
        trend: 1,
        sureness: 0.8710066676139832,
      },
    },
    "65490886290565185": {
      weekly: {
        trend: 0,
        sureness: 0.37860891222953796,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 58.54736060125687,
      },
      monthly: {
        trend: 1,
        sureness: 0.9819677472114563,
      },
    },
    "44013656953678055": {
      weekly: {
        trend: 0,
        sureness: 0.9666851758956909,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 59.3120331177488,
      },
      monthly: {
        trend: 1,
        sureness: 0.8969429731369019,
      },
    },
    "45284811973404357": {
      weekly: {
        trend: 1,
        sureness: 0.7209123373031616,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 39.54755256185308,
      },
      monthly: {
        trend: 1,
        sureness: 0.9255862832069397,
      },
    },
    "18865325633315847": {
      weekly: {
        trend: 1,
        sureness: 0.6645366549491882,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 45.826888061128564,
      },
      monthly: {
        trend: 1,
        sureness: 0.9025381803512573,
      },
    },
    52455922800537930: {
      weekly: {
        trend: 0,
        sureness: 0.46186354756355286,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 57.43442982993507,
      },
      monthly: {
        trend: 1,
        sureness: 0.9675360321998596,
      },
    },
    971068957336171: {
      weekly: {
        trend: 1,
        sureness: 0.9268771409988403,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 58.196622900925384,
      },
      monthly: {
        trend: 1,
        sureness: 0.7888403534889221,
      },
    },
    "54369290104873523": {
      weekly: {
        trend: 0,
        sureness: 0.5105845928192139,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 46.998056331649416,
      },
      monthly: {
        trend: 1,
        sureness: 0.9946169257164001,
      },
    },
    "56574323121551263": {
      weekly: {
        trend: 0,
        sureness: 0.9345842003822327,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 56.732095076585004,
      },
      monthly: {
        trend: 1,
        sureness: 0.9916982650756836,
      },
    },
    27668158733246204: {
      weekly: {
        trend: 0,
        sureness: 0.893622636795044,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 56.666877027601004,
      },
      monthly: {
        trend: 1,
        sureness: 0.9161126613616943,
      },
    },
    10831074117626896: {
      weekly: {
        trend: 0,
        sureness: 0.9337055087089539,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 60.09017569846397,
      },
      monthly: {
        trend: 1,
        sureness: 0.9580942988395691,
      },
    },
    3050342257199174: {
      weekly: {
        trend: 2,
        sureness: 0.39754804968833923,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 50.56319880997763,
      },
      monthly: {
        trend: 1,
        sureness: 0.6143432855606079,
      },
    },
    793710053482057: {
      weekly: {
        trend: 0,
        sureness: 0.8320990204811096,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 54.55854126996174,
      },
      monthly: {
        trend: 1,
        sureness: 0.990117609500885,
      },
    },
    "37222720235819361": {
      weekly: {
        trend: 0,
        sureness: 0.5503532886505127,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 51.821504244580865,
      },
      monthly: {
        trend: 1,
        sureness: 0.9597477316856384,
      },
    },
    "33293588228706998": {
      weekly: {
        trend: 2,
        sureness: 0.5723050832748413,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 44.9771193554625,
      },
      monthly: {
        trend: 1,
        sureness: 0.7938175201416016,
      },
    },
    15521712617204216: {
      weekly: {
        trend: 0,
        sureness: 0.7798052430152893,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 59.563945520667914,
      },
      monthly: {
        trend: 1,
        sureness: 0.8709670901298523,
      },
    },
    "53449700212786324": {
      weekly: {
        trend: 2,
        sureness: 0.7151672840118408,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 46.65857248241082,
      },
      monthly: {
        trend: 1,
        sureness: 0.9801259636878967,
      },
    },
    "71666521540545716": {
      weekly: {
        trend: 2,
        sureness: 0.6377002596855164,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 59.45503552945008,
      },
      monthly: {
        trend: 1,
        sureness: 0.7093465328216553,
      },
    },
    17059960254855208: {
      weekly: {
        trend: 2,
        sureness: 0.6275873184204102,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 58.19152030686382,
      },
      monthly: {
        trend: 1,
        sureness: 0.8759172558784485,
      },
    },
    "67522512921942106": {
      weekly: {
        trend: 0,
        sureness: 0.9023551344871521,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 52.98907072508968,
      },
      monthly: {
        trend: 1,
        sureness: 0.9523329734802246,
      },
    },
    "70309338813767186": {
      weekly: {
        trend: 2,
        sureness: 0.5829824209213257,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 42.60822651674971,
      },
      monthly: {
        trend: 1,
        sureness: 0.9629125595092773,
      },
    },
    "71672399601682259": {
      weekly: {
        trend: 0,
        sureness: 0.8851579427719116,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 61.096507690626986,
      },
      monthly: {
        trend: 1,
        sureness: 0.618209719657898,
      },
    },
    "28320293733348826": {
      weekly: {
        trend: 0,
        sureness: 0.5313463807106018,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 48.613923694938414,
      },
      monthly: {
        trend: 2,
        sureness: 0.5922623872756958,
      },
    },
    2318736941376687: {
      weekly: {
        trend: 1,
        sureness: 0.4692765772342682,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 45.4283905425109,
      },
      monthly: {
        trend: 2,
        sureness: 0.5181124806404114,
      },
    },
    "23441366113375722": {
      weekly: {
        trend: 0,
        sureness: 0.6067599058151245,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 50.44551443621461,
      },
      monthly: {
        trend: 1,
        sureness: 0.9755699634552002,
      },
    },
    "70474983732269112": {
      weekly: {
        trend: 0,
        sureness: 0.8806357979774475,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 51.01028056349606,
      },
      monthly: {
        trend: 1,
        sureness: 0.9526380896568298,
      },
    },
    "45452221088910484": {
      weekly: {
        trend: 0,
        sureness: 0.4598444104194641,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 57.99430004389462,
      },
      monthly: {
        trend: 1,
        sureness: 0.9780339598655701,
      },
    },
    "19471788163911687": {
      weekly: {
        trend: 2,
        sureness: 0.7210167050361633,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 62.25802283746277,
      },
      monthly: {
        trend: 2,
        sureness: 0.5327607989311218,
      },
    },
    "20966291817819448": {
      weekly: {
        trend: 0,
        sureness: 0.8036363124847412,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 56.19748401625397,
      },
      monthly: {
        trend: 1,
        sureness: 0.9191619157791138,
      },
    },
    "9481703061634967": {
      weekly: {
        trend: 0,
        sureness: 0.43259555101394653,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 55.39590860284355,
      },
      monthly: {
        trend: 1,
        sureness: 0.6717689633369446,
      },
    },
    28450080638096732: {
      weekly: {
        trend: 0,
        sureness: 0.5352969169616699,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 56.15854733669607,
      },
      monthly: {
        trend: 1,
        sureness: 0.8769333958625793,
      },
    },
    8725363201030474: {
      weekly: {
        trend: 0,
        sureness: 0.5826943516731262,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 59.225278254323264,
      },
      monthly: {
        trend: 2,
        sureness: 0.5315831899642944,
      },
    },
    "32347247706508046": {
      weekly: {
        trend: 0,
        sureness: 0.9500405192375183,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 51.742227836512036,
      },
      monthly: {
        trend: 1,
        sureness: 0.5371049046516418,
      },
    },
    778253364357513: {
      weekly: {
        trend: 0,
        sureness: 0.46600306034088135,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 37.5149382132804,
      },
      monthly: {
        trend: 2,
        sureness: 0.6141836047172546,
      },
    },
    "62258804563636993": {
      weekly: {
        trend: 0,
        sureness: 0.4469166696071625,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 49.473911598324776,
      },
      monthly: {
        trend: 1,
        sureness: 0.9374667406082153,
      },
    },
    "59866041653103343": {
      weekly: {
        trend: 2,
        sureness: 0.5614311695098877,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 57.128872771817676,
      },
      monthly: {
        trend: 1,
        sureness: 0.6515336632728577,
      },
    },
    "16422980660132735": {
      weekly: {
        trend: 0,
        sureness: 0.9494603872299194,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 54.63061835616827,
      },
      monthly: {
        trend: 1,
        sureness: 0.8828209638595581,
      },
    },
    "10568944722570445": {
      weekly: {
        trend: 0,
        sureness: 0.35208699107170105,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 51.53104959987104,
      },
      monthly: {
        trend: 1,
        sureness: 0.9168688058853149,
      },
    },
    "20562694899904339": {
      weekly: {
        trend: 0,
        sureness: 0.9562851786613464,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 48.63569621928037,
      },
      monthly: {
        trend: 1,
        sureness: 0.9863907098770142,
      },
    },
    "20560887114747719": {
      weekly: {
        trend: 0,
        sureness: 0.8226360082626343,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 48.048163475468755,
      },
      monthly: {
        trend: 1,
        sureness: 0.9212568998336792,
      },
    },
    "22839330962768817": {
      weekly: {
        trend: 0,
        sureness: 0.9454699158668518,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 61.15381671854902,
      },
      monthly: {
        trend: 1,
        sureness: 0.9820138812065125,
      },
    },
    "35424116338766901": {
      weekly: {
        trend: 2,
        sureness: 0.45594140887260437,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 61.43098300921726,
      },
      monthly: {
        trend: 1,
        sureness: 0.9581547975540161,
      },
    },
    "47702059190622416": {
      weekly: {
        trend: 0,
        sureness: 0.8000321984291077,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 57.88140215695115,
      },
      monthly: {
        trend: 1,
        sureness: 0.7364707589149475,
      },
    },
    "52382684379473036": {
      weekly: {
        trend: 0,
        sureness: 0.7139338850975037,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 54.31970848701895,
      },
      monthly: {
        trend: 1,
        sureness: 0.9684371948242188,
      },
    },
    "35543935713999309": {
      weekly: {
        trend: 0,
        sureness: 0.5952023267745972,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 50.511857272004804,
      },
      monthly: {
        trend: 1,
        sureness: 0.9738500714302063,
      },
    },
    67690708346979840: {
      weekly: {
        trend: 2,
        sureness: 0.7610599994659424,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 41.33783823344857,
      },
      monthly: {
        trend: 1,
        sureness: 0.8660771250724792,
      },
    },
    13281937213456378: {
      weekly: {
        trend: 0,
        sureness: 0.7673788666725159,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 53.5356078942625,
      },
      monthly: {
        trend: 1,
        sureness: 0.8560820817947388,
      },
    },
    "40025799067544201": {
      weekly: {
        trend: 0,
        sureness: 0.5744776129722595,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 49.59306031465531,
      },
      monthly: {
        trend: 1,
        sureness: 0.7564634084701538,
      },
    },
    "58035444268544991": {
      weekly: {
        trend: 1,
        sureness: 0.5240981578826904,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 50.831895583366894,
      },
      monthly: {
        trend: 1,
        sureness: 0.9772384762763977,
      },
    },
    "34641719089573667": {
      weekly: {
        trend: 0,
        sureness: 0.8488991260528564,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 60.49841703568514,
      },
      monthly: {
        trend: 1,
        sureness: 0.9469062089920044,
      },
    },
    2400322364771558: {
      weekly: {
        trend: 2,
        sureness: 0.552405595779419,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 56.20871423278003,
      },
      monthly: {
        trend: 2,
        sureness: 0.5403679609298706,
      },
    },
    "57600064931636077": {
      weekly: {
        trend: 0,
        sureness: 0.5011815428733826,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 54.587929114514246,
      },
      monthly: {
        trend: 2,
        sureness: 0.7296408414840698,
      },
    },
    "50792786683910016": {
      weekly: {
        trend: 0,
        sureness: 0.6064992547035217,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 60.02119691992916,
      },
      monthly: {
        trend: 2,
        sureness: 0.7170688509941101,
      },
    },
    "65023851436340574": {
      weekly: {
        trend: 0,
        sureness: 0.8726052045822144,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 57.24029106688516,
      },
      monthly: {
        trend: 1,
        sureness: 0.8574178218841553,
      },
    },
    "12387472624849835": {
      weekly: {
        trend: 2,
        sureness: 0.44671833515167236,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 55.82647068426013,
      },
      monthly: {
        trend: 1,
        sureness: 0.9877920746803284,
      },
    },
    "50503654866742146": {
      weekly: {
        trend: 1,
        sureness: 0.528643786907196,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 57.69245938863605,
      },
      monthly: {
        trend: 1,
        sureness: 0.9812508821487427,
      },
    },
    "27405735172634593": {
      weekly: {
        trend: 2,
        sureness: 0.5169470906257629,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 54.331480193293416,
      },
      monthly: {
        trend: 2,
        sureness: 0.4938966929912567,
      },
    },
    "41122066907413786": {
      weekly: {
        trend: 0,
        sureness: 0.5801188349723816,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 56.598913939869824,
      },
      monthly: {
        trend: 1,
        sureness: 0.9755257964134216,
      },
    },
    "67141987086032267": {
      weekly: {
        trend: 0,
        sureness: 0.5038102865219116,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 59.49730207428719,
      },
      monthly: {
        trend: 1,
        sureness: 0.9198307394981384,
      },
    },
    "70289374539527245": {
      weekly: {
        trend: 2,
        sureness: 0.5016559362411499,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 43.12435821630061,
      },
      monthly: {
        trend: 1,
        sureness: 0.9098451137542725,
      },
    },
    "28854105556435129": {
      weekly: {
        trend: 0,
        sureness: 0.9014577269554138,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 38.085295086493716,
      },
      monthly: {
        trend: 1,
        sureness: 0.7604045867919922,
      },
    },
    "46982154647719707": {
      weekly: {
        trend: 2,
        sureness: 0.5793139934539795,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 54.41776744332882,
      },
      monthly: {
        trend: 1,
        sureness: 0.6045200824737549,
      },
    },
    15930821245168534: {
      weekly: {
        trend: 2,
        sureness: 0.7410852909088135,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 61.37772591676128,
      },
      monthly: {
        trend: 1,
        sureness: 0.8980810642242432,
      },
    },
    2589887561569709: {
      weekly: {
        trend: 0,
        sureness: 0.8077521920204163,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 40.45818747050362,
      },
      monthly: {
        trend: 1,
        sureness: 0.5966159701347351,
      },
    },
    4507558419857064: {
      weekly: {
        trend: 1,
        sureness: 0.5367836356163025,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 56.681012188031325,
      },
      monthly: {
        trend: 0,
        sureness: 0.5462109446525574,
      },
    },
    "34721884030854211": {
      weekly: {
        trend: 2,
        sureness: 0.6255661249160767,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 56.19938488461593,
      },
      monthly: {
        trend: 1,
        sureness: 0.6755653023719788,
      },
    },
    10145129193828624: {
      weekly: {
        trend: 0,
        sureness: 0.9835912585258484,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 47.23349489737302,
      },
      monthly: {
        trend: 1,
        sureness: 0.8421956300735474,
      },
    },
    "47841327496247362": {
      weekly: {
        trend: 2,
        sureness: 0.4502350687980652,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 53.258853632141836,
      },
      monthly: {
        trend: 2,
        sureness: 0.60569167137146,
      },
    },
    3542690854557886: {
      weekly: {
        trend: 2,
        sureness: 0.7384344339370728,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 64.16293180367086,
      },
      monthly: {
        trend: 1,
        sureness: 0.6157914996147156,
      },
    },
    "68117765376081366": {
      weekly: {
        trend: 1,
        sureness: 0.4573492109775543,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 68.19472327432251,
      },
      monthly: {
        trend: 1,
        sureness: 0.6242185831069946,
      },
    },
    27096851668435724: {
      weekly: {
        trend: 0,
        sureness: 0.9723051190376282,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 57.14920543078123,
      },
      monthly: {
        trend: 1,
        sureness: 0.992300271987915,
      },
    },
    "59486059679335017": {
      weekly: {
        trend: 0,
        sureness: 0.7554793953895569,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 53.84772455718845,
      },
      monthly: {
        trend: 1,
        sureness: 0.8859115839004517,
      },
    },
    "31188566503248753": {
      weekly: {
        trend: 2,
        sureness: 0.4909546971321106,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 56.61162608576679,
      },
      monthly: {
        trend: 1,
        sureness: 0.9561207890510559,
      },
    },
    "34718633636164421": {
      weekly: {
        trend: 1,
        sureness: 0.4761638343334198,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 53.95542638415678,
      },
      monthly: {
        trend: 1,
        sureness: 0.9340771436691284,
      },
    },
    "28788598290160782": {
      weekly: {
        trend: 0,
        sureness: 0.6246414184570312,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 50.25363547727466,
      },
      monthly: {
        trend: 1,
        sureness: 0.9973030090332031,
      },
    },
    "40611478183231802": {
      weekly: {
        trend: 2,
        sureness: 0.5644491314888,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 64.7823163697233,
      },
      monthly: {
        trend: 1,
        sureness: 0.6624739766120911,
      },
    },
    "50100062518826135": {
      weekly: {
        trend: 2,
        sureness: 0.5550922751426697,
      },
      weekly_oscillator: {
        trend: 1,
        sureness: 40.11054144240915,
      },
      monthly: {
        trend: 1,
        sureness: 0.809053897857666,
      },
    },
    16673205196919832: {
      weekly: {
        trend: 1,
        sureness: 0.6541374921798706,
      },
      weekly_oscillator: {
        trend: 2,
        sureness: 61.01611063146348,
      },
      monthly: {
        trend: 2,
        sureness: 0.6259121298789978,
      },
    },
    1: {
      weekly: {
        trend: 0,
        sureness: 0.9117536544799805,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 55.39212750286721,
      },
      monthly: {
        trend: 1,
        sureness: 0.9497725963592529,
      },
    },
    57: {
      weekly: {
        trend: 0,
        sureness: 0.9417200684547424,
      },
      weekly_oscillator: {
        trend: 0,
        sureness: 59.57504714027715,
      },
      monthly: {
        trend: 1,
        sureness: 0.9764056205749512,
      },
    },
  };
}
async function getStockPrediction(request, response, next) {
  try {
    const data = await getAiData();
    const stockName = request.query.stockName;
    const weeklyData = static.getWeeklyStocksData(data);
    const monthlyData = static.getMonthlyStocksData(data);
    const oscData = static.getOscStocksData(data);
    const result = {
      weekly: weeklyData.find((s) => s.name == stockName),
      monthly: monthlyData.find((s) => s.name == stockName),
      osc: oscData.find((s) => s.name == stockName),
    };
    if (!result.weekly) response.status(404).send();
    else response.status(200).send(result);
  } catch (e) {
    next(e);
  }
}
async function getAllWeeklyPrediction(request, response, next) {
  try {
    const data = await getAiData();
    const stockName = request.query.stockName;

    const oscillationData = static.getWeeklyStocksData(data);
    response
      .status(200)
      .send(
        stockName
          ? oscillationData.find((s) => s.name == stockName)
          : oscillationData
      );
  } catch (e) {
    next(e);
  }
}
async function getAllMonthlyPrediction(request, response, next) {
  try {
    const data = await getAiData();
    const stockName = request.query.stockName;
    const oscillationData = static.getMonthlyStocksData(data);
    response
      .status(200)
      .send(
        stockName
          ? oscillationData.find((s) => s.name == stockName)
          : oscillationData
      );
  } catch (e) {
    next(e);
  }
}
async function getOscPrediction(request, response, next) {
  try {
    const data = await getAiData();
    const stockName = request.query.stockName;
    const oscillationData = static.getOscStocksData(data);
    response
      .status(200)
      .send(
        stockName
          ? oscillationData.find((s) => s.name == stockName)
          : oscillationData
      );
  } catch (e) {
    next(e);
  }
}
async function getOverall(request, response, next) {
  try {
    const data = await getAiData();
    const overall = static.getKoldata(data);
    response.status(200).send(overall);
  } catch (e) {
    next(e);
  }
}
function getPredictByDate(date) {
  try {
    const fileString = fs.readFileSync(`./Resolvers/Predicts/${date}.json`, 'utf8');
    const jsonData = JSON.parse(fileString);
    return jsonData;
  } catch (error) {
    console.error(`Error reading or parsing JSON file for date ${date}:`, error.message);
    throw error;
  }
}
async function getAllWeeklyPredictionObserve(request, response, next) {
  try {
    const result = await axios.post(
      `${TableReportProviderServerAddress}/predtest/all/`,
      getPredictByDate(request.query.date), // Pass lastWeek as the data property
      {
        headers: {
          accept: "application/json",
          "accept-language": "en-US,en;q=0.9,fa;q=0.8",
          "proxy-connection": "keep-alive",
          "upgrade-insecure-requests": "1",
          cookie: "csrftoken=f8K3nPDeXeMN2spRhiwM7pxxqYZ9tJH7",
        },
      }
    );
    const responseBody = result.data;
    const observedData = aiObserve.getWeeklyStocksData(responseBody);
    response.status(200).send(observedData);
  } catch (e) {
    next(e);
  }
}
async function getAllOscPredictionObserve(request, response, next) {
  try {
    const result = await axios.post(
      `${TableReportProviderServerAddress}/predtest/all/`,
      getPredictByDate(request.query.date), // Pass lastWeek as the data property
      {
        headers: {
          accept: "application/json",
          "accept-language": "en-US,en;q=0.9,fa;q=0.8",
          "proxy-connection": "keep-alive",
          "upgrade-insecure-requests": "1",
          cookie: "csrftoken=f8K3nPDeXeMN2spRhiwM7pxxqYZ9tJH7",
        },
      }
    );
    const responseBody = result.data;
    const observedData = aiObserve.getOscStocksData(responseBody);
    response.status(200).send(observedData);
  } catch (e) {
    next(e);
  }
}
async function getAllMonthlyPredictionObserve(request, response, next) {
  try {
    const result = await axios.post(
      `${TableReportProviderServerAddress}/predtest/all/`,
      getPredictByDate(request.query.date), // Pass lastWeek as the data property
      {
        headers: {
          accept: "application/json",
          "accept-language": "en-US,en;q=0.9,fa;q=0.8",
          "proxy-connection": "keep-alive",
          "upgrade-insecure-requests": "1",
          cookie: "csrftoken=f8K3nPDeXeMN2spRhiwM7pxxqYZ9tJH7",
        },
      }
    );
    const responseBody = result.data;
    const observedData = aiObserve.getMonthlyStocksData(responseBody);
    response.status(200).send(observedData);
  } catch (e) {
    next(e);
  }
}
async function getAvailablePredicts(request, response, next) {
  try {
    const availableFiles= getJsonFilenamesWithoutExtension('./Resolvers/Predicts')
    response.status(200).send(availableFiles);
  } catch (e) {
    next(e);
  }
}
function sortDateStringsDesc(dateStrings) {
  function parseDate(dateStr) {
    let year, month, day;
    if (dateStr.split('-')[0].length === 1) {
      year = 2000 + parseInt(dateStr.split('-')[0], 10);
    } else {
      year = 2000 + parseInt(dateStr.split('-')[0], 10);
    }
    month = parseInt(dateStr.split('-')[1], 10) - 1; 
    day = parseInt(dateStr.split('-')[2], 10);

    return new Date(year, month, day);
  }
  return dateStrings
    .map(dateStr => ({ original: dateStr, date: parseDate(dateStr) }))
    .sort((a, b) => b.date - a.date) // Change comparison for descending order
    .map(item => item.original);
}
function getJsonFilenamesWithoutExtension(dirPath) {
  const files = fs.readdirSync(dirPath);
  const jsonFilenames = files
    .filter(file => path.extname(file) === '.json')  // Filter for .json files
    .map(file => path.basename(file, '.json'));      // Remove the .json extension
  return sortDateStringsDesc(jsonFilenames);
}
module.exports = {
  getOscPrediction,
  getAllWeeklyPrediction,
  getAllMonthlyPrediction,
  getOverall,
  getAllWeeklyPredictionObserve,
  getAllMonthlyPredictionObserve,
  getAllOscPredictionObserve,
  getStockPrediction,
  getAvailablePredicts
};
