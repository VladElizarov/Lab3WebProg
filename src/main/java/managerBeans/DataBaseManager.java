package managerBeans;

import jakarta.enterprise.context.ApplicationScoped;
import models.Point;

import java.sql.*;
import java.util.ArrayList;

@ApplicationScoped
public class DataBaseManager {

    private static final String URL = "jdbc:postgresql://localhost:5432/studs2";
    private static final String USER = "s412939";
    private static final String PASSWORD = "psw";

    public void insertIntoTable(Point point) {
        if (point != null) {
            String query = "INSERT INTO points (x, y, r, status) VALUES (?, ?, ?, ?)";

            try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
                 PreparedStatement preparedStatement = connection.prepareStatement(query)) {

                preparedStatement.setDouble(1, point.getX());
                preparedStatement.setDouble(2, point.getY());
                preparedStatement.setDouble(3, point.getR());
                preparedStatement.setBoolean(4, point.getStatus());


                preparedStatement.executeUpdate();

            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }



    public ArrayList<Point> getPoints() {
        String query = "SELECT x, y, r, status, request_time FROM points";
        ArrayList<Point> points = new ArrayList<>();

        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(query)) {

            while (resultSet.next()) {
                double x = resultSet.getDouble("x");
                double y = resultSet.getDouble("y");
                double r = resultSet.getDouble("r");
                boolean status = resultSet.getBoolean("status");

                points.add(new Point(x, y, r, status));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return points;
    }
}
