const zip = (...rows) => [...rows[0]].map((_,c) => rows.map(row => row[c]))
const range = (a, b, c) => {
    let ret = []
    if (c !== undefined)
        for (let i = a; i < b; i += c)
            ret.push(i)
    else if (b !== undefined)
        for (let i = a; i < b; i++)
            ret.push(i)
    else
        for (let i = 0; i < a; i++)
            ret.push(i)
    return ret
}

const fetchJSON = async (url, params) => {
    const response = await fetch(url + '?' + new URLSearchParams(params))
    return await response.json()
}

const getURLParams = () =>
    window.location.search.substring(1).split('&').map(e => e.split('=')).reduce((obj, [key, value]) => {obj[key] = value; return obj}, {})


export {
    fetchJSON,
    getURLParams
}