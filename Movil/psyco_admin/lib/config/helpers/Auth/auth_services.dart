import 'dart:convert';

import 'package:psyco_admin/domain/Entities/user_entity.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:dio/dio.dart';

import '../../../domain/Entities/userin.dart';
import '../../shared/shareds.dart';

Future loadEnvs() async {
  await dotenv.load(fileName: "assets/.env");
}

final _dio = Dio();

Future<UserIn> signIn(String email, String password) async {
  await loadEnvs();

  final endpointUrl = dotenv.get("BASE_API_URL_EXTERN");
  final requestData = {
    'email': email,
    'password': password,
  };

  final response = await _dio.post(
    "$endpointUrl/auth/login",
    data: jsonEncode(requestData),
    options: Options(
      headers: {
        'Content-Type': 'application/json',
      },
    ),
  );

  UserIn user = userInFromJson(jsonEncode(response.data));
  saveInfoUser(user);
  return user;
}

Future signUp(Therapist therapist) async {
  print(therapist);
  await loadEnvs();

  final endpointUrl = dotenv.get("BASE_API_URL_EXTERN");
  final requestData = therapistToJson(therapist);

  final response = await _dio.post(
    "$endpointUrl/auth/sign-up",
    data: requestData,
    options: Options(
      headers: {
        'Content-Type': 'application/json',
      },
    ),
  );
}
