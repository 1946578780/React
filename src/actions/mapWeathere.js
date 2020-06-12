import axios from 'axios'
export const Weathere = () => {
    return dispatch => {
        return axios.get("/weather/http://api.map.baidu.com/weather/v1/?district_id=310120&data_type=all&ak=8BfFp8P60mVH1a0yMKzFYTKBvlSHWWR2")
    }
}
export const WeathereMap = () => {
    return dispatch => {
        return axios.get("http://static.popodv.com/data/attr/wind-barb-hobart.json")
    }
}