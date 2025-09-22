import ResultTableManager from "./ResultTableManager";
import DataManager from "./dataManager";
import SvgManager from "./SvgManager";
import config from "./config"

export default class App {
    private tableManager: ResultTableManager;
    private dataManager: DataManager;
    private svgManager: SvgManager;


    constructor(tableManager: ResultTableManager, dataManager: DataManager, svgManager: SvgManager) {
        this.tableManager = tableManager;
        this.dataManager = dataManager;
        this.svgManager = svgManager;
    }

    public initializeListeners(): void {
        this.initializeInputButtons();
        this.initializePointDrawing();
        this.initializeTableButtons();
        this.initializeInputButtonsSelection();
        this.initializeServerRequesting();
        this.svgManager.initializeSvgClick();
        this.svgManager.initializePointsDrawOnStart();
    }

    private initializeInputButtons() {
        $("input[name=Y-input]").on("input", (event): void => {
            this.dataManager.y = $(event.target).val() as string;
        });

        $("input[name=X-button]").on("click", (event): void => {
            this.dataManager.x = $(event.target).val() as string;
        });

        $("input[name=R-radio]").on("click", (event): void => {
            this.dataManager.r = $(event.target).val() as string;
        });
    }

    private initializePointDrawing(): void {
        $("input[name=X-button]").on("click", () => this.svgManager.drawTempPoint());
        $("input[name=R-button]").on("click", () => this.svgManager.drawTempPoint());
        $("input[name=Y-input]").on("input", () => this.svgManager.drawTempPoint());
    }

    private initializeTableButtons(): void {
        $("#prev-btn").on("click", () => this.tableManager.previousPage());
        $("#next-btn").on("click", () => this.tableManager.nextPage());
        $("#clear-btn").on("click", () => {
            this.tableManager.clearTable();
            this.svgManager.clearPoints();
        });
    }

    private initializeInputButtonsSelection() {
        $("input[name=X-button]").on("click", (event): void => {

            if ($(event.target).hasClass("selected")) {
                $(event.target).removeClass("selected");
                this.dataManager.x = null;
            } else {
                $("input[name=X-button]").removeClass("selected");
                $(event.target).addClass("selected");
            }
        });
        $("input[name=R-button]").on("click", (event): void => {
            if ($(event.target).hasClass("selected")) {
                $(event.target).removeClass("selected");
                this.dataManager.r = null;
            } else {
                $("input[name=R-button]").removeClass("selected");
                $(event.target).addClass("selected");
            }
        });
    }

    private initializeServerRequesting(): void {
        $("input[name=check-button]").on("click", (): void => {
            if (!this.dataManager.isValid()) {
                alert("Некорректные данные");
                return;
            }

            let data = this.dataManager.getData();
            data["action"] = "submit";

            $.ajax({
                url: config.path + $.param(data),
                type: "GET",
                dataType: "json",
                success: (response): void => {
                    console.log(response);
                    if (response.statusCode !== 200) {
                        alert(response.error);
                        return;
                    }

                    const rowData: object = {...data, hit: response.result, now: response.now};
                    this.tableManager.addData(rowData);
                    this.svgManager.drawPoint(data.x, data.y, data.r, response.result);
                },
                error: (response: any): void => {
                    console.log(response);
                    alert(response.responseJSON.error);
                }
            });
        });
    }
}