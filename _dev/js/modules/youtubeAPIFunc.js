export class youtubeAPIFunc {
  /**
   * @param  {Element} elements rootとなる要素
   * @returns void
   */
  constructor(elements, liveElements = {}) {
    const defaultOptions = {
      activeClass: 'is-active',
      CHANNEL_ID_01: 'UCPt71Qf78TNlGfnchQDBBwg',
      CHANNEL_ID_02: 'UCqKexNL7YoueTlGSNZXoqPQ',
      CHANNEL_ID_03: 'UC0GErsdTh7BijpLG7Qd-gpQ',
      CHANNEL_ID_04: 'UCgunVdIAaXrmrpGTUlp5nOA',
      CHANNEL_ID_05: 'UC1CiTzTMaRQUIPdSkvSt29g',
      APIKEY: 'AIzaSyDpGvB-IA0WgEVBYrMdW-dl8zm4emzLYwE',
      ID: '',
      LIVESTATUS: '',
      statusFlg: false,
    };

    this.o = Object.assign(defaultOptions);
    this.elements = elements;
    this.liveElm = liveElements;
    this.init();
  }
  /**
   * 初期化処理
   *
   * @returns void
   */
  init() {
    window.addEventListener('load', this.onJSClientLoad.bind(this));
  }

  /**
   * ページロード時にスライドショーを再生する
   *
   * @returns void
   */

  /* APIロード */
  onJSClientLoad() {
const getYouTube = async (api, query, cooldown = 300) => {
  await new Promise((r) => setTimeout(r, cooldown));
  return await (
    await fetch(`https://www.googleapis.com/youtube/v3/${api}${Object.entries(query).reduce((p, [k, v]) => `${p}&${k}=${v}`, `?key=${this.o.APIKEY}`)}`)
  ).json();
};

const getYouTubeLive = async (api, query, cooldown = 300) => {
  await new Promise((r) => setTimeout(r, cooldown));
  return await (
    await fetch(`https://www.googleapis.com/youtube/v3/${api}${Object.entries(query).reduce((p, [k, v]) => `${p}&${k}=${v}`, `?key=${this.o.APIKEY}`)}`)
  ).json();
};

const getVideos = async (channelId) => {
  const playlistId = (
    await getYouTube("channels", {
      part: "contentDetails",
      id: channelId,
    })
  ).items[0].contentDetails.relatedPlaylists.uploads;

  switch (channelId) {
    case this.o.CHANNEL_ID_01:
      break;

      case this.o.CHANNEL_ID_02:
        break;

      case this.o.CHANNEL_ID_03:
      break;

      case this.o.CHANNEL_ID_04:
      break;

      case this.o.CHANNEL_ID_05:
        break;
  }

  return await getYouTube("playlistItems", {
    part: "snippet",
    maxResults: 5,
    playlistId,
  })
};

const liveStatusFunc = (resolveItem, i) => {
  return getYouTube("videos", {
    part: "snippet",
    id: resolveItem.items[i].snippet.resourceId.videoId,
  })
}

const liveFunc = (resolveItem, i) => {
  return getYouTube("videos", {
    part: "liveStreamingDetails",
    id: resolveItem.items[i].snippet.resourceId.videoId,
  })
}

const liveStatus = (resolveItem, rootitems, i, moviecontent, detailcontent, livecontent, root, liveRoot, rootitemsLive) => {

  if (resolveItem.items[0].snippet) {
    if (resolveItem.items[0].snippet.liveBroadcastContent === 'none') {
      this.o.LIVESTATUS = '<span class="live-status">アーカイブ済み</span>';
    } else if (resolveItem.items[0].snippet.liveBroadcastContent === 'live') {
      liveRoot.appendChild(rootitemsLive);
      rootitemsLive.appendChild(livecontent);
      rootitemsLive.appendChild(detailcontent);

      livecontent.innerHTML = `<div class="items"><div class="items__img"><a href="https://www.youtube.com/watch?v=${resolveItem.items[0].id}"><img style="width:30%" src="${resolveItem.items[0].snippet.thumbnails.high.url}"></a></div>
      <div class="items__text">${resolveItem.items[0].snippet.title}</div>
      </div>`;
    } else if (resolveItem.items[0].snippet.liveBroadcastContent === 'upcoming') {
      root.appendChild(rootitems);
      rootitems.appendChild(moviecontent);
      rootitems.appendChild(detailcontent);

      moviecontent.innerHTML = `<div class="items"><div class="items__img"><a href="https://www.youtube.com/watch?v=${resolveItem.items[0].id}"><img style="width:30%" src="${resolveItem.items[0].snippet.thumbnails.high.url}"></a></div>
      <div class="items__channel">${resolveItem.items[0].snippet.channelTitle}</div>
      <div class="items__text">${resolveItem.items[0].snippet.title}</div>
      </div>`;
    }
  }
}

const liveDetailsFunc = (resolveItem, rootitems, i, moviecontent, detailcontent) => {
  const normalizeDateArry = resolveItem.items[0].liveStreamingDetails.scheduledStartTime.split('T');

  let normalizeDate = normalizeDateArry[0].split('-').join('/');
  let hour = Number(normalizeDateArry[1].split(':')[0]);
  let minit = Number(normalizeDateArry[1].split(':')[1]);
  const today = new Date();
  const year = String(today.getFullYear());
  const day = String(today.getDate());
  const nowHour = String(today.getHours());
  const nowMinit = String(today.getMinutes());
  let month = today.getMonth() + 1;

  if ((today.getMonth() + 1) <= 10) {
    month = String('0'+month);
  } else {
    month = String(month);
  }

  const sum = year+month+day+nowHour+nowMinit;
  Number(sum)
  hour = hour + 9;

  String(hour);

  if (minit === 0) {
    minit = '00';
  }

  String(minit);

  const liveTime = String(normalizeDateArry[0].split('-').join(''))+hour+minit;

  if (sum<=liveTime) {
    detailcontent.innerHTML = `<div class="items"><p class="scheduled">${normalizeDate}</p><p class="scheduled">${hour}:${minit}</p></div>`;
  }
};

const resolveFunc = (resolveItem) => {
  const root = document.createElement('ul');
  this.elements.appendChild(root);

  const liveRoot = document.createElement('ul');
  this.liveElm.appendChild(liveRoot);

  for (let i=0;i <15; i++) {
    const rootitems = document.createElement('li');
    const rootitemsLive = document.createElement('li');
    const livecontent = document.createElement('div');
    livecontent.classList.add('live-content');
    const moviecontent = document.createElement('div');
    moviecontent.classList.add('movie-content');
    const detailcontent = document.createElement('div');
    detailcontent.classList.add('details-content');

    liveStatusFunc(resolveItem, i).then(r => liveStatus(r, rootitems, i, moviecontent, detailcontent, root, liveRoot, rootitemsLive));
    liveFunc(resolveItem, i).then(r => liveDetailsFunc(r, rootitems, i, moviecontent, detailcontent));
  }
}

// べー
getVideos(this.o.CHANNEL_ID_01).then(r => resolveFunc(r));

// ライラさん
getVideos(this.o.CHANNEL_ID_02).then(r => resolveFunc(r));

// なごみさん
getVideos(this.o.CHANNEL_ID_03).then(r => resolveFunc(r));

// ろろぬさん
getVideos(this.o.CHANNEL_ID_04).then(r => resolveFunc(r));

// ANSA公式
getVideos(this.o.CHANNEL_ID_05).then(r => resolveFunc(r));
  }
}
