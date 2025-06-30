package com.springboot.rekruteIT.enums;

public enum NiveauDetude {

    BAC("Bac"),
    BAC_PLUS_1("Bac+1"),
    BAC_PLUS_2("Bac+2"),
    BAC_PLUS_3("Bac+3"),
    BAC_PLUS_4("Bac+4"),
    BAC_PLUS_5("Bac+5"),
    BAC_PLUS_5_SUPERIEUR("bac+5>"); // Identifier for "bac+5>"


    private final String displayName;


    NiveauDetude(String displayName) {
        this.displayName = displayName;
    }
    public String getDisplayName() {
        return displayName;
    }
    @Override
    public String toString() {
        return displayName;
    }
}