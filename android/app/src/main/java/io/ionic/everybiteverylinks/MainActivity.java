package io.ionic.everybiteverylinks;

import com.getcapacitor.BridgeActivity;

import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.content.Intent;
import android.net.Uri;
import android.provider.Settings;
import android.app.AlertDialog;
import android.content.DialogInterface;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Check if "All Files Access" permission is granted
        if (!isAllFilesAccessGranted()) {
            // Show a dialog to the user and block the app until permission is granted
            showPermissionDialog();
        }
    }

    // Method to check if "All Files Access" is granted
    private boolean isAllFilesAccessGranted() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            return Environment.isExternalStorageManager();
        } else {
            // For Android 10 and below, regular storage permission can be checked instead
            return true;
        }
    }

    // Method to show a dialog to ask the user to grant "All Files Access"
    private void showPermissionDialog() {
        new AlertDialog.Builder(this)
                .setTitle("Permission Required")
                .setMessage("This app requires All Files Access to function properly. Please grant the permission.")
                .setCancelable(false)
                .setPositiveButton("Grant Permission", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        // Open the All Files Access settings
                        openAllFilesAccessSettings();
                    }
                })
                .setNegativeButton("Exit", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        // Exit the app if the user doesn't grant the permission
                        finish();
                    }
                })
                .show();
    }

    // Method to open the All Files Access settings page
    private void openAllFilesAccessSettings() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
            intent.setData(Uri.parse("package:" + getPackageName()));
            startActivityForResult(intent, 100); // Use request code 100 for tracking
        }
    }

    // Handle the result when the user returns from the settings screen
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == 100) {
            // Check if the permission was granted
            if (isAllFilesAccessGranted()) {
                // Permission granted, resume the app
            } else {
                // Permission still not granted, show the dialog again
                showPermissionDialog();
            }
        }
    }
}
