import db from "../db.js";

export const insertTopic = async (p_json) => {
  const [result] = await db.query("CALL TopicInsert(?)", [p_json]);
  return result.Msg;
};

export const getTopicsData = async () => {
  const [result] = await db.query("CALL GetTopicsJSON()");
  return result;
};
export default { insertTopic, getTopicsData };
