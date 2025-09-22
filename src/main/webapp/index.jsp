<%@ page contentType="text/html;charset=UTF-8" isELIgnored="false" %>
<%@ page import="ru.varino.Point" %>
<%@ page import="ru.varino.PointsBean" %>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>Лабораторная №2</title>

    <!-- Enterprise-grade typography -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap"
          rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <script src="jquery.min.js" defer></script>
    <script src="bundle.js" defer></script>
</head>
<body>
<div class="wrap">
    <header class="header">
        <div class="header__top">
            <h1>Лабораторная работа №2</h1>
            <span class="badge">Вариант&nbsp;1705</span>
        </div>
        <p class="subtitle">Павленко Иван Дмитриевич · P3217</p>
    </header>

    <main class="content">
        <!-- GRAPH -->
        <section class="graph card" aria-label="График">
            <div class="graph__frame">
                <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img"
                     aria-label="Система координат">
                    <defs>
                        <linearGradient id="gradArea" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#60a5fa"></stop>
                            <stop offset="100%" stop-color="#22d3ee"></stop>
                        </linearGradient>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="currentColor"></polygon>
                        </marker>
                        <mask id="cutMask" maskUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="600" height="500" fill="black"></rect>
                            <ellipse cx="250" cy="250" rx="100" ry="50" fill="white"></ellipse>

                            <g fill="black">
                                <circle cx="235" cy="298" r="15"></circle>
                                <circle cx="265" cy="298" r="15"></circle>
                                <circle cx="285" cy="295" r="18"></circle>
                                <circle cx="215" cy="295" r="18"></circle>


                                <circle cx="285" cy="205" r="20"></circle>
                                <circle cx="215" cy="205" r="20"></circle>

                                <circle cx="250" cy="200" r="10"></circle>
                            </g>
                        </mask>
                    </defs>



                    <ellipse cx="250" cy="250" rx="100" ry="50"
                             fill="url(#gradArea)" fill-opacity="0.3"
                             stroke="currentColor" stroke-width="2"
                             mask="url(#cutMask)"></ellipse>

                    <line x1="50" y1="250" x2="500" y2="250" stroke-width="2" marker-end="url(#arrowhead)"></line>
                    <line x1="250" y1="450" x2="250" y2="50" stroke-width="2" marker-end="url(#arrowhead)"></line>

                    <text x="510" y="255" font-size="16">x</text>
                    <text x="255" y="40" font-size="16">y</text>

                    <text x="345" y="270" font-size="14">R</text>
                    <text x="260" y="155" font-size="14">R</text>

                    <text x="140" y="270" font-size="14">-R</text>
                    <text x="260" y="365" font-size="14">-R</text>

                    <text x="295" y="270" font-size="14">R/2</text>
                    <text x="260" y="205" font-size="14">R/2</text>
                    <text x="190" y="270" font-size="14">-R/2</text>
                    <text x="260" y="315" font-size="14">-R/2</text>

                    <!-- Ticks -->
                    <line x1="150" y1="245" x2="150" y2="255" stroke-width="2"></line>
                    <line x1="200" y1="245" x2="200" y2="255" stroke-width="2"></line>
                    <line x1="300" y1="245" x2="300" y2="255" stroke-width="2"></line>
                    <line x1="350" y1="245" x2="350" y2="255" stroke-width="2"></line>

                    <line x1="245" y1="150" x2="255" y2="150" stroke-width="2"></line>
                    <line x1="245" y1="200" x2="255" y2="200" stroke-width="2"></line>
                    <line x1="245" y1="300" x2="255" y2="300" stroke-width="2"></line>
                    <line x1="245" y1="350" x2="255" y2="350" stroke-width="2"></line>

                    <circle id="pointer" r="5" cx="150" cy="150" visibility="hidden"></circle>
                </svg>
            </div>
        </section>

        <!-- CONTROLS -->
        <aside class="controls card" aria-label="Форма ввода">
            <div class="section-title">Параметры</div>

            <div class="field">
                <div class="label"><strong>X</strong></div>
                <div class="buttons-group">
                    <input type="button" name="X-button" class="input-btn" value="-2"/>
                    <input type="button" name="X-button" class="input-btn" value="-1.5"/>
                    <input type="button" name="X-button" class="input-btn" value="-1"/>
                    <input type="button" name="X-button" class="input-btn" value="-0.5"/>
                    <input type="button" name="X-button" class="input-btn" value="0"/>
                    <input type="button" name="X-button" class="input-btn" value="0.5"/>
                    <input type="button" name="X-button" class="input-btn" value="1"/>
                    <input type="button" name="X-button" class="input-btn" value="1.5"/>
                    <input type="button" name="X-button" class="input-btn" value="2"/>
                </div>
            </div>

            <div class="field">
                <div class="label"><strong>Y</strong></div>
                <div class="input-wrap">
                    <input type="number" id="y-input" name="Y-input" placeholder="От -5 до 5" class="y-input"
                           inputmode="decimal"/>
                </div>
            </div>

            <div class="field">
                <div class="label"><strong>R</strong></div>
                <div class="buttons-group">
                    <input type="button" name="R-button" class="input-btn" value="1"/>
                    <input type="button" name="R-button" class="input-btn" value="1.5"/>
                    <input type="button" name="R-button" class="input-btn" value="2"/>
                    <input type="button" name="R-button" class="input-btn" value="2.5"/>
                    <input type="button" name="R-button" class="input-btn" value="3"/>
                </div>
            </div>

            <div class="actions">
                <input type="button" name="check-button" class="check-btn" value="Проверить"/>
            </div>
        </aside>
    </main>

    <!-- RESULTS -->
    <section class="results card" aria-label="Результаты">
        <table class="result-table" id="result-table">
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Попал?</th>
                <th>Время</th>
            </tr>
            </thead>
            <tbody id="result-tbody">
            <% PointsBean bean = (PointsBean) request.getSession().getAttribute("pointsBean");
                if (bean != null) {

                    for (Point point : bean.getPoints()) { %>
            <tr>
                <td>
                    <%= point.getX() %>
                </td>
                <td>
                    <%= point.getY() %>
                </td>
                <td>
                    <%= point.getR() %>
                </td>
                <td>
                    <%= point.getIsHit() ? "Да" : "Нет"%>
                </td>
                <td><%= point.getTime()%>
                </td>
            </tr>
            <% }
            }%>
            </tbody>
        </table>

        <div class="pagination">
            <input type="button" id="prev-btn" class="pagination-btn disabled" value="Предыдущая" disabled/>
            <input type="button" id="next-btn" class="pagination-btn disabled" value="Следующая" disabled/>
            <input type="button" id="clear-btn" class="pagination-btn disabled" value="Очистить" disabled/>
        </div>
    </section>
</div>
</body>
</html>
