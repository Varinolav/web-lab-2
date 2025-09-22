import config from "./config"
export default class ResultTableManager {
    private pageSize: number = 5;
    private curPage: number = 1;
    private allItems: any[];
    private table: HTMLTableElement;
    private readonly storageKey: string = 'results';


    constructor(table: HTMLTableElement) {
        this.allItems = [];
        this.table = table;
        this.updateFromBean();
        this.renderTable();
        this.updatePaginationButtons();
    }

    public nextPage(): void {
        if (this.curPage < this.getTotalPages()) this.curPage++;
        this.renderTable();
        this.updatePaginationButtons();
    }

    public clearTable(): void {
        process.env
        this.allItems = [];
        $.ajax({
            url: config.path + "action=clear",
            type: "GET",
            dataType: "json",
            success: (response): void => {
                if (response.error != null) {
                    alert("Ответ не получен")
                    console.log(response)
                    return;
                }
            },
        });
        this.renderTable();
        this.updatePaginationButtons();
    }

    public previousPage(): void {
        if (this.curPage > 1) this.curPage--;
        this.renderTable();
        this.updatePaginationButtons();
    }

    private getTotalPages(): number {
        return Math.ceil(this.allItems.length / this.pageSize);
    }

    public addData(data: object): void {
        this.allItems.push(data);
        this.curPage = this.getTotalPages();
        this.renderTable();
        this.updatePaginationButtons();
    }

    private getCurrentPageData(): any[] {
        const startIndex = (this.curPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.allItems.slice(startIndex, endIndex);
    }


    private updateFromBean(): void {
        const tbody = this.table.querySelector('#result-tbody') as HTMLTableSectionElement;
        if (!tbody) return;
        const rows = tbody.querySelectorAll('tr');
        const items = [].map.call(rows, (row: HTMLTableRowElement) => {
            const cells = row.querySelectorAll('td');
            return {
                x: cells[0]?.textContent?.trim() ?? '',
                y: cells[1]?.textContent?.trim() ?? '',
                r: cells[2]?.textContent?.trim() ?? '',
                hit: cells[3]?.textContent?.trim().toLowerCase() === 'да',
                now: cells[4]?.textContent?.trim() ?? ''
            };
        });
        this.allItems = items;
        tbody.innerHTML = '';
    }

    private renderTable(): void {
        const tbody = this.table.querySelector('#result-tbody') as HTMLTableSectionElement;
        tbody.innerHTML = '';
        const currentData = this.getCurrentPageData().sort((a, b) => {
            const dateA = new Date(a.now);
            const dateB = new Date(b.now);
            return dateA.getTime() - dateB.getTime();
        });
        currentData.forEach(item => {
            const row = tbody.insertRow();
            row.insertCell(0).textContent = item.x;
            row.insertCell(1).textContent = item.y;
            row.insertCell(2).textContent = item.r;
            row.insertCell(3).textContent = item.hit ? 'Да' : 'Нет';
            row.insertCell(4).textContent = item.now;
        });
    }

    private updatePaginationButtons(): void {
        const totalPages = this.getTotalPages();
        const prevBtn = $("#prev-btn");
        const nextBtn = $("#next-btn");
        const clearBtn = $("#clear-btn");

        if (this.curPage <= 1 || totalPages === 0) {
            prevBtn.prop('disabled', true);
            prevBtn.addClass("disabled");
        } else {
            prevBtn.prop('disabled', false);
            prevBtn.removeClass("disabled");
        }

        if (this.curPage >= totalPages || totalPages === 0) {
            nextBtn.prop('disabled', true);
            nextBtn.addClass("disabled");
        } else {
            nextBtn.prop('disabled', false);
            nextBtn.removeClass("disabled");
        }

        if (this.allItems.length === 0) {
            clearBtn.prop("disabled", true);
            clearBtn.addClass("disabled");
        } else {
            clearBtn.prop("disabled", false);
            clearBtn.removeClass("disabled");
        }
    }
}
