package io.ionic.starter;

import com.getcapacitor.BridgeActivity;
import com.khempant311.capacitorGoogleMaps.capacitorGoogleMaps;

// main activity and plugins

public class MainActivity extends BridgeActivity {}

@Override
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    registerPlugin(capacitorGoogleMaps.class);
}

