import axios from 'axios'
import { useAuthenStore } from '../stores/authen' // ✅ แก้ตรงนี้ (จาก @ เป็น ..)

export default () => {
    const authenStore = useAuthenStore()

    return axios.create({
        baseURL: 'http://localhost:8081/',
        headers: {
            Authorization: `Bearer ${authenStore.token}`
        }
    })
}