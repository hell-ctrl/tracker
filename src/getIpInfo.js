import axios from "axios";

const getIpInfo = async (ip) => {
  const resp = await axios.get(`http://ipwho.is/${ip}`);
  return resp.data
}

export default getIpInfo;
