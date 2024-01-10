package org.codegenius.dto;

public class AddressDTO {
    private String city;
    private String state;
    private Integer pinCode;

    public AddressDTO() {
    }

    public AddressDTO(String city, String state, Integer pinCode) {
        this.city = city;
        this.state = state;
        this.pinCode = pinCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getPinCode() {
        return pinCode;
    }

    public void setPinCode(Integer pinCode) {
        this.pinCode = pinCode;
    }

    @Override
    public String toString() {
        return "AddressDTO{" + "city='" + city + '\'' + ", state='" + state + '\'' + ", pinCode=" + pinCode + '}';
    }
}