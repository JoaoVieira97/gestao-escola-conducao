import Utils.RedisUtil;

public class Test {

    public static void main(String[] args) {

        RedisUtil.setUserToken(
            "oliveirahugo.97@gmail.com",
            "0MvUbn9EY5fbBJfogQWcHAlWJKbVWREk",
            86400
        );

        RedisUtil.setUserToken(
            "oliveirahugo.97@hotmail.com",
            "7Y58TXAjAzDe1422AgO1kMAH84wETiVH",
            86400
        );

        System.out.println(
            RedisUtil.getUserToken("oliveirahugo.97@gmail.com")
        );
        System.out.println(
            RedisUtil.getUserToken("oliveirahugo.97@hotmail.com")
        );

        RedisUtil.removeUserToken("oliveirahugo.97@gmail.com");
        RedisUtil.removeUserToken("oliveirahugo.97@hotmail.com");
    }
}
