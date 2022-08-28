package com.example.back_dev.controller;

import com.example.back_dev.bean.User;
import com.example.back_dev.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Testcontroller {

    @Autowired
    UserDao userDao;

    @RequestMapping("/test")
    public User test(@RequestBody User user){
        User u = userDao.getUserById(user.getId());
        System.out.println("user:"+u);
        return u;
    }
}
