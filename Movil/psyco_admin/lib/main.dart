import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        useMaterial3: true
      ),
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          elevation: 10,
          title: const Text("Hola mundo"),
          actions: [
            IconButton(
                onPressed: () {}, icon: const Icon(Icons.ac_unit_rounded))
          ],
        ),
        body: const Center(
          child: HomeScreen(),
        ),
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return FormField(
      builder: (field) {
        return const Padding(
            padding: EdgeInsets.symmetric(horizontal: 40),
            child: SingleChildScrollView(
              child: Column(
                children: [
                  TextField(),
                  TextField(),
                  TextField(),
                  TextField(),
                ],
              ),
            ));
      },
    );
  }
}
