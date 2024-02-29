import 'package:flutter/material.dart';
import 'package:psyco_admin/config/theme/custom_theme.dart';
import 'presentation/screens/login_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: CustomTheme(selectedColor: 2).myTheme(),
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Center(
          child: AuthScreen(mode: true)
        ),
      ),
    );
  }
}

