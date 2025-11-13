import React, { useState } from 'react';

export default function RegisterPage() {
	const [nama, setNama] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('mahasiswa');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		// NOTE: server runs on port 3001 in this workspace; use absolute URL to avoid proxy mismatch
		const url = 'http://localhost:3001/api/auth/register';

		try {
			const res = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ nama, email, password, role }),
			});

			const data = await res.json().catch(() => ({}));
			if (!res.ok) {
				setError(data.message || JSON.stringify(data) || 'Registrasi gagal');
				setLoading(false);
				return;
			}

			// Redirect to /login after successful registration
			window.location.href = '/login';
		} catch (err) {
			setError(err.message || 'Terjadi kesalahan jaringan');
			setLoading(false);
		}
	};

	return (
		<div style={{ maxWidth: 480, margin: '40px auto', padding: 20, border: '1px solid #eee', borderRadius: 8 }}>
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: 12 }}>
					<label style={{ display: 'block', marginBottom: 4 }}>Nama</label>
					<input
						type="text"
						value={nama}
						onChange={(e) => setNama(e.target.value)}
						required
						style={{ width: '100%', padding: 8 }}
					/>
				</div>

				<div style={{ marginBottom: 12 }}>
					<label style={{ display: 'block', marginBottom: 4 }}>Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						style={{ width: '100%', padding: 8 }}
					/>
				</div>

				<div style={{ marginBottom: 12 }}>
					<label style={{ display: 'block', marginBottom: 4 }}>Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						style={{ width: '100%', padding: 8 }}
					/>
				</div>

				<div style={{ marginBottom: 12 }}>
					<label style={{ display: 'block', marginBottom: 4 }}>Role</label>
					<select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: 8 }}>
						<option value="mahasiswa">mahasiswa</option>
						<option value="admin">admin</option>
					</select>
				</div>

				{error && (
					<div style={{ color: 'red', marginBottom: 12 }}>
						{error}
					</div>
				)}

				<button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
					{loading ? 'Mendaftar...' : 'Register'}
				</button>
			</form>
		</div>
	);
}
