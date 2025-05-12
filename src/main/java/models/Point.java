package models;

import java.io.Serializable;

public class Point implements Serializable {
    private double x;
    private double y;
    private double r;
    private boolean status;
    private Long id;

    public Point(double x, double y, double r, boolean status) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.status = status;
    }

    public Point() {}


    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Point{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", status=" + status +
                '}';
    }
}
