import App from "./app";
import DataManager from "./dataManager";
import ResultTableManager from "./ResultTableManager";
import SvgManager from "./SvgManager";



let dataManager: DataManager = new DataManager();
const table: HTMLTableElement = document.getElementById("result-table") as HTMLTableElement;

let tableManager: ResultTableManager = new ResultTableManager(table);
let svgManager: SvgManager = new SvgManager(dataManager);
new App(tableManager, dataManager, svgManager).initializeListeners();
