package managerBeans;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;

import java.io.Serializable;

@Named("checker")
@ApplicationScoped
public class AreaChecker implements Serializable {

    private boolean checkIsTriangle(double x, double y, double r) {
        return (x  >= 0 && y  >= 0 && y <= -0.5 * x + r /2);
    }

    private boolean checkIsRectangle(double x, double y, double r) {
        return (x <= 0 && y <= 0 && y >= -r && x >= -r / 2);
    }

    private boolean checkIsCircle(double x, double y, double r) {
        return (x <= 0 && y >= 0 && x * x + y * y <= (r / 2) * (r / 2));
    }

    public boolean isInTheSpot(double x, double y, double r) {
        return checkIsRectangle(x, y, r) || checkIsTriangle(x, y, r) || checkIsCircle(x, y, r);
    }
}
