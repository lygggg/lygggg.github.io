---
title: '[JAVA]Comparable과 Comparator'
date: 2020-06-10
tag: ['Posts']
---

## 목적

얼마전 자바스크립트에서 사용하던 Compare 함수를 자바에서도 있나 찾아보던중 Comparable과 Coparator 인터페이스가 있다는 것을 알게되었다.

### Comparable<T> 인터페이스

자바에서 Comparable 인터페이스는 객체를 정렬하는 데 사용되는 메소드인 comparaTo() 메소드를 정의하고 있습니다.
자바에서 같은 타입의 인스턴스를 비교해야하는 클래스는 모두 Comparable 인터페이스를 사용하여 구현합니다.

따라서 Boolean을 제외한 String int 같은 클래스의 인스턴스는 모두 정렬이 가능합니다.
이때 기본정렬은 오름차순이고, 설정해서 내림차순으로 변경이 가능합니다.

다음 예제는 인스턴스가 비교를 위해 사용자 정의 클래스인 Car클래스가 Comparable인터페이스를 구현하는 예제입니다.

```
class Car implements Comparable<Car> {

    private String modelName;

    private int modelYear;

    private String color;



    Car(String mn, int my, String c) {

        this.modelName = mn;

        this.modelYear = my;

        this.color = c;

    }



    public String getModel() {

        return this.modelYear + "식 " + this.modelName + " " + this.color;

    }



    public int compareTo(Car obj) {

        if (this.modelYear == obj.modelYear) {

            return 0;

        } else if(this.modelYear < obj.modelYear) {

            return -1;

        } else {

            return 1;

        }

    }

}



public class Comparable01 {

    public static void main(String[] args) {

        Car car01 = new Car("아반떼", 2016, "노란색");

        Car car02 = new Car("소나타", 2010, "흰색");



        System.out.println(car01.compareTo(car02));

    }

}
```

### Comparator<T> 인터페이스

Comparator 인터페이스는 Comparable 인터페이스와 같이 객체를 정렬하는데 사용되는 인터페이스입니다.

```
import java.util.*;



class DescendingOrder implements Comparator<Integer> {

    public int compare(Integer o1, Integer o2) {

        if(o1 instanceof Comparable && o2 instanceof Comparable) {

            Integer c1 = (Integer)o1;

            Integer c2 = (Integer)o2;

            return c2.compareTo(c1);

        }

        return -1;

    }

}



public class Comparable02 {

    public static void main(String[] args) {

        TreeSet<Integer> ts = new TreeSet<Integer>(new DescendingOrder());



        ts.add(30);

        ts.add(40);

        ts.add(20);

        ts.add(10);



        Iterator<Integer> iter = ts.iterator();

        while(iter.hasNext()) {

            System.out.println(iter.next());

        }

    }

}
```
