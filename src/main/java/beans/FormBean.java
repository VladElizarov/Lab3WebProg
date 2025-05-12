package beans;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import managerBeans.AreaChecker;
import managerBeans.DataBaseManager;
import managerBeans.Validator;
import models.Point;

import java.io.Serializable;
import java.util.List;

@Named("formBean")
@ApplicationScoped
public class FormBean implements Serializable {
    @Inject
    private Validator validator;

    @Inject
    private AreaChecker areaChecker;

    @Inject
    private DataBaseManager database;

    @Inject
    PointsContainer pointsContainer;

    public void setValidator(Validator validator) {this.validator = validator;}

    public void setPointsContainer(PointsContainer pointsContainer) {this.pointsContainer = pointsContainer;}

    public void setAreaChecker(AreaChecker areaChecker) {this.areaChecker = areaChecker;}

    private double x;
    private double y;
    private double r;
    private boolean yMinus3;
    private boolean yMinus2;
    private boolean yMinus1;
    private boolean yZero;
    private boolean yOne;
    private boolean yTwo;
    private boolean yThree;

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
    public boolean isYMinus3() {
        return yMinus3;
    }

    public void setYMinus3(boolean yMinus3) {
        this.yMinus3 = yMinus3;
        if (yMinus3) {
            this.y = -3;
        }
    }

    public boolean isYMinus2() {
        return yMinus2;
    }

    public void setYMinus2(boolean yMinus2) {
        this.yMinus2 = yMinus2;
        if (yMinus2) {
            this.y = -2;
        }
    }
    public boolean isYMinus1() {
        return yMinus1;
    }
    public void setYMinus1(boolean yMinus1) {
        this.yMinus1 = yMinus1;
        if (yMinus1) {
            this.y = -1;
        }
    }
    public boolean isYZero() {
        return yZero;
    }
    public void setYZero(boolean yZero) {
        this.yZero = yZero;
        if (yZero) {
            this.y = 0;
        }
    }
    public boolean isYOne() {
        return yOne;
    }
    public void setYOne(boolean yOne) {
        this.yOne = yOne;
        if (yOne) {
            this.y = 1;
        }
    }
    public boolean isYTwo() {
        return yTwo;
    }
    public void setYTwo(boolean yTwo) {
        this.yTwo = yTwo;
        if (yTwo) {
            this.y = 2;
        }
    }
    public boolean isYThree() {
        return yThree;
    }
    public void setYThree(boolean yThree) {
        this.yThree = yThree;
        if (yThree) {
            this.y = 3;
        }
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public String submit() {
        System.out.println("x: " + x + " y: " + y + " r: " + r);
        if (validator.validateForm(x, y, r)) {
            Point point = new Point(x, y, r, areaChecker.isInTheSpot(x, y, r));
            database.insertIntoTable(point);
            System.out.println(point.getStatus());
            pointsContainer.getPoints().add(point);
        } else {
            System.out.println("Ошибка валидации данных");
        }
        return null;
    }


    public List<Point> getPoints() {
        double selectedR = this.r;
        return database.getPoints().stream()
                .filter(point -> point.getR() == selectedR)
                .toList();
    }
}
