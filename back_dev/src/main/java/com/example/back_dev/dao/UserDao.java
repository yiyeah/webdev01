package com.example.back_dev.dao;

import com.example.back_dev.bean.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao {
    public User getUserById(int id);
}
