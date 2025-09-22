package ru.varino.servlet;

public enum ActionType {
    CLEAR("clear"),
    SUBMIT("submit");

    private final String action;

    ActionType(String action) {
        this.action = action;
    }

    public String action() {
        return action;
    }
}
