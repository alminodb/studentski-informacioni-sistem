import axios from "axios";

const StudentService = () => {
    async function fetchStudent() {
        const response = await axios.get("http://localhost:3001/");
        return response.data;
    }
}

export default StudentService;