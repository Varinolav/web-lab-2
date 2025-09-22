import DataManager from "./dataManager";
import ResultTableManager from "./ResultTableManager";

export default class SvgManager {
    private dataManager: DataManager;
    private resultTableManager: ResultTableManager;


    constructor(dataManager: DataManager, resultTableManager: ResultTableManager) {
        this.dataManager = dataManager;
        this.resultTableManager = resultTableManager;
    }

    public drawTempPoint(): void {
        if (!this.dataManager.isValid()) {
            return;
        }

        const svgCenterX: number = 250;
        const svgCenterY: number = 250;

        const coordinateX = svgCenterX + parseFloat(this.dataManager.x) / parseFloat(this.dataManager.r) * 100;
        const coordinateY = svgCenterY - parseFloat(this.dataManager.y) / parseFloat(this.dataManager.r) * 100;

        let point = $("#pointer");
        point.attr('cx', "" + coordinateX);
        point.attr('cy', "" + coordinateY);
        point.attr('visibility', 'visible');
    }

    public initializeSvgClick(): void {
        $("svg").on("click", (event): void => {
            if (!this.dataManager.r) {
                alert("Сначала выберите значение R");
                return;
            }

            const svg = event.currentTarget;
            const rect = svg.getBoundingClientRect();
            const svgX = event.clientX - rect.left;
            const svgY = event.clientY - rect.top;

            const svgCenterX = 250;
            const svgCenterY = 250;
            const scale = 100;

            const mathX: number = (svgX - svgCenterX) / scale * parseFloat(this.dataManager.r);
            const mathY: number = (svgCenterY - svgY) / scale * parseFloat(this.dataManager.r);


            this.dataManager.x = mathX.toString();
            this.dataManager.y = mathY.toString();

            this.drawTempPoint();
        });
    }

    public drawPoint(x: string, y: string, r:string, result: boolean): void {

        const svgCenterX: number = 250;
        const svgCenterY: number = 250;

        const coordinateX = svgCenterX + parseFloat(x) / parseFloat(r) * 100;
        const coordinateY = svgCenterY - parseFloat(y) / parseFloat(r) * 100;

        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", coordinateX.toString());
        circle.setAttribute("cy", coordinateY.toString());
        circle.setAttribute("r", "3");
        let success = result ? "pointer__success" : "pointer__failure";
        circle.setAttribute("class", success);
        $("svg").append(circle);
    }

    public initializePointsDrawOnStart(): void {
        jQuery(() => {
            this.redrawPoints();
        })


    }
    public redrawPoints(): void {
        const items = this.resultTableManager.getItems();
        items.forEach((item) => {
            this.drawPoint(item.x, item.y, item.r, item.hit)
        });
    }
    public clearPoints(): void {
        $(".pointer__success, .pointer__failure").remove();
    }
}