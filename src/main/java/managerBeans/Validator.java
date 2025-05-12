package managerBeans;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;

import java.io.Serializable;

@Named("validator")
@ApplicationScoped
public class Validator implements Serializable {

    private boolean validateX(double x) {
        return (x >= -5 && x <= 5);
    }

    private boolean validateY(double y) {
        return (y >= -5 && y <= 3);
    }

    private boolean validateR(double r) {
        return r == 1 || r == 2 || r == 3 || r == 4 || r == 5;
    }

    public boolean validateForm(double x, double y, double r) {
        return (validateX(x) && validateY(y) && validateR(r));
    }
}
