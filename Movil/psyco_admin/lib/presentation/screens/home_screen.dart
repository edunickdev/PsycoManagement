import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  static const name = "home";
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final palette = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        elevation: 10,
        backgroundColor: palette.primary,
      ),
      body: const Center(child: Text("Pantalla de Home")),
    );
  }
}
