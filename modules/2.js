import {data} from './data.js';
const table = document.querySelector('#table-rating');

data
    .sort((a, b) => b.confirmed - a.confirmed)
    .slice(0, 9)
    .filter(item => {
        table.insertAdjacentHTML('beforeend', `
            <tr class="table__row">
                <td class="table__data">${item.countryRegion}</td>
                <td class="table__data">${item.confirmed}</td>
                <td class="table__data">${item.deaths}</td>
                <td class="table__data">${item.recovered}</td>
            </tr>
        `)
    });
