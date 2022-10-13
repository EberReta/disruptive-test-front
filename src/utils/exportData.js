const saveJson = (data, name) => {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    downloadData(blob, `${name} ${new Date()}.json`);
}

const saveCSV = (data, name) => {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    csv = csv.join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    downloadData(blob, `${name} ${new Date()} .csv`);
}

const downloadData = (blob, name) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
}



export { saveJson, saveCSV }