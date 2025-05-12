package beans;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.annotation.PostConstruct;  // Импортируем аннотацию
import managerBeans.DataBaseManager;
import models.Point;
import java.io.Serializable;
import java.util.ArrayList;

@Named("points")
@ApplicationScoped
public class PointsContainer implements Serializable {

    private ArrayList<Point> points = new ArrayList<>();

    @Inject
    private DataBaseManager dataBaseManager;

    @PostConstruct
    public void init() {
        points = dataBaseManager.getPoints();
    }

    // Метод для получения всех точек
    public ArrayList<Point> getPoints() {
        System.out.println("Points:" + points);
        return this.points;
    }

    // Метод для добавления точки
    public void setPoints(ArrayList<Point> points) {
        this.points = points;
    }
}
