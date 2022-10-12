var allData = {
    async getAll() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        var ans = await fetch("https://covid19-brazil-api.now.sh/api/report/v1", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            return result
        })
        .catch((err) => console.log(err))

        return ans;
    }
}

export default allData